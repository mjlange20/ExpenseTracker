import streamlit as st
import Database

placeholder = st.empty()

with placeholder.container():
    if 'login' not in st.session_state:

        testUsername = st.secrets['login_username']
        testPassword = st.secrets['login_password']

        st.title('Login')

        username = st.text_input("Username")
        password = st.text_input("Password", type="password")

        login = st.button("Login", type="primary")

        if login:
            if (username in testUsername) and (password == testPassword):
                # create session variable which allows navigating to pages
                st.session_state['login'] = True
                st.session_state['user'] = username
                # get rid of the login page
                placeholder.empty() 
            else:
                st.write('Invalid username and/or password') 
              
if 'login' in st.session_state:
    # Sidebar navigation
    st.sidebar.page_link('Home.py', label='Home')
    st.sidebar.page_link('pages/1_SeeData.py', label='View Data')
    st.sidebar.page_link('pages/2_Logout.py', label='Logout')

    st.write("# Log Expense")

    amount = st.number_input("Amount")
    type = st.selectbox(
    "Select Type",
    ("-None Selected-", "Food - Groceries", "Household - Groceries", "Food - Takeout", "Petrol", "Other"),
    )
    desc = st.text_input("Description")
    date = st.date_input("Expense Date")
    submit = st.button("Submit", type="primary")

    if submit:
        # check the fields arent missing values
        if amount <= 0.00:
            st.error('Amount cannot be 0')
        elif type == "-None Selected-":
            st.error('Type needs to be set')
        elif date is None:
            st.error('Date format is incorrect')
        else:
            Database.add_entry(st.session_state['user'], amount, type, desc, str(date))
            st.success('Data Uploaded')
            