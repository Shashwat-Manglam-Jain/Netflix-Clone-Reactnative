import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useFonts } from 'expo-font';
import { fallbackMoviePoster } from '../Api/Api';

const { height, width } = Dimensions.get("window");


const MyComponent = ({ title, data }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); // State to track loading status
  const navigation = useNavigation();

  let [fontsLoad] = useFonts({
    'FrankRuhlLibre-Medium': require('../../assets/fonts/FrankRuhlLibre-Medium.ttf'),
  });
  let [fonts] = useFonts({
    'DancingScript-Bold': require('../../assets/fonts/DancingScript-Bold.ttf'),
  });

  if ( !fontsLoad || !fonts) {
    return (
      null
    );
  }

 

  useEffect(() => {
    if(data !== null) {
      setImages(data);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [data]);

  const renderItem = ({ item }) => {
    if (loading) {

      return (
     
          <View style={styles.skeletonImage} >
      
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => { 
          navigation.navigate('Video', { data: item });
        }}>
          <View>
          <Image
  source={{
    uri: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : fallbackMoviePoster
  }}
  style={styles.img}
/>

            <Text style={styles.itemTitle}>
              {item.title.length > 5 ? item.title.slice(0, 16) + '...' : item.title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        pagingEnabled
        data={images}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemTitle: {
    color: 'gray',
    textAlign: 'center',
    fontFamily:'DancingScript-Bold',
    fontSize:19
  },
  container: {
    flex: 1,
    backgroundColor:'black',
    marginBottom: 20,
    position:'relative',
    bottom:25,
    zIndex: 30,
    
  
  },
  title: {
    marginHorizontal: 20,
    fontSize: 30,
    color: '#ffffff',
    marginTop: 14,
    fontFamily:'DancingScript-Bold',
    marginBottom: 10,
    
  },
  img: {
    width: width * 0.4,
    height: height * 0.4,
    resizeMode: 'cover',
    margin: 2,
    marginBottom: 10,
    marginHorizontal:10
  },
  skeletonImage: {
    width: width * 0.4,
    height: height * 0.4,
    resizeMode: 'cover',
    margin: 2,
    marginBottom: 10,
    marginHorizontal:10,
    backgroundColor: 'gray',
   
  }
});

export default MyComponent;
