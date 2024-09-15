package com.vark.fliporflop;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class HomeEvaluationResponse {
    // Data from home.com
    public String price;
    public String address;
    public int rating;
    public List<String> highlights;
    public List<TaxData> taxData;
    public String yearBuilt;
    public String description;
    public String squareFeet;
    public String imageUrl;
    public String EstimatedMoneyBack;
    public String beds;
    public String baths;

    public HomeEvaluationResponse() {
        highlights = new ArrayList<>();
        taxData = new ArrayList<>();
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TaxData {
        public int year;
        public double taxPaid;
        public double taxAssessment;
        public double land;
        public double improvement;
    }
}
