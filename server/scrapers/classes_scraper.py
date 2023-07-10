import requests
from bs4 import BeautifulSoup

# Define the URL of the website to scrape
url = "http://student.mit.edu/catalog/index.cgi"

# Send a GET request to the URL
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.content, "html.parser")

# Find all the course links
ul_element = soup.find("ul")

li_elements = ul_element.find_all("li")

links = []

pagination = "bcdefghijklmnopqrstuvwxyz"
# Iterate over the li elements and extract the links
for li in li_elements:
    link = li.find("a")
    if link:
        links.append(f"http://student.mit.edu/catalog/{link.get('href')}")
    # print(link)
    try:
        paginated_link = list(link.get("href"))
        for letter in pagination:
            paginated_link[-6] = letter
            res = requests.get(
                f"http://student.mit.edu/catalog/{''.join(paginated_link)}")

            if res.status_code == 200:
                # print(res.status_code)
                links.append(
                    f"http://student.mit.edu/catalog/{''.join(paginated_link)}")
            else:
                # print(letter)
                break
    except:
        pass


# iterate over the links and save all courses in a list
courses = set()
for link in links:
    response = requests.get(link)
    soup = BeautifulSoup(response.content, "html.parser")
    table = soup.find("table", width="100%", border="0")
    # print(table)
    a_tags = table.find_all("a", attrs={"name": True})
    for a_tag in a_tags:
        # print(a_tag["name"])
        courses.add(a_tag["name"])

print(len(courses))
