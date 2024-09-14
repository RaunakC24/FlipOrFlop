package com.vark.fliporflop;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class Controller {
    private final ChatClient chatClient;
    private final HashMap<String, HomeEvaluationResponse> homeEvaluationResponseHashMap;
    private final HashMap<String, List<HomeItem>> listOfHomesHashMap;

    public Controller(ChatClient.Builder builder) {
        chatClient = builder
            .defaultSystem("""
                The user will give you some data about a house, I need you to give me back in json format whether you think buying the house, renovating it a little, then selling it will make a profit, and how much of a profit it will make.
                Example of the json, do not use these exact values each time
                
                {
                    "shouldBuy" : true
                    "estimatedMoneyMade" : 1000
                }""")
            .build();
        listOfHomesHashMap = new HashMap<>();
        homeEvaluationResponseHashMap = new HashMap<>();
    }

    @PostMapping("/getHomeEvaluation")
    HomeEvaluationResponse getHomeEvaluation(@RequestBody String address) {
        return calculateHomeEvaluation(address);
    }


    private HomeEvaluationResponse calculateHomeEvaluation(String address) {
        if (homeEvaluationResponseHashMap.containsKey(address)) {
            return homeEvaluationResponseHashMap.get(address);
        }

        try {
            String[] command = {"python", "src/main/java/com/vark/fliporflop/scrapeHomes.py", " " + address};

            ProcessBuilder processBuilder = new ProcessBuilder(command);
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            HomeEvaluationResponse homeEvaluationResponse = new HomeEvaluationResponse();
            homeEvaluationResponse.setAddress(address);
            while ((line = reader.readLine()) != null) {
                if (line.startsWith("Highlight: ")) {
                    homeEvaluationResponse.getHighlights()
                        .add(line.replace("Highlight: ", ""));
                } else if (line.startsWith("Description: ")) {
                    homeEvaluationResponse.setDescription(line.replace("Description: ", ""));
                } else if (line.startsWith("SqFt: ")) {
                    homeEvaluationResponse.setSquareFeet(line.replace("SqFt: ", ""));
                } else if (line.startsWith("Price: ")) {
                    homeEvaluationResponse.setPrice(line.replace("Price: ", ""));
                } else if (line.startsWith("Image URLs: ")) {
                    homeEvaluationResponse.setImageUrl(line.replace("Image URLs: ", ""));
                } else if (line.startsWith("Year: ")) {
                    HomeEvaluationResponse.TaxData taxData = getTaxData(line);
                    homeEvaluationResponse.getTaxData().add(taxData);
                }

            }
            reader.close();
            if (homeEvaluationResponse.getPrice() == null) {
                homeEvaluationResponse.setPrice("");
            }
            String chatResponse =
                chatClient.prompt().user(homeEvaluationResponse.toString())
                    .call().content();
            homeEvaluationResponse.setEstimatedMoneyBack(chatResponse);

            homeEvaluationResponseHashMap.put(address, homeEvaluationResponse);
            return homeEvaluationResponse;
        } catch (IOException ignored) {
            return new HomeEvaluationResponse();
        }
    }

    private static HomeEvaluationResponse.TaxData getTaxData(String line) {
        String[] parts = line.split(", ");

        int year = Integer.parseInt(parts[0].replaceAll("\\D", "").isEmpty() ? "0" : parts[0].replaceAll("\\D", ""));
        double taxPaid = Double.parseDouble(parts[1].replaceAll("\\D", "").isEmpty() ? "0" : parts[1].replaceAll("\\D", ""));
        double taxAssessment = Double.parseDouble(parts[2].replaceAll("\\D", "").isEmpty() ? "0" : parts[2].replaceAll("\\D", ""));
        double land = Double.parseDouble(parts[3].replaceAll("\\D", "").isEmpty() ? "0" : parts[3].replaceAll("\\D", ""));
        double improvement = Double.parseDouble(parts[4].replaceAll("\\D", "").isEmpty() ? "0" : parts[4].replaceAll("\\D", ""));

        return new HomeEvaluationResponse.TaxData(year, taxPaid, taxAssessment, land, improvement);
    }

    @PostMapping("/getListOfHomes")
    public List<HomeItem> getListOfHomes(@RequestBody String address) {
        address = address.toLowerCase();
        if (listOfHomesHashMap.containsKey(address)) {
            return listOfHomesHashMap.get(address);
        }

        try {
            String[] command = {"python", "src/main/java/com/vark/fliporflop/listingScraper.py", " " + address};

            ProcessBuilder processBuilder = new ProcessBuilder(command);
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;

            ArrayList<HomeItem> homeItems = new ArrayList<HomeItem>();
            HomeItem homeItem = new HomeItem();

            while ((line = reader.readLine()) != null) {
                if (line.startsWith("Price: ")) {
                    homeItem.setPrice(line.replace("Price: ", ""));
                } else if (line.startsWith("Address: ")) {
                    homeItem.setAddress(line.replace("Address: ", ""));
                } else if (line.startsWith("Beds: ")) {
                    homeItem.setBeds(line.replace("Beds: ", ""));
                } else if (line.startsWith("Baths: ")) {
                    homeItem.setBaths(line.replace("Baths: ", ""));
                } else if (line.startsWith("Sq Ft: ")) {
                    homeItem.setSquareFeet(line.replace("Sq Ft: ", ""));
                } else if (line.startsWith("Description: ")) {
                    homeItem.setDescription(line.replace("Description: ", ""));
                } else if (line.startsWith("Image URL: ")) {
                    homeItem.setImageUrl(line.replace("Image URL: ", ""));
                    homeItems.add(homeItem);
                    homeItem = new HomeItem();
                }
            }
            reader.close();
            listOfHomesHashMap.put(address, homeItems);
            return homeItems;
        } catch (IOException ignored) {
            return new ArrayList<>();
        }
    }
}
