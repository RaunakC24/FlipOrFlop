from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
chrome_options = webdriver.ChromeOptions()

chrome_options.add_argument("--headless")
chrome_options.add_argument("--headless=new")

driver = webdriver.Chrome()

from bs4 import BeautifulSoup

# Setup Chrome options for headless mode
# options = ChromeOptions()
# options.add_argument("--headless=new")
# driver = webdriver.Chrome(options=options)


# Setup Chrome WebDriver using WebDriverManager with options
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
url = "https://www.homes.com/blacksburg-va/24060/?bb=n3r7tygj9H1kjk-hI"
driver.get(url)

# Wait until the specific element (e.g., listings) is loaded on the page
try:
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "placard-container")))
except Exception as e:
    print("Error loading page:", e)
    driver.quit()

# Get the page source and parse with BeautifulSoup
soup = BeautifulSoup(driver.page_source, "html.parser")

# Optionally, check if the HTML contains the desired data
print(soup.prettify()[:1000])  # Print first 1000 characters of the page source to check

# Close the browser once the data is obtained
driver.quit()

# Find all property listings
property_listings = soup.find_all('li', class_='placard-container')

# Loop through each property listing and extract relevant data
for property_listing in property_listings:
    # Price
    price = property_listing.find('p', class_='price-container').get_text(strip=True)

    # Address
    address_tag = property_listing.find('p', class_='property-name')
    address = address_tag.get_text(strip=True) if address_tag else "No Address"

    # Beds, Baths, Sq Ft
    detailed_info = property_listing.find('ul', class_='detailed-info-container')
    if detailed_info:
        info_items = detailed_info.find_all('li')
        beds = info_items[0].get_text(strip=True) if len(info_items) > 0 else "N/A"
        baths = info_items[1].get_text(strip=True) if len(info_items) > 1 else "N/A"
        sqft = info_items[2].get_text(strip=True) if len(info_items) > 2 else "N/A"
    else:
        beds = baths = sqft = "N/A"

    # Property description
    description_tag = property_listing.find('p', class_='property-description')
    description = description_tag.get_text(strip=True) if description_tag else "No Description"

    # Output the scraped data
    print(f"Price: {price}")
    print(f"Address: {address}")
    print(f"Beds: {beds}")
    print(f"Baths: {baths}")
    print(f"Sq Ft: {sqft}")
    print(f"Description: {description}")
    print('-' * 50)
