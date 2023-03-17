import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { BankItem } from './models';

const tableName = 'Data';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'bank-data.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getBankItems = async (db: SQLiteDatabase): Promise<BankItem[]> => {
  try {
    const bankItems: BankItem[] = [];
    const results = await db.executeSql(`SELECT rowid as id,value FROM ${tableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        bankItems.push(result.rows.item(index))
      }
    });
    
    return bankItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get bankItems !!!');
  }
};

export const saveBankItems = async (db: SQLiteDatabase, bankItems: BankItem[]) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName} (bankName, age, url, description) values` +
    bankItems.map(i => `(${i.bankName}, '${i.age}', '${i.url}', '${i.description}')`).join(',');
    console.log(insertQuery, 'hola')

  return db.executeSql(insertQuery);
};
