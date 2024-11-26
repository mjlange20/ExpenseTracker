import pandas as pd
from supabase import create_client, Client
import streamlit as st

url = st.secrets['db_url']
key = st.secrets['db_key']

st.session_state['Client'] = create_client(url, key)

def fetch_data():
    data_response = st.session_state['Client'].table("D_Detail").select("*").order("created_at", desc=True).execute()

    df_response = pd.DataFrame(data_response.data, columns = ['id','created_at','created_by','type', 'amount', 'description', 'expense_date']) 

    st.session_state['df_response'] = df_response

    return (df_response)

def add_entry(user, amount, type, description, expense_date):
    response = (
    st.session_state['Client'].table("D_Detail")
    .insert({"created_by": user, "type": type, "amount": amount, "description": description, "expense_date": expense_date})
    .execute()
    )
