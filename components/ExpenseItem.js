import { Text, View, StyleSheet, Pressable, Modal, TextInput, ScrollView, Alert} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { deleteExpense, updateExpense } from '../util/database';

function ExpenseItem({item}) {
    const [modalVisible, setModalVisible] = useState(false);

    // store the passed values in a state variable for now (not sure if this is best practice but makes sense to me now)
    const [nameValue, setName] = useState(item.ItemName);
    const [amountValue, setAmount] = useState(item.Amount);
    const [dateValue, setDate] = useState(item.CreatedDate);

    const confirmDelete = () =>
        Alert.alert('Delete Confirmation', 'Are you sure?', [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'OK', onPress: () => deleteExpense(item.Id)},
        ]);

    const confirmEdit = () =>
        Alert.alert('Edit Confirmation', 'Are you sure?', [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'OK', onPress: () => updateAndExit()},
        ]);

    function updateAndExit() {
        updateExpense(nameValue, amountValue, dateValue, item.Id);
        setModalVisible(false);
    }

    return (
        <View>
            {/* when expense item is pressed open modal with the details of that item */}
            <Pressable style={({ pressed }) => [{opacity: pressed ? 0.5 : 1.0,}]} onPress={() => {setModalVisible(true)}}>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>{item.ItemName}</Text>
                    <Text style={styles.text}>R {item.Amount}</Text>
                    <Text style={styles.text}>{item.CreatedDate}</Text>
                </View>
            </Pressable>
            <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)} // Android back button
            >
                <ScrollView style={styles.modalContainer}>
                    <Text style={styles.heading}>Edit Item</Text>
                    {/* This view holds the original data of the item which can be modified or deleted */}
                    <View style={styles.currentValuesContainer}>
                        <Text style={styles.itemHeading}>Item Name</Text>
                        <TextInput style={styles.textInputContainer} value={nameValue} onChangeText={text => setName(text)}></TextInput>
                        <Text style={styles.itemHeading}>Amount (R)</Text>
                        <TextInput style={styles.textInputContainer} value={amountValue.toString()} keyboardType='numeric' onChangeText={text => setAmount(text)}></TextInput>
                        <Text style={styles.itemHeading}>Date (YYYY-MM-DD)</Text>
                        <TextInput style={styles.textInputContainer} value={dateValue} onChangeText={text => setDate(text)}></TextInput>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable style={({ pressed }) => [{opacity: pressed ? 0.5 : 1.0,}, styles.modelButtonModify]} onPress={confirmEdit}>
                            <Text>Modify</Text>
                        </Pressable>
                        <Pressable style={({ pressed }) => [{opacity: pressed ? 0.5 : 1.0,}, styles.modelButtonDelete]} onPress={confirmDelete}>
                            <Text>Delete</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#C5CDB7',
        width: '100%',
        marginVertical: 10,
        borderWidth: 1,
    },
    text: {
        color: 'black',
        width: '100%',
    },
    modalContainer: {
        backgroundColor: "#106365",
        flex: 1
    },
    modelButtonModify: {
        borderWidth: 1,
        width: '100%',
        marginVertical: 10,
        backgroundColor: '#C5CDB7',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modelButtonDelete: {
        borderWidth: 1,
        width: '100%',
        marginBottom: 40,
        marginTop: 10,
        backgroundColor: '#C5CDB7',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 40,
        color: 'white',
        paddingVertical: 15
    },
    currentValuesContainer: {
        width: '100%',
        paddingVertical: 15,
        marginVertical: 5,
        flex: 1,
        borderWidth: 1
    },
    textInputContainer: {
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: 10,
        marginVertical: 10,
        height: 60,
        backgroundColor: "white"
    },
    itemHeading: {
        color: "white",
        marginHorizontal: 10,
        fontSize: 20
    },
    buttonText: {
        fontSize: 20
    },
    buttonContainer: {
        height: 250
    }
})