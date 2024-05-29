import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  BackHandler,
  Alert,
  RefreshControl,
} from "react-native";
import Play from "react-native-vector-icons/FontAwesome";
import Plus from "react-native-vector-icons/Feather";
import Check from "react-native-vector-icons/Feather";
import Info from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { getPopularMoviesUrl, general, fallbackMoviePoster } from "../Api/Api"; // Import the general function
import axios from "axios";
import { useFonts } from "expo-font";
import Items from "../Items/Items";
import { Nowplaying } from "../Api/Api";
import { Toprated } from "../Api/Api";
import { upcoming } from "../Api/Api";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("window")


// Create component
const MyComponent = () => {
  const [movies, setMovies] = React.useState([]);
  const [initial, setInitial] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [trend, settrend] = React.useState([]);
  const [rated, setrated] = React.useState([]);
  const [upcome, setupcoming] = React.useState([]);
  const [iden, setiden] = React.useState(true);
  const genreUrl = general(); // Call the general function
  const navigation = useNavigation();
  const [refres, setrefreshing] = useState(false);
 
  const handleBackPress = () => {
    Alert.alert("Exit app", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Exit",
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };
  
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };
    })
  );

  

  // Load custom font
  let [fontsLoaded] = useFonts({
    "DancingScript-Regular": require("../../assets/fonts/DancingScript-Regular.ttf"),
  });
  let [fontsLoad] = useFonts({
    "FrankRuhlLibre-Medium": require("../../assets/fonts/FrankRuhlLibre-Medium.ttf"),
  });
  let [fonts] = useFonts({
    "DancingScript-Bold": require("../../assets/fonts/DancingScript-Bold.ttf"),
  });

  const handleRefresh = () => {
    setrefreshing(true);
    navigation.reset({
      index: 3,
      routes: [{ name: 'Home' }] 
    });
    setTimeout(() => {
      setrefreshing(false);
    }, 500); 
  };



  useEffect(() => {
    axios
      .get(getPopularMoviesUrl())
      .then((response) => {
        settrend(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); 

  useEffect(() => {
    axios
      .get(Toprated())
      .then((response) => {
        setrated(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); 
  useEffect(() => {
    axios
      .get(upcoming())
      .then((response) => {
        setupcoming(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Removed upcoming from dependencies array

  useEffect(() => {
    axios
      .get(Nowplaying())
      .then(function (response) {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });

    // Fetch movie genres
    axios
      .get(genreUrl)
      .then(function (response) {
        setInitial(response.data.genres);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [genreUrl, Nowplaying]); // Added genreUrl to dependencies array

  const renderItem = ({ item }) => {
    // Map genre ids to their corresponding names
    const genres = item.genre_ids.map((genreId) => {
      const genre = initial.find((g) => g.id === genreId);
      return genre ? genre.name : null;
    });

    // Filter out null values and join the genres with dots
    const genreString = genres.filter(Boolean).join(" . ");
    const List = () => {
      setiden(!iden);
      setTimeout(() => {
        setiden(iden);
      }, 2000);
      navigation.navigate("List", { data: item });
    };
    if (loading) {
      return <View style={styles.skeletonImage}></View>;
    } else {
      return (
        <View style={styles.whole}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Video", { data: item });
            }}
          >
            <ImageBackground
              source={{
                uri: item.poster_path
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  : fallbackMoviePoster,
              }}
              style={styles.imageContainer}
            >
              <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
              />
              <View style={styles.overlay}>
                <Text style={styles.title}>
                  {item.title.length > 20
                    ? item.title.slice(0, 20) + "..."
                    : item.title}
                </Text>
                <Text style={styles.subtitle}>{genreString}</Text>
                <View style={[styles.actions, { zIndex: 30 }]}>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      {
                        marginTop: height * 0.02,
                        marginHorizontal: width * 0.05,
                        zIndex: 30,
                      },
                    ]}
                    onPress={List}
                  >
                    {iden ? (
                      <Plus name="plus" size={30} color="#fff" />
                    ) : (
                      <Check name="check" size={34} color="#fff" />
                    )}
                    <Text style={[styles.actionText, { zIndex: 100 }]}>
                      My List
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      {
                        marginTop: height * 0.02,
                        marginHorizontal: width * 0.05,
                        backgroundColor: "white",
                        padding: height * 0.015,
                        borderRadius: height * 0.01,
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                        zIndex: 100,
                      },
                    ]}
                    onPress={() => {
                      navigation.navigate("Video", { data: item });
                    }}
                  >
                    <Play name="play" size={30} color="#000" />
                    <Text style={[styles.actionText, { color: "black" }]}>
                      Play
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      {
                        marginTop: height * 0.02,
                        marginHorizontal: width * 0.05,
                        zIndex: 100,
                      },
                    ]}
                  >
                    <Info name="info-circle" size={30} color="#fff" />
                    <Text style={[styles.actionTex, { zIndex: 100 }]}>
                      Info
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)", "black"]}
              style={{
                position: "absolute",
                width: width,
                top: height * 0.3,
                height: height * 0.7,
                pointerEvents: "none",
              }}
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  // Wait for fonts to load before rendering
  if (!fontsLoaded || !fontsLoad || !fonts) {
    return null;
  }

  return (
    <ScrollView style={styles.container} refreshControl={
      <RefreshControl refreshing={refres} onRefresh={handleRefresh} />
    }>
      <FlatList
        pagingEnabled
        showsVerticalScrollIndicator={false}
        horizontal
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        
      />
      <View>
        <Items title={"Popular on Netflix"} data={trend} />
        <Items title={"Trending Now"} data={rated} />
        <Items title={"Watch it Again"} data={upcome} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  whole: { width: width, height: height * 0.7 },
  container: {
    width: width,
    height: height,
    backgroundColor: "black",
  },
  imageContainer: {
    width: width,
    height: height * 0.7,
    resizeMode: "cover",
  },
  skeletonImage: {
    width: width,
    height: height * 0.7,
    backgroundColor: "#ccc",
    marginBottom: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)", // Adjust opacity here
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: height * 0.09,
    zIndex: 100,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: "center",
    borderRadius: 10,
    zIndex: 100,
  },
  actionText: {
    color: "#FFF",
    zIndex: 200,
    fontFamily: "FrankRuhlLibre-Medium",
  },
  title: {
    fontSize: 40,
    color: "#FFF",
    marginBottom: 15,
    textAlign: "center",
    marginTop: (height * 0.5) / 2.4,
    fontFamily: "DancingScript-Bold",
  },
  subtitle: {
    color: "#bdc3c7",
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "DancingScript-Regular",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
});

export default MyComponent;
