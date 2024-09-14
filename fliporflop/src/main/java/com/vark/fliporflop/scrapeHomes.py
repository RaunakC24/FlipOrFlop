import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from selenium.common.exceptions import StaleElementReferenceException, NoSuchElementException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import sys

def getHighlights(soup):
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

def scrape_description(soup):
    # Find the <p> tag with id "ldp-description-text"
    description_tag = soup.find("p", {"id": "ldp-description-text"})
    if description_tag:
        # Extract and clean the text
        description_text = description_tag.get_text(strip=True)
        print(description_text)
    else:
        return "Description not found."

def getTaxData(soup):
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

def scrape_amenities(soup):
    # Create a dictionary to store the structured data
    amenities_data = {}
    
    # Find all the categories (sections with headings like 'Listing Details', 'Interior Features', etc.)
    categories = soup.find_all('div', class_='subcategory')

    for category in categories:
        # Get the heading (e.g., 'Listing Details', 'Interior Features')
        heading = category.find('p', class_='amenity-name').text.strip()

        # Get the list items under each category
        list_items = category.find_all('li', class_='amenities-detail')

        # Store details in a list
        details = [item.text.strip() for item in list_items]
        
        # Add the heading and details to the dictionary
        amenities_data[heading] = details
    
    return amenities_data

def grabImage(soup):
    img = soup.find("", "")
    # Your implementation here

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

def getPriceAndAddress(driver):
    try:
        # Wait for the elements to be present
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "price"))
        )
        price = driver.find_element(By.ID, "price").text
    except NoSuchElementException:
        price = "Price not found"

    try:
        address = driver.find_element(By.CLASS_NAME, "property-info-address-main").text
    except NoSuchElementException:
        address = "Address not found"
    
    print("price: " + price)
    print("python scrapeHomes.py " + address)

def scrape_images(driver):
    # List to store image URLs
    good_images = []

    try:
        # Find all <img> elements with the specific class
        image_elements = driver.find_elements(By.CLASS_NAME, "primary-carousel-slide-img")

        for image in image_elements:
            try:
                # Check 'src' attribute
                src = image.get_attribute('src')
                if src and ".jpg" in src:
                    good_images.append(src)
                    break
            except StaleElementReferenceException as e:
                print(f"StaleElementReferenceException when extracting 'src': {e}")
            
            try:
                # Check 'data-src' attribute
                data_src = image.get_attribute('data-src')
                if data_src and ".jpg" in data_src:
                    good_images.append(data_src)
                    break
            except StaleElementReferenceException as e:
                print(f"StaleElementReferenceException when extracting 'data-src': {e}")
            
            try:
                # Check 'data-image' attribute
                data_image = image.get_attribute('data-image')
                if data_image and ".jpg" in data_image:
                    good_images.append(data_image)
                    break
            except StaleElementReferenceException as e:
                print(f"StaleElementReferenceException when extracting 'data-image': {e}")
    except TimeoutException as e:
        print(f"TimeoutException: {e}")

    print("Image URLs: " + str(good_images[0]))

def run():
    url = "https://www.homes.com/"
    # Setup Chrome WebDriver using WebDriverManager
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))


    # Open the URL
    driver.get(url)

    # Reinitialize `soup` with the updated page source


    time.sleep(1)
    driver.find_element(By.XPATH, "//input[@aria-label='Place, Neighborhood, School or Agent']").send_keys(sys.argv[1])
    time.sleep(1)
    driver.find_element(By.ID, "propertySearchBtn").click()
    # time.sleep(1)
    soup = BeautifulSoup(driver.page_source, "html.parser")

    # print("Description:")
    # scrape_description(soup)

    getPriceAndAddress(driver)

    print("\nTax Data:")
    getTaxData(soup)
    
    print("\nAmenities:")
    amenities = scrape_amenities(soup)
    print(json.dumps(amenities, indent=4))

    print("\nSqFt:" + str(extract_sq_ft(amenities)))
    print("\nYear Built:" + str(extract_year_built(amenities)))

    # Scrape images
    scrape_images(driver)

    driver.quit()


run()
# urls = [
#     "https://www.homes.com/property/565-brush-mountain-rd-blacksburg-va/9prkxp50m85ny/",
#     "https://www.homes.com/property/the-preserve-single-family-homes-savannah-blacksburg-va/2f4je0skpc0b3/",
#     "https://www.homes.com/property/1325-nellies-cave-rd-blacksburg-va/rk3m86v31vdv5/",
#     "https://www.homes.com/property/602-floyd-st-blacksburg-va/mhc1y9e4gemxb/"
# ]

# Loop through URLs and run the scraper for each
# for url in urls:
#     print(f"--" * 10)
#     print(f"\nScraping URL: {url}")
#     run(url)
