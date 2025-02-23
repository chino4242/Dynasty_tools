from flask import Flask, request, render_template
import requests
import pandas as pd
from services import *
import os

app = Flask(__name__)

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
    return render_template('index.html', table_html=table_html)     
         
if __name__ == '__main__':
    app.run(debug=True)