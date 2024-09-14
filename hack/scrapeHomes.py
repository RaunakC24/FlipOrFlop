#Quick Documentation
#scrapes the url and grabs the following:
#   -price
#   -sq ft
#   -year built


import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup


def getHighlights():
    #---------------------- highlights

    # Find the <ul> element with the class "plain-list"
    highlight_list = soup.find("ul", {"class": "plain-list"})

    if highlight_list:
        # Find all <li> elements within the <ul>
        highlights = highlight_list.find_all("li", {"class": "highlight"})
        for highlight in highlights:
            # Extract the text inside the <span> with class "highlight-value"
            value = highlight.find("span", {"class": "highlight-value"})
            if value:
                print("Highlight:", value.get_text(strip=True))
    else:
        print("Could not find the highlights list.")


# def home_details():
#     category_details = {}

#     # Find all category containers
#     category_containers = soup.find_all("div", {"class": "subcategory-container"})

#     for container in category_containers:
#         subcategory = container.find("div", {"class": "subcategory"})
#         if subcategory:
#             # Extract the amenity name
#             amenity_name = subcategory.find("p", {"class": "amenity-name"})
#             amenity_name_text = amenity_name.get_text(strip=True) if amenity_name else "Unknown"

#             # Extract all amenities details
#             amenities_list = subcategory.find("ul", {"class": "amenities-list"})
#             amenities_details = [item.get_text(strip=True) for item in amenities_list.find_all("li", {"class": "amenities-detail"})]

#             category_details[amenity_name_text] = amenities_details

#     print(category_details)

def scrape_description():
    # Find the <p> tag with id "ldp-description-text"
    description_tag = soup.find("p", {"id": "ldp-description-text"})
    if description_tag:
        # Extract and clean the text
        description_text = description_tag.get_text(strip=True)
        print(description_text)
    else:
        return "Description not found."

def scrape_price():
    price_tag = soup.find("span", class_="property-info-price", id="price")
    if price_tag:
        print(f"\nPrice: {price_tag.get_text(strip=True)}")
    else:
        print("\nPrice not found")

def getTaxData():
    tax_table = soup.find("table", {"class": "tax-table"})
    if tax_table:
        # Extract all rows from the table body
        rows = tax_table.find("tbody").find_all("tr")

        # Loop through each row
        for row in rows:
            # Extract each column value (Year, Tax Paid, Tax Assessment, Land, Improvement)
            year = row.find("th", {"scope": "row"}).get_text(strip=True)  # Year is in <th> tag
            tax_paid = row.find("td", {"class": "tax-amount"}).get_text(strip=True)
            tax_assessment = row.find("td", {"class": "tax-assessment"}).get_text(strip=True)
            land_value = row.find("td", {"class": "tax-land"}).get_text(strip=True)
            improvement_value = row.find("td", {"class": "tax-improvement"}).get_text(strip=True)

            # Print the extracted data
            print(f"Year: {year}, Tax Paid: {tax_paid}, Tax Assessment: {tax_assessment}, Land: {land_value}, Improvement: {improvement_value}")
    else:
        print("Tax table not found")


# def getAmens():
#     # Loop through each subcategory and extract headers and their values
#     amenities = ""  # Initialize an empty string to hold the results
#     for container in subcategory_containers:
#         # Get the header (p tag with class "amenity-name")
#         header = container.find('p', class_='amenity-name')
        
#         # Get all the values (li tags with class "amenities-detail")
#         values = container.find_all('li', class_='amenities-detail')
        
#         amenities += f"{header.text.strip()}: "
#         for value in values:
#             # Only proceed if there's a header (to avoid NoneType issues)
#             if header:
#                 # Concatenate header and values to form a string
#                 amenities += f"{value.text.strip()}, "
        
#         # Add a newline after each subcategory's amenities are listed
#         amenities += "\n"
#     print(amenities)


def scrape_amenities():
    # Create a dictionary to store the structured data
    amenities_data = {}
    
    # Find all the categories (sections with headings like 'Listing Details', 'Interior Features', etc.)
    categories = driver.find_elements(By.CLASS_NAME, "subcategory")
    
    for category in categories:
        # Get the heading (e.g., 'Listing Details', 'Interior Features')
        heading = category.find_element(By.CLASS_NAME, "amenity-name").text.strip()
        
        # Get the list items under each category
        list_items = category.find_elements(By.CLASS_NAME, "amenities-detail")
        
        # Store details in a list
        details = [item.text.strip() for item in list_items]
        
        # Add the heading and details to the dictionary
        amenities_data[heading] = details
    
    return amenities_data


def extract_year_built(data):
    # Check if "Year Built" is available in the data
    if "Year Built" in data:
        for item in data["Year Built"]:
            # Check if the item is a valid year (4 digits)
            if item.strip().isdigit() and len(item.strip()) == 4:
                return item.strip()
            # Extract the year from formats like 'Built in 2006'
            if "Built in" in item:
                return item.split("Built in")[1].strip()
    if "Listing Details" in data:
        for detail in data["Listing Details"]:
            if "Year Built" in detail:
                return detail.split(":")[1].strip()
    return None


def extract_sq_ft(data):
    # Check in different sections where square footage is mentioned
    if "Interior Spaces" in data:
        for item in data["Interior Spaces"]:
            if "Sq Ft" in item:
                return item.split(" Sq Ft")[0].strip()
    if "Listing Details" in data:
        for detail in data["Listing Details"]:
            if "Estimated Total Finished Sq Ft" in detail:
                return detail.split(":")[1].strip()
    return None






# url = "https://www.homes.com/property/the-preserve-single-family-homes-savannah-blacksburg-va/2f4je0skpc0b3/" #house 1
# url = "https://www.homes.com/property/1325-nellies-cave-rd-blacksburg-va/rk3m86v31vdv5/" #house 2
# url = "https://www.homes.com/property/602-floyd-st-blacksburg-va/mhc1y9e4gemxb/"

url = "https://www.homes.com/property/565-brush-mountain-rd-blacksburg-va/9prkxp50m85ny/"

# Setup Chrome WebDriver using WebDriverManager
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get(url)

# Get the page source after JavaScript has loaded
soup = BeautifulSoup(driver.page_source, "html.parser")


subcategory_containers = soup.find_all('div', class_='subcategory-container')





# getHighlights()
# home_details()
# scrape_description()
# scrape_price()
# print("\n\n----------\n\n")
# getAmens()
# scrape_amenities()

# Run the function to scrape and return amenities data
amenities = scrape_amenities()
# Print in a JSON-like format (which is easy to parse and store)
formatted_output = json.dumps(amenities, indent=4)
print(formatted_output)
print(extract_year_built(amenities))
print(extract_sq_ft(amenities))

# getTaxData()
# Continue scraping or finish the script
driver.quit()




# driver.find_element(By.CSS_SELECTOR, "see-more-btn cta-button")
# see_more_button = driver.find_element(By.CSS_SELECTOR, "button.see-more-btn.cta-button")
# see_more_button.click()