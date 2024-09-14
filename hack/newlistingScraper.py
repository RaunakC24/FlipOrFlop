from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Setup Chrome WebDriver using WebDriverManager
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
url = "https://www.homes.com/blacksburg-va/24060/?bb=n3r7tygj9H1kjk-hI"
driver.get(url)

# Wait for the placard-container elements to load (timeout after 10 seconds)
wait = WebDriverWait(driver, 10)
property_listings = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, 'placard-container')))

# Loop through each property listing and extract relevant data
for property_listing in property_listings:
    # Price
    try:
        price = property_listing.find_element(By.XPATH, ".//p[contains(@class, 'price-container')]").text.strip()
    except:
        price = "No Price"

    # Address
    try:
        address = property_listing.find_element(By.XPATH, ".//p[contains(@class, 'property-name')]").text.strip()
    except:
        address = "No Address"

    # Beds, Baths, Sq Ft
    try:
        beds = property_listing.find_element(By.XPATH, ".//ul[@class='detailed-info-container']//li[1]").text.strip()
    except:
        beds = "N/A"

    try:
        baths = property_listing.find_element(By.XPATH, ".//ul[@class='detailed-info-container']//li[2]").text.strip()
    except:
        baths = "N/A"

    try:
        sqft = property_listing.find_element(By.XPATH, ".//ul[@class='detailed-info-container']//li[3]").text.strip()
    except:
        sqft = "N/A"

    # Image URL
    try:
        image_url = property_listing.find_element(By.XPATH, ".//div[contains(@class, 'embla__slide__inner')]//img").get_attribute('src')
        # if ".jpg" in image_url:
        print(f"Image URL: {image_url}")
        # else:
        #     image_url = "No .jpg Image Found"
    except:
        image_url = "No Image"

    # Description
    try:
        description = property_listing.find_element(By.XPATH, ".//p[contains(@class, 'property-description')]").text.strip()
    except:
        description = "No Description"

    # Output the scraped data
    print(f"Price: {price}")
    print(f"Address: {address}")
    print(f"Beds: {beds}")
    print(f"Baths: {baths}")
    print(f"Sq Ft: {sqft}")
    print(f"Image URL: {image_url}")
    print(f"Description: {description}")
    print('-' * 50)

# Close the browser once the data is obtained
driver.quit()
