import * as SQLite from 'expo-sqlite';
     
// import { Place } from '../models/place';
 
const database = SQLite.openDatabaseSync('Expenses.db');

export function clearDb() {
    return database.runAsync(`
        DELETE FROM D_Expenses
        `)
}
 
export function init() {
    console.log('Running db initialize');
    return database.runAsync(`
        CREATE TABLE IF NOT EXISTS D_Expenses (
            Id INTEGER PRIMARY KEY NOT NULL,
            ItemName TEXT NOT NULL,
            Amount REAL,
            CreatedDate TEXT
        )
    `);
}
 
export function insertPlace(ItemName, Amount) {
    return database.runAsync(
        `
            INSERT INTO D_Expenses (ItemName, Amount, CreatedDate)
            VALUES (?, ?, ?)
        `,
        [
            ItemName,
            Amount,
            new Date().toISOString().split('T')[0]
        ]
    );
}
 
export async function fetchAllExpenses() {
    const result = await database.getAllAsync('SELECT * FROM D_Expenses ORDER BY CreatedDate DESC');

    return result;
}
 
export function deleteExpense(id) {
    return database.runAsync(
        'DELETE FROM D_Expenses WHERE id = ?',
        [id]
    );
}

export function updateExpense(itemName, Amount, CreatedDate, Id) {
    return database.runAsync(
        `UPDATE D_Expenses 
            SET ItemName = ?, Amount = ?, CreatedDate = ?
            WHERE id = ?`,
        [itemName, Amount, CreatedDate, Id]
    );
}