import { StyleSheet, Text, View, StatusBar, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';



const Homescreen = ({ navigation }) => {
    const [books, setBooks] = useState([]);
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [getCart, setGetCart] = useState([]);
    // const [setCart, setSetCart] = useState([]);

    // fetchh all books from json file----
    useEffect(() => {
        const customData = require('../data/data.json');
        setBooks(customData);
        getData();
    }, [])
    useEffect(() => {
        console.log(getCart);
    }, [getCart])

    // after first rendering of books, set searchedBooks to books
    useEffect(() => {
        setSearchedBooks(books);
    }, [books])

    // filter books based on search value
    useEffect(() => {
        setSearchedBooks(books.filter((book) => {
            return book.Name.toLowerCase().includes(search.toLowerCase()) || book.Author.toLowerCase().includes(search.toLowerCase())
        }))
    }, [search])



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




    return (
        <View style={styles.main} >
            <Text style={styles.heading} >Welcome to BookBank</Text>



            {/* Search section starts here ====================== */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
            }} >

                <View style={styles.searchBox}>
                    <AntDesign name="search1" size={20} color="#aaa" />
                    <TextInput style={styles.input}
                        value={search}
                        placeholder="Search for title, author" onChangeText={(e) => {
                            setSearch(e)
                        }} />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setSearch('');
                    }}
                >
                    <Text style={{
                        color: '#666',
                        fontWeight: 'bold',
                        fontSize: 15,

                    }}>Cancel</Text>
                </TouchableOpacity>

            </View>

            {/* Search section ends here ======================== */}
            <Text style={styles.heading} >Discover all books</Text>

            <ScrollView>
                <View style={styles.books}>
                    {
                        searchedBooks.map((book, index) => {
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
                                            {
                                                //if book is already in cart, show remove button
                                                getCart!=null && getCart.includes(book.ID) ?
                                                <Text style={styles.addedCart} >Added to cart</Text>
                                                    
                                                    :
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            var arr = [];
                                                            if (getCart != null) {
                                                                arr = getCart;
                                                            }
                                                            if (arr.includes(book.ID)) {
                                                                alert('Already added to cart');
                                                                return;
                                                            }
                                                            arr.push(book.ID);
                                                            console.log(arr);
                                                            storeData(JSON.stringify(arr));
                                                            alert('Added to cart');

                                                        }}>
                                                        <Text style={styles.addCart} >Add to cart</Text>
                                                    </TouchableOpacity>
                                            }
                                            
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }

                </View>
            </ScrollView>

        </View>
    )
}

export default Homescreen

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
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    searchBox: {
        backgroundColor: '#EFEFEF',
        padding: 5,
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        width: '82%',
        borderColor: '#ddd',
        borderWidth: 1,
    },
    input: {
        marginLeft: 10,
        width: '90%',
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
        backgroundColor: 'blue',
        padding: 5,
        borderRadius: 5,
        width: 100,
        textAlign: 'center',
        marginTop: 15,

    },
    addedCart: {
        fontSize: 15,
        marginLeft: 10,
        color: '#FFF',
        backgroundColor: 'rgba(0,100,0,0.25)',
        padding: 5,
        borderRadius: 5,
        width: 110,
        textAlign: 'center',
        marginTop: 15,

    }




})