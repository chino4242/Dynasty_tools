from bs4 import BeautifulSoup as Soup
import requests
import json
import os
import csv
import pandas as pd

session = requests.Session()

login_url = "https://myffpc.com/account/Login.aspx"
payload = {"username": "ryanjcontino", "password": "jF8pa7T&"}

response = session.post(login_url, data=payload)
if response.status_code == 200:
    print("Login successful")
else:
    print("Login Failed")    


def get_ffpc_roster(url):
    response = session.get(url)
    soup = Soup(response.text, "html.parser")
    lineup = soup.find("div", {"id": "lineupContainer"})
    players = soup.find_all("h4")
    string_list = [str(tag) for tag in players]
    string_list = string_list[:-3]
    new_list = []
    for player in string_list:
        player = player[4:-6]
        player = player.split(" ")
        player = player[:2]
        first_name = player[1]
        last_name = player[0].split(",")
        last_name = last_name[0]
        player = first_name + " " + last_name
        new_list.append(player)
    print(len(new_list))
    return new_list

def get_free_agents(url):
    #The intent of this function is to get the list of all available free agents and associate dynasty value to them
    pass
    response = session.get(url)
    soup = Soup(response.text, "html.parser")
    print(soup)

#even_rows = lineup.find_all("tr", {"class": "even"})
#even_columns = even_rows[0].find_all("td")
#print(even_columns)

#odd_rows = lineup.find_all("tr", {"class": "odd"})
#odd_columns = odd_rows[0].find_all("td")
#print(odd_columns)
#print(even_rows)
#print(odd_rows)

#players = soup.find_all("h4")
#print(players)

# ffc_response = requests.get('https://fantasyfootballcalculator.com/rankings/ppr')
# ffpc_response = requests.get('https://myffpc.com/SetLineup.aspx?ltuid=3B3-D086F1761204', auth=('ryanjcontino', 'jF8pa7T&'))
# print(ffpc_response.text)
# ffpc_soup = Soup(ffpc_response.text)
# adp_soup = Soup(ffc_response.text)
# tables = adp_soup.find_all('table')
# ffpc_tables = ffpc_soup.find_all('table')
# print(len(ffpc_tables))
# adp_table = tables[0]
# rows = adp_table.find_all('tr')
# header = rows[0]
# first_data_row = rows[1]
# """for each column in a row, convert to a real string"""
#
# def parse_row(row):
#     """for each row in a table, return a list of all the strings"""
#     return [str(x.string) for x in row.find_all('td')]
# first = parse_row(first_data_row)
# list_of_parsed_rows = [parse_row(row) for row in rows[1:]]
# df = pd.DataFrame(list_of_parsed_rows)
# df.columns=('rank', 'name', 'team', 'position', 'bye')
# print(df)
