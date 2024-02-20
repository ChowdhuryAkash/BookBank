import { StyleSheet, Text, View, StatusBar, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';



const Cart = ({ navigation }) => {
    const [books, setBooks] = useState([]);
    const [getCart, setGetCart] = useState([]);
    const [history, setHistory] = useState([]);
    // const [setCart, setSetCart] = useState([]);

    // fetchh all books from json file----
    useEffect(() => {
        const customData = require('../data/data.json');
        setBooks(customData);
        getData();
        getHistory();
    }, [])
    useEffect(() => {
        console.log(getCart);
    }, [getCart])



    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('cart', value)
            getData();
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('cart')
            setGetCart(JSON.parse(value));
        } catch (e) {
            // error reading value
        }
    }
    const storeHistory = async (value) => {
        try {
            await AsyncStorage.setItem('history', value)
            getHistory();
        } catch (e) {
            // saving error
        }
    }
    const getHistory = async () => {
        try {
            const value = await AsyncStorage.getItem('history')
            setHistory(JSON.parse(value));
            console.log(JSON.parse(value));
            if(JSON.parse(value)==null){
                storeHistory(JSON.stringify([]));
                getHistory();
            }
        } catch (e) {
            // error reading value
        }
    }

    const placeOrder = () => {
        alert('Order placed successfully, you can find order history in history section');
        storeHistory(JSON.stringify([...history, { books: getCart, date: new Date().toDateString(), time: new Date().toLocaleTimeString(), total: books.reduce((total, book) => {
            if (getCart == null) {
                return 0;
            }
            if (getCart.includes(book.ID)) {
                return total + book.Price;
            }
            return total;
        }, 0)
    }]))
        storeData(JSON.stringify([]));

    }
    return (
        <View style={styles.main} >
            <Text style={styles.heading} >My Cart <AntDesign name="shoppingcart" size={24} color="black" /></Text>



            {/* <Text style={styles.heading} >Discover</Text> */}

            <ScrollView
                style={{
                    maxHeight: '80%',
                    borderBottomColor: 'rgba(0,0,0,0.1)',
                    borderBottomWidth: 1,
                }}

            >
                <View style={styles.books}>
                    {
                        books.map((book, index) => {
                            if (getCart == null) {
                                return;
                            }
                            if (!getCart.includes(book.ID)) {
                                return;
                            }
                            return (
                                <TouchableOpacity key={book.ID}
                                    onPress={() => {
                                        navigation.navigate('Book', { book: book })
                                    }}>
                                    <View style={styles.book}>
                                        <Image source={{
                                            uri: book.URL,
                                        }} style={styles.bookImage} />
                                        <View>
                                            <Text style={styles.bookTitle} >{book.Name}</Text>
                                            <Text style={styles.bookAuthor} >{book.Author}</Text>
                                            <Text style={styles.bookPrice} >₹{book.Price}</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    var arr = [];
                                                    if (getCart != null) {
                                                        arr = getCart;
                                                    }
                                                    if (arr.includes(book.ID)) {
                                                        arr.splice(arr.indexOf(book.ID), 1);
                                                        storeData(JSON.stringify(arr));
                                                        getData();
                                                        return;
                                                    }

                                                }}>
                                                <Text style={styles.addCart} >Remove</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }

                </View>
            </ScrollView>
            <View style={styles.paymentSection}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, }}>Total: ₹{
                    books.reduce((total, book) => {
                        if (getCart == null) {
                            return 0;
                        }
                        if (getCart.includes(book.ID)) {
                            return total + book.Price;
                        }
                        return total;
                    }, 0)
                }</Text>

                {/* // make payment button */}

                {
                    //if price is 0 remove the payment button
                    books.reduce((total, book) => {
                        if (getCart == null) {
                            return 0;
                        }
                        if (getCart.includes(book.ID)) {
                            return total + book.Price;
                        }
                        return total;
                    }, 0) == 0 ? null : <TouchableOpacity
                        onPress={() => {
                            placeOrder();
                        }}>
                        <Text style={{
                            color: '#FFF',
                            backgroundColor: 'rgba(16,108,216,0.8)',
                            padding: 10,
                            borderRadius: 5,
                            textAlign: 'center',
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginTop: 10,
                        }} >Place order</Text>
                    </TouchableOpacity>


                }
            </View>

        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        padding: 20,
        backgroundColor: '#fff',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    books: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    book: {
        width: '98%',
        backgroundColor: 'rgba(16,108,216,0.1)',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
    },
    bookImage: {
        width: '40%',
        alignSelf: 'center',
        height: 150,
        resizeMode: 'cover',
    },
    bookTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10,
    },
    bookAuthor: {
        fontSize: 15,
        marginLeft: 10,
        marginTop: 5,
    },
    bookPrice: {
        fontSize: 15,
        marginLeft: 10,
        marginTop: 5,
    },
    addCart: {
        fontSize: 15,
        marginLeft: 10,
        color: '#FFF',
        backgroundColor: 'rgba(255,20,20,0.5)',
        padding: 5,
        borderRadius: 5,
        width: 100,
        textAlign: 'center',
        marginTop: 15,

    },
    paymentSection: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',

    }


})