import React, {useCallback, useEffect, useState} from 'react';

import axios from 'axios';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  createTable,
  getDBConnection,
  getBankItems,
  saveBankItems,
} from '../services/db-service';
import {BankItem} from '../services/models';

const List = () => {

  const [banks, setBanks] = useState<BankItem[]>([]);


  const loadDataCallback = useCallback(async () => {
    try {

      const db = await getDBConnection();
      await createTable(db);
      const storedBankItems = await getBankItems(db);
      if (storedBankItems.length) {
        setBanks(storedBankItems);
      } else {
        await saveBankItems(db, banks);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetch("https://dev.obtenmas.com/catom/api/challenge/banks")
    .then(res => res.json())
    .then(
      (result) => {
        setBanks(result);
      },
      (error) => {

      }
    )
    loadDataCallback();
  }, [loadDataCallback]);

  return (
    <FlatList
      data={banks}
      keyExtractor={item => item.bankName}
      renderItem={({item}) => (
          <View
            style={styles.card}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.url,
              }}
            />
            <View>
                <Text style={styles.name} >{item.bankName}</Text>
                <Text style={styles.tiny} >{item.description}</Text>
                <Text style={styles.tiny} >{item.age}</Text>
            </View>

          </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    hero: {
      backgroundColor: 'white'
    },
    card:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C0C0C0',
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 20,
        
    },
    name:{
        fontFamily: 'Nunito',
        color: 'black',
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontSize: 16
    },
    tiny:{
        fontFamily: 'Nunito',
        fontWeight: 'bold',

    },
    tinyLogo: {
      width: 50,
      height: 30,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });
export default List;
