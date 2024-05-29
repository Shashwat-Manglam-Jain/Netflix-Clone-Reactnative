import React, { useEffect,  useRef  } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { StatusBar } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/core";
import { fallbackMoviePoster, fallbackPersonImage, general } from "../Api/Api";
import axios from "axios";
const { width, height } = Dimensions.get("window");
import { people } from "../Api/Api";
import Items1 from "../Items/Items1";
import { Similar } from "../Api/Api";
import { useFonts } from 'expo-font';

const MyComponent = ({ route }) => {
  const { data } = route.params;
  const [first, setfirst] = React.useState(true);
  const [coloritem, setcoloritem] = React.useState(true);
  const [dislike, setdislike] = React.useState(true);
  const [vplay, setvplay] = React.useState(true);
  const genreUrl = general();
  const [initial, setInitial] = React.useState();
  const [peoples, setPeoples] = React.useState([]);
  const [similr, setsimilr] = React.useState([]);
  

  let [fonts] = useFonts({
    'DancingScript-Bold': require('../../assets/fonts/DancingScript-Bold.ttf'),
  });


  useEffect(() => {
  
  }, [data]);
  React.useEffect(() => {
    axios
      .get(genreUrl)
      .then(function (response) {
        setInitial(response.data.genres);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [genreUrl]);

  React.useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await axios.get(people(data.id));
        setPeoples(response.data.cast);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPeople();
  }, [data.id]);

  React.useEffect(() => {
    const Similarmovies = async () => {
      try {
        let datasim = await axios.get(Similar(data.id));

        setsimilr(datasim.data.results); // Check if you need to access `data.results`
      } catch (err) {
        console.log("Error:", err.response.data); // Log the error response
      }
    };

    Similarmovies();
  }, [data.id]);

  const [status, setStatus] = React.useState({});

  const navigation = useNavigation();
  const genre_ids = (genreIds) => {
    if (!initial) return null;

    const matchedGenres = initial.filter((genre) =>
      genreIds.includes(genre.id)
    );
    return matchedGenres.map((genre) => genre.name).join(" . ");
  };

  return (
    <SafeAreaView style={styles.container}>
  <ScrollView  showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
        <TouchableOpacity onPress={() => setvplay(false)}>
          {vplay ? (
            <View>
              <ImageBackground
                source={{
                  uri:data.poster_path ? `https://image.tmdb.org/t/p/w500${
                    data.poster_path 
                  }`:fallbackMoviePoster,
                }}
                style={styles.imageContainer}
              >
                {/* Your ImageBackground content */}
              </ImageBackground>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="play-circle"
                  style={styles.playIcon}
                  color="white"
                  size={41}
                />
              </View>
            </View>
          ) : (
            <View>
              <Video
                source={{
                  uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                }}
                style={{
                  width: width,
                  height: height * 0.52,
                  position: "relative",
                  justifyContent: "center",
                  resizeMode: "cover",
                }}
                shouldPlay
                useNativeControls
                resizeMode="cover"
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.detailsContainer}>
          <View style={styles.detailsHeader}>
            <Text style={styles.imdbText}>IMDB</Text>
            <Text style={styles.detailsText}>{`${data.vote_average.toFixed(
              1
            )} . ${data.release_date.slice(0, 4)} . ${
              data.original_language
            } . `}</Text>
            <Text style={[{ color: "green", fontSize: 18 }]}>100% match</Text>
          </View>
          <View style={styles.line} />
          <Text
            style={{
              color: "white",
              fontSize: 25,
              marginBottom: 10,
              marginTop: 5,
              fontFamily:    'DancingScript-Bold'
            }}
          >
            {data.title}
          </Text>
          <Text style={styles.descriptionText}>
            {data.original_title} {data.overview}
          </Text>
          <View style={styles.line} />
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons
                name="arrow-collapse-down"
                style={styles.icon}
                color="white"
                size={21}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setdislike(!dislike)}
            >
              {dislike ? (
                <AntDesign
                  name="plussquareo"
                  style={styles.icon}
                  color="white"
                  size={21}
                />
              ) : (
                <MaterialCommunityIcons
                  name="bookmark-check"
                  style={styles.icon}
                  color="white"
                  size={21}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => setvplay(!vplay)}
            >
              <AntDesign name="caretright" color="black" size={25} />
              <Text style={styles.playText}>Watch Now</Text>
            </TouchableOpacity>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <TouchableOpacity
                style={
                  first
                    ? styles.iconButton
                    : [styles.iconButton, { backgroundColor: "white" }]
                }
                onPress={() => setfirst(!first)}
              >
                {first ? (
                  <AntDesign
                    name="like2"
                    style={styles.icon}
                    color="white"
                    size={21}
                  />
                ) : (
                  <AntDesign
                    name="like1"
                    style={styles.icon}
                    color="red"
                    size={21}
                  />
                )}
              </TouchableOpacity>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  margin: 6,
                  fontSize: 15,
                }}
              >
                {(data.vote_count / 1000).toFixed(1)}M
              </Text>
            </View>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                setcoloritem(!coloritem);
                setTimeout(() => {
                  setcoloritem(coloritem);
                }, 2000);
                navigation.navigate("List", { data: data });
                
              }}
            >
              {coloritem ? (
                <AntDesign
                  name="plus"
                  style={styles.icon}
                  color="white"
                  size={21}
                />
              ) : (
                <MaterialCommunityIcons
                  name="check"
                  style={styles.icon}
                  color="white"
                  size={21}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line} />
        <Text
          style={{
            color: "white",
            textAlign: "center",
            margin: 6,
            fontSize: 22,
            fontFamily:    'DancingScript-Bold'
          }}
        >
          {" "}
          {genre_ids(data.genre_ids)}
        </Text>
        <View style={styles.line} />
        <Text
          style={{
            margin: 6,
            fontSize: 18,
            fontWeight: "500",
            color: "white",
            fontSize: 25,
            marginHorizontal: 10,
            marginBottom: 10,
            marginTop: 5,
            fontFamily:    'DancingScript-Bold'
          }}
        >
          {" "}
          The Cast
        </Text>

        <ScrollView    
        horizontal
      keyboardShouldPersistTaps={"always"}
        showsHorizontalScrollIndicator={false}>
          {peoples.map((val, ind) => (
            <View
              style={{ display: "flex", flexDirection: "column" }}
              key={ind}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.replace(`Profile`, { data: val });
                 
                }}
              >
       
                <Image
                  source={{
                    uri:val.profile_path? `https://image.tmdb.org/t/p/w500${
                      val.profile_path 
                    }`:fallbackPersonImage
                  }}
                  style={styles.img}
                />
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    margin: 3,
                    fontSize: 15,
                    fontFamily:    'DancingScript-Bold'
                  }}
                >
                  {val.known_for_department}
                </Text>
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    margin: 3,
                    marginBottom: 10,
                    fontSize: 16,
                    fontFamily:    'DancingScript-Bold'
                  }}
                >
                  {val.name.length > 10
                    ? `${val.name.slice(0, 10)}...`
                    : val.name}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View style={styles.line} />
        <Items1 title={"Similar Movies"} data={similr} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    fontFamily:    'DancingScript-Bold'
  },
  img: {
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: "#2d2d2d",
    height: 80,
    width: 80,
    justifyContent: "center",
    resizeMode: "cover",
    margin: 10,
    marginHorizontal: 10,
    marginHorizontal: 5,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  line: {
    borderBottomColor: "white",
    fontFamily:    'DancingScript-Bold',
    borderBottomWidth: 1,
    marginVertical: 10, // Adjust the margin as needed
  },
  imageContainer: {
    width: width,
    height: height * 0.5,
    resizeMode: "cover",
    position: "relative",

    opacity: 0.5,
  },
  detailsContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    fontFamily:    'DancingScript-Bold',
    padding: 20,
  },
  detailsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  imdbText: {
    backgroundColor: "#d4b630",
    fontFamily:    'DancingScript-Bold',
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  detailsText: {  fontFamily:    'DancingScript-Bold',
    color: "white",
    fontSize: 18,

  },
  descriptionText: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
    fontFamily:    'DancingScript-Bold'
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  iconButton: {
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#2d2d2d",
    height: height * 0.07,
    width: width * 0.12,
    justifyContent: "center",
    marginHorizontal: 5,
  },
  icon: {
    position: "relative",
  },
  playButton: {
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#ffffff",
    height: height * 0.07,
    width: width * 0.37,
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "center",
  },
  playIcon: {
    position: "relative",
    marginTop: (-height * 0.5) / 2,
  },
  playText: {
    color: "black",
    fontSize: 18,
   
    position: "relative",
    fontFamily:    'DancingScript-Bold',

    bottom: 1,
  },
});

export default MyComponent;
