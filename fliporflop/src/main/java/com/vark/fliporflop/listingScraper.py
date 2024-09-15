from selenium.webdriver.common.by import By
import sys
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time

# Setup Chrome WebDriver using WebDriverManager
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
url = "https://www.homes.com/"
driver.get(url)

time.sleep(2)
driver.find_element(By.XPATH, "//input[@aria-label='Place, Neighborhood, School or Agent']").send_keys(sys.argv[1])
time.sleep(1)
driver.find_element(By.ID, "propertySearchBtn").click()

# Get the page source after JavaScript has loaded
# time.sleep(1)  # Adjust sleep time based on page loading speed

# Get page source and parse with BeautifulSoup
soup = BeautifulSoup(driver.page_source, 'html.parser')

# Close the browser once the data is obtained
driver.quit()

# Find all property listings
property_listings = soup.find_all('li', class_='placard-container')[:12]
def get_image_url(image):
    for attr in ['src', 'data-defer-scroll-src', 'data-image']:
        url = image.get(attr)
        if url and ".jpg" in url:
            return url
    return None

image_set = property_listings[0].find_all_next('img', 'embla__slide__img image-container')
good_images = [get_image_url(image) for image in image_set if get_image_url(image)]
good_images.reverse()

# Loop through each property listing and extract relevant data
for property_listing in property_listings:
    if len(good_images) < 1:
        continue
    # Price
    price_tag = property_listing.find('p', class_='price-container')
    price = price_tag.get_text(strip=True) if price_tag else "No Price"

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
        beds, baths, sqft = "N/A", "N/A", "N/A"

    # Property description
    description_tag = property_listing.find('p', class_='property-description')
    description = description_tag.get_text(strip=True) if description_tag else "No Description"

    # Output the scraped data
    print(f"Price: {price}")
    print(f"Address: {address}")
    print(f"Beds: {beds}")
    print(f"Baths: {baths}")
    print(f"Sq Ft: {sqft}")
    print(f"Image URL: {good_images.pop()}")
    print(f"Description: {description}")
    print('-' * 50)

print("\nENDED RUN")
