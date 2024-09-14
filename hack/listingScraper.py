from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time


# Setup Chrome WebDriver using WebDriverManager
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
url = "https://www.homes.com/blacksburg-va/24060/?bb=n3r7tygj9H1kjk-hI"
driver.get(url)

# Get the page source after JavaScript has loaded
time.sleep(2)  # Adjust sleep time based on page loading speed

# Get page source and parse with BeautifulSoup
soup = BeautifulSoup(driver.page_source, 'html.parser')

# Close the browser once the data is obtained
driver.quit()

# Find all property listings
property_listings = soup.find_all('li', class_='placard-container')

# print(driver.page_source)



dummy_url = property_listings[0].find_all_next('img', class_='embla__slide__img image-container')
for thing in dummy_url:
    print(thing)
    print("\n")
    if "images.homes.com" in thing:
        print(thing.get('src'))




# Loop through each property listing and extract relevant data
for property_listing in property_listings:
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



    # Search for the embla_slide_inner div and find the img tag inside
    # embla_div = property_listing.find('div', class_='embla__slide__inner')
    # if embla_div:
    #     image_tag = embla_div.find('img')
    #     if image_tag:
    #         image_url = image_tag.get('src')
    #         if ".jpg" in image_url:  # Only select image URLs containing ".jpg"
    #             print(f"Image URL: {image_url}")
    #         else:
    #             image_url = "No .jpg Image Found"
    #     else:
    #         image_url = "No Image"
    # else:
    #     image_url = "No Image"

    # Property description
    description_tag = property_listing.find('p', class_='property-description')
    description = description_tag.get_text(strip=True) if description_tag else "No Description"

    # Output the scraped data
    # print(f"Price: {price}")
    # print(f"Address: {address}")
    # print(f"Beds: {beds}")
    # print(f"Baths: {baths}")
    # print(f"Sq Ft: {sqft}")
    # # print(f"Image URL: {image_url}")
    # print(f"Description: {description}")
    # print('-' * 50)
