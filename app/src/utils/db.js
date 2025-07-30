import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const dbName = 'SafeNAV.db';

export const openDB = async () => {
  return SQLite.openDatabase({ name: dbName, location: 'default' });
};

export const initUserTable = async () => {
  const db = await openDB();
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      contact1 TEXT NOT NULL,
      contact2 TEXT NOT NULL
    );
  `);
};

export const insertUser = async (user) => {
  const db = await openDB();
  const { name, phone, contact1, contact2 } = user;
  await db.executeSql(
    'INSERT INTO users (name, phone, contact1, contact2) VALUES (?, ?, ?, ?);',
    [name, phone, contact1, contact2]
  );
};

export const getUser = async () => {
  const db = await openDB();
  const results = await db.executeSql('SELECT * FROM users LIMIT 1;');
  return results[0].rows.length > 0 ? results[0].rows.item(0) : null;
};