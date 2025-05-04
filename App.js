import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, FlatList, Modal, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchPlaceDetails, fetchAllExpenses, init, insertPlace, clearDb } from './util/database';
import ExpenseItem from './components/ExpenseItem';

// itialize the db
init();

// clearDb();

// this is where eveything kicks off from when the app runs
export default function App() {

  // react hook which allows state management in memory [value, function that sets value] - set default value to empty string
  const [itemValue, setItemValue] = useState('');
  const [amountValue, setAmountValue] = useState(0.00);
  const [expenseList, setExpenseList] = useState([]);

  // on Pressable press run this function
  const handlePress = () => {
    // Alert.alert('Input Submitted', itemValue || 'Input is empty');

  // insert the values entered into the db
  insertPlace(itemValue, amountValue);
  };

  // update the list of expenses everytime something changes
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchAllExpenses();
        setExpenseList(result);
        // setLoading(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }; 
    getData() // runs as part of the original useEffect
  }, [expenseList]); // will update evertime expenseList changes 

  return (
        <View style={styles.container}>
          <Text style={styles.heading}>Expense Tracker</Text>
          <ScrollView style={styles.scrollContainer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.nameInputContainer} placeholder='Item' onChangeText={setItemValue} placeholderTextColor='grey'></TextInput>
            <TextInput style={styles.amountInputContainer} placeholder='Amount' keyboardType='numeric' onChangeText={setAmountValue} placeholderTextColor='grey'></TextInput>
          </View>
          <Pressable onPress={handlePress} style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1.0,
            },
            styles.buttonContainer,
            ]}
          >
            <Text>Add</Text>
          </Pressable>
          </ScrollView>
          <View style={styles.listContainer}>
            <FlatList 
            data={expenseList}
            renderItem={({item}) => <ExpenseItem item={item}/>}
            keyExtractor={item => item.Id}
            />
          </View>
          <StatusBar style="auto" />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  listContainer: {
    flex: 8,
    width: '95%',
    borderTopWidth: 1
  },
  nameInputContainer: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    marginRight: 7,
    height: 60,
    backgroundColor: "white",
    color: 'black',
  },
  amountInputContainer: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    height: 60,
    backgroundColor: 'white',
    marginLeft: 7,
    color: 'black'
  },
  buttonContainer: {
    backgroundColor: '#C5CDB7',
    borderWidth: 1,
    alignItems: 'center',
    height: 60,
    marginTop: 20,
    alignContent: 'center',
    justifyContent: 'center'
  },
  heading: {
    fontSize: 40,
    paddingTop: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  scrollContainer: {
    width: '95%',
    paddingTop: 35
  }
});
