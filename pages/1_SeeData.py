import streamlit as st
import Database
from datetime import datetime

if 'login' not in st.session_state:
    st.switch_page("Home.py")
else:
    # Sidebar navigation
    st.sidebar.page_link('Home.py', label='Home')
    st.sidebar.page_link('pages/1_SeeData.py', label='View Data')
    st.sidebar.page_link('pages/2_Logout.py', label='Logout')

    # initalize db fetched
    df = Database.fetch_data()
    df['created_at'] = df['created_at'].apply(lambda row: datetime.strptime(row,"%Y-%m-%dT%H:%M:%S.%f%z"))
    df['created_at'] = df['created_at'].apply(lambda row: row.strftime("%Y-%m-%dT%H:%M:%S"))

    # drop the id column 
    df.drop(['id'], axis=1, inplace=True)

    st.dataframe(df)