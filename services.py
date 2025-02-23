import pandas as pd
import requests

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
    relative_path = os.path.join(current_dir, 'data', '1QBRankings_February25.xlsx')
    late_round = pd.read_excel(relative_path)
    late_round = cleanse_names(df_rosters, 'Player')