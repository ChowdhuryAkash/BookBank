import { StyleSheet, Text, View, StatusBar, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';

const Book = ({ navigation, route }) => {    
    const book = route.params.book;

    useEffect(() => {
        console.log(book);
    }, [])
  return (
    <View style={styles.main}>
        {/* <StatusBar translucent /> */}
        <Image source={{
            uri: book.URL
        
        }} style={styles.bookImage} />
        <Text style={styles.bookName} >{book.Name}</Text>
        <Text style={styles.author} >{book.Author}</Text>
        <Text style={styles.description} >{book.Description}</Text>
        <Text style={styles.price} >₹{book.Price}</Text>
    </View>
  )
}

export default Book

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    bookImage: {
        height: 300,
        width: 200,
        alignSelf: 'center',
        resizeMode: 'cover',
        marginVertical: 20,
        borderColor: '#666',
        borderWidth: 1,
    },
    bookName: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    author: {
        fontSize: 20,
        color: '#666',
    },
    description: {
        fontSize: 18,
        color: '#999',
        marginVertical: 10,
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#666',
    }

})