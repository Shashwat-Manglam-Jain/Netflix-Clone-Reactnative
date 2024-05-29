import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, Image, Dimensions, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { fallbackMoviePoster } from '../Api/Api';
import { useNavigation } from '@react-navigation/core';

const { height, width } = Dimensions.get("window");

const Search = () => {
  const [change, setChange] = useState('');
  const [searchResults, setSearchResults] = useState([]);
const navigation = useNavigation()
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (change) {
          // Fetch data from the API based on the search query
          const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=888fc1dd6eab2ae6622c2823f98bbdd6&query=${change}`);
          setSearchResults(response.data.results);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [change]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Search Movie'
          placeholderTextColor='gray'
          style={styles.input}
          onChangeText={(text) => setChange(text)}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="circle-with-cross" size={36} color="gray" />
        </TouchableOpacity>
      </View>

      {searchResults.length === 0 ? (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/40/dd/64/40dd647c931fe08bf05a1a1414f97e4c.jpg' }}
            style={styles.mainImage}
          />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{ position: "relative", top: 20 }} keyboardShouldPersistTaps={'handled'}>
          <Text style={[styles.resultText,{position:'relative',left:10,bottom:6,zIndex: 20,}]}>Result ({searchResults.length})</Text>
          <View style={styles.imageContainer}>
            {searchResults.map((val, ind) => (
           <View key={ind} style={styles.movieContainer} >
<TouchableOpacity onPress={() => navigation.navigate("Video", { data: val })}>
<Image
                  source={{
                    uri: val.poster_path ? `https://image.tmdb.org/t/p/w500${val.poster_path}` : fallbackMoviePoster,
                  }}
                  style={styles.image}
                />
                <Text style={styles.title}>
                  {val.title.length > 20 ? `${val.title.slice(0, 20)}...` : val.title}
                </Text>
</TouchableOpacity>
           
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 10,
    marginTop: 30,
  },
  input: {
    color: 'white',
    flex: 1,
    fontSize: 20,
    marginLeft: 10,
    height: 40,
  },
  mainImage: {
    width: width,
    height: height * 0.5,
    marginTop: 60,
    resizeMode: 'cover',
  },
  resultText: {
    color: 'white',
    
    marginBottom: 15,
    marginLeft: 15,
    fontSize: 18,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Align items in two columns
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  movieContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: width * 0.4, // Adjust the width to occupy 40% of the screen width
    height: height * 0.3, // Adjust the height as needed
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Search;
