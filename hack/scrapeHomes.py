from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
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


def home_details():
    category_details = {}

    # Find all category containers
    category_containers = soup.find_all("div", {"class": "subcategory-container"})

    for container in category_containers:
        subcategory = container.find("div", {"class": "subcategory"})
        if subcategory:
            # Extract the amenity name
            amenity_name = subcategory.find("p", {"class": "amenity-name"})
            amenity_name_text = amenity_name.get_text(strip=True) if amenity_name else "Unknown"

            # Extract all amenities details
            amenities_list = subcategory.find("ul", {"class": "amenities-list"})
            amenities_details = [item.get_text(strip=True) for item in amenities_list.find_all("li", {"class": "amenities-detail"})]

            category_details[amenity_name_text] = amenities_details

    print(category_details)

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

def print_address(soup):
    address_tag = soup.find("span", class_="property-info-address-main")
    if address_tag:
        print(f"\nAddress: {address_tag.get_text(strip=True)}")
    else:
        print("\nAddress not found")


# Setup Chrome WebDriver using WebDriverManager
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# Open the page with Selenium
url = "https://www.homes.com/property/the-preserve-single-family-homes-savannah-blacksburg-va/2f4je0skpc0b3/" #house 1
# url = "https://www.homes.com/property/1325-nellies-cave-rd-blacksburg-va/rk3m86v31vdv5/" #house 2
driver.get(url)

# Get the page source after JavaScript has loaded
soup = BeautifulSoup(driver.page_source, "html.parser")
getHighlights()
home_details()
# scrape_description()

# scrape_amenities()

scrape_price()














# Continue scraping or finish the script
driver.quit()