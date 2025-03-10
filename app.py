from flask import Flask, request, render_template
import requests
import pandas as pd
from services import *
import os
from sleeper.api import (get_league, get_rosters)

app = Flask(__name__)

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

@app.route('/')
def home():  
    #Convert DataFrame to HTML
    df_rosters = get_league_rosters()
    table_html = df_rosters.to_html(classes='table table-striped', index=False)
    
    return render_template('index.html', table_html=table_html)              

@app.route('/jj')
def display_dynasty_rankings():
    late_round = create_dynasty_dfs()
    table_html = late_round.to_html(classes='table table-striped', index=False)
    return render_template('jj.html', table_html=table_html)     

@app.route('/team')
def team_view():
    nnf_rosters = get_league_rosters()
    team_roster = nnf_rosters.loc[nnf_rosters['NNF_Team'] == "IYKYK"]
    dynasty_df = create_dynasty_dfs()
    merged_nnf_lateround = pd.merge(team_roster, dynasty_df,on='player_cleansed_name')
    team_roster_sorted = merged_nnf_lateround.sort_values(by=['Tier', "Positional Rank"], ascending=True)
    team_roster_sorted.drop(columns=['player_cleansed_name', 'Player', 'Age', 'name','position', 'fantasycalcId', 'sleeperId', 'mflId'], inplace=True)
    table_html = team_roster_sorted.to_html(classes='table table-striped', index=False)
    
    
    return render_template('team.html', table_html=table_html)
    
    
if __name__ == '__main__':
    app.run(debug=True)