import requests
import pandas as pd
import os


nnf_team_ids = {
    "The One Who Knocks": {"name": "The One Who Knocks", "id": 1323356},
    "Bomb Atomically 🏆🏆🏆": {"name": "Bomb Atomically 🏆🏆🏆", "id": 1323234},
    "AB CeeDee": {"name": "AB CeeDee", "id": 1323386},
    "Bills Mafia": {"name": "Bills Mafia", "id": 1325548},
    "El blanco lobo": {"name": "El blanco lobo", "id": 1324038},
    "BO CORREXT": {"name": "BO CORREXT", "id": 1323593},
    "IYKYK": {"name": "IYKYK", "id": 1323091},
    "The Kittle Mermaid": {"name": "The Kittle Mermaid", "id": 1323238},
    "Bounce Back BoJack": {"name": "Bounce Back BoJack", "id": 1325249},
    "Jobu’s Redemption": {"name": "Jobu's Redemption", "id": 1323264}
}

nnf_teams = list(nnf_team_ids.keys())

skill_positions = ["WR", "RB", "TE"]
columns = ['full_name', 'Team', 'position', 'Age', 'Value']


def cleanse_names(df, column):
    df['player_cleansed_name'] = df[column].str.replace(r'[^\w\s]+', '')
    return df

def get_league_rosters(league_id=197269, season=2024, scoring_period=18):
    url = 'https://www.fleaflicker.com/api/FetchLeagueRosters'
    response = requests.get(url, params={"sport": "NFL", "league_id": league_id, "season": season,
                                         "scoring_period": scoring_period})
    j_response = response.json()
    league_roster_dict = {}
    rosters = j_response['rosters']
    for team in rosters:
        team_name = team['team']['name']
        roster_list = []
        team_roster_dict = {}
        for player in team['players']:
            name = player['proPlayer']['nameFull']
            position = player['proPlayer']['position']
            player = {"name": name, "position": position}
            roster_list.append(player)
        team_roster_dict = {team_name: roster_list}
        league_roster_dict.update(team_roster_dict)
        player_list = []
        for key, value in league_roster_dict.items():
            for player in value:
                player_name = player['name']
                player_position = player['position']
                nnf_team = key
                loop_player_list = [player_name, player_position, nnf_team]
                player_list.append(loop_player_list)
    df_rosters = pd.DataFrame(player_list, columns=['Name', 'Pos', 'NNF_Team'])
    df_rosters = cleanse_names(df_rosters, 'Name')
    return df_rosters

def create_dynasty_dfs():
    current_dir = os.path.dirname(__file__)
    relative_path = os.path.join(current_dir, 'data', '1QBRankings_March25.xlsx')
    late_round = pd.read_excel(relative_path)
    late_round = cleanse_names(late_round, 'Player')
    relative_path = os.path.join(current_dir, 'data', 'fantasycalc_dynasty_rankings.csv')
    fantasy_calc = pd.read_csv(relative_path)
    fantasy_calc = cleanse_names(fantasy_calc, 'name')
    merged_dynasty = pd.merge(late_round, fantasy_calc,on='player_cleansed_name')
    return merged_dynasty

def create_rookie_rankings():
    current_dir = os.path.dirname(__file__)
    relative_path = os.path.join(current_dir, 'data', '1QB_Predraft_Rookies.xlsx')
    prospect_guide = pd.read_excel(relative_path)
    prospect_guide = cleanse_names(prospect_guide, 'Player')
    relative_path = os.path.join(current_dir, 'data', 'fantasycalc_dynasty_rookie_rankings.csv')
    fantasy_calc = pd.read_csv(relative_path)
    fantasy_calc = cleanse_names(fantasy_calc, 'name')
    relative_path = os.path.join(current_dir, 'data', 'Reception_Perception_Rookies.xlsx')
    reception_perception = pd.read_excel(relative_path)
    reception_perception = cleanse_names(reception_perception, 'Player')
    merged_rookies = pd.merge(prospect_guide, reception_perception, on='player_cleansed_name', how='outer')
    merged_rookies = pd.merge(merged_rookies, fantasy_calc, on='player_cleansed_name', how='outer')
    columns = ['Rk',
               'player_cleansed_name',
               'position',
               'Pos. Rank',
               'Tier',
               'ZAP Score',
               'Category',
               'Comparables',
               'value',
               'Height',
               'Weight',
               'Notes',
               'Summarized Notes',
               'Stylistic Comp',
                '% of Man Routes',
                '% of Zone Routes',
                '% of Press Routes',
                '% of Double Routes',
                'overallRank',
                'positionRank',
                'trend30day'
    ]
    merged_rookies = merged_rookies[columns]
    return merged_rookies

def print_by_team(teams, frame):
    for nnf_team in teams:
        team = frame.loc[frame["NNF_Team"] == nnf_team]
        print(team)
        columns = ['player_cleansed_name', 'Team_x', 'Pos_x', 'Age', 'Value', 'value', 'Buy/Sell/Hold', 'Harmon Tier', 'Harmon Rank','Seasonal Overall', 'Target']
        team.sort_values(by=['value'], inplace=True, ascending=False)
        players = team.player_cleansed_name.tolist()
        print(nnf_team)
        print("Likely Kept:")
        print("-------------")
        print(team[columns].head(10))
        keeper_value = team['Value'].head(10).sum()
        print(f"Value of Keepers: {keeper_value}")
        print("Likely Dropped:")
        print("----------------")
        roster_count = team['player_cleansed_name'].count()
        roster_max = 10
        if roster_count > roster_max:
            need_to_cut = roster_count - roster_max
            print(team[columns].tail(need_to_cut))
            dropped_value = team['Value'].tail(need_to_cut).sum()
            print(f"Value of dropped: {dropped_value}")
            team_value = team['Value'].sum()
            print(f"Total Team Value for {nnf_team}: {team_value}")
            
            
def get_sleeper_roster(league_id):
    url = f"https://api.sleeper.app/v1/league/{league_id}/rosters"
    
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        print("API data fetched successfully!")
        print(data)
    else:
        data = None
        print("Failed to fetch data. Status code: {response.status_code}")

    return data