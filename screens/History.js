import { StyleSheet, Text, View, StatusBar, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


const History = () => {
  const [books, setBooks] = useState([]);
  const [history, setHistory] = useState([]);
  // const [setCart, setSetCart] = useState([]);

  // fetchh all books from json file----
  useEffect(() => {
      const customData = require('../data/data.json');
      setBooks(customData);
      getHistory();
  }, [])

  useEffect(() => {
    getHistory();
  }, [])

  const getHistory = async () => {
    try {
        const value = await AsyncStorage.getItem('history')
        setHistory(JSON.parse(value));
        console.log(JSON.parse(value));
    } catch (e) {
        // error reading value
    }
}

if(history==null || history.length==0){
  return (
    <View style={styles.main} >
      <Text style={styles.historyText}>Purchase History</Text>
      <Text style={{fontSize: 20, color: '#666', textAlign: 'center'}} >No purchase history found</Text>
    </View>
  )
}
  return (
    <View style={styles.main} >
      <Text style={styles.historyText}>Purchase History</Text>
      <ScrollView>
        {history.map((book, index) => {
          return (
            <TouchableOpacity key={index} style={{ flexDirection: 'row', marginVertical: 10, padding: 10, backgroundColor: '#f5f5f5', borderRadius: 10 }}>
              <Image source={{
                uri: book.URL
              }} style={{ height: 100, width: 70, resizeMode: 'cover', }} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }} >{book.date}</Text>
                <Text style={{ fontSize: 15, color: '#666' }} >Time:- {book.time}</Text>
                <Text style={{ fontSize: 15, color: '#666' }} >Price:- ₹{book.total}</Text>
                
                <Text style={{ fontSize: 15, color: '#666' }} >Book(s):-</Text>
                {
                  books.map((item, index) => {
                    if(book.books.includes(item.ID)){
                      return (
                        <Text key={index} style={{ fontSize: 15, color: '#666' }} >{item.Name}</Text>
                      )
                    }
                  })
                }

                
              </View>
            </TouchableOpacity>
          )
        })}
          
      </ScrollView>

    </View>
  )
}

export default History

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    historyText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        marginTop: 10,
    },
})