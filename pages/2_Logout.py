import streamlit as st

if 'login' not in st.session_state:
    st.switch_page("Home.py")
else:
    # Delete all the items in Session state
    for key in st.session_state.keys():
        del st.session_state[key]

    st.switch_page("Home.py")