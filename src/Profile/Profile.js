import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { Person, fallbackPersonImage } from "../Api/Api";
import axios from "axios";
const { width, height } = Dimensions.get("window");
import { useFonts } from "expo-font";
import Items from "../Items/Items";

import { Personmovies } from "../Api/Api";

const MyComponent = ({ route }) => {
  const [first, setfirst] = React.useState([]);
  const { data } = route.params;
  let [fonts] = useFonts({
    "DancingScript-Bold": require("../../assets/fonts/DancingScript-Bold.ttf"),
  });
  React.useEffect(() => {
    const Persondata = async () => {
      try {
        const pdata = await axios.get(Person(data.id));

        setfirst(pdata.data);
      } catch (err) {
        console.log(err);
      }
    };
    Persondata();
  }, [data.id]);

  console.log(data);

  const [personmov, setPersonmov] = React.useState([]);

  React.useEffect(() => {
    const fetchPersonMovies = async () => {
      try {
        const response = await axios.get(Personmovies(first.id)); // Assuming Personmovies is a function returning a URL
        console.log(`Cast Data: ${response.data.cast}`);
        setPersonmov(response.data.cast);
      } catch (error) {
        console.error("Error fetching person movies:", error);
      }
    };

    fetchPersonMovies();
  }, [first.id]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"transparent"} />
      <ScrollView>
        <LinearGradient
          colors={["gray", "white", "wheat", "gray"]}
          start={{ x: 0, y: 0.6 }}
          end={{ x: 0.7, y: 1 }}
          style={styles.gradient}
        >
          <Image
            source={{
              uri:first.profile_path ? `https://image.tmdb.org/t/p/w500${
                first.profile_path }` : fallbackPersonImage
            }}
            style={styles.img}
          />
        </LinearGradient>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            marginTop: 3,
            marginBottom: 5,
            fontSize: 24,
            fontFamily: "DancingScript-Bold",
          }}
        >
          {first.name}
        </Text>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            margin: 3,
            marginBottom: 10,
            fontSize: 20,
            fontFamily: "DancingScript-Bold",
          }}
        >
          {data.character}
        </Text>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            marginTop: 3,
            marginBottom: 5,
            fontSize: 18,
            fontFamily: "DancingScript-Bold",
          }}
        >
          Place of Birth
        </Text>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            marginTop: 3,
            marginBottom: 5,
            fontSize: 18,
            fontFamily: "DancingScript-Bold",
          }}
        >
          {first.place_of_birth}{" "}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            color: "gray",
            backgroundColor: "white",
            padding: 10,
            borderRadius: 50,
            gap: 4,
          }}
        >
          <View>
            <Text style={styles.te1}>Character</Text>
            <Text style={styles.te2}>{data.character.slice(0, 15)}</Text>
          </View>
          <View style={styles.naming}>
            <Text style={styles.te1}>Birthday</Text>
            <Text
              style={[styles.te2, { alignSelf: "center", marginBottom: 10 }]}
            >
              {first.birthday}
            </Text>
          </View>
          <View style={styles.naming}>
            <Text style={styles.te1}>Gender</Text>
            <Text style={styles.te2}>
              {first.gender == 1 ? "Female" : "Male"}
            </Text>
          </View>
          <View style={styles.naming}>
            <Text style={styles.te1}>Popularity</Text>
            <Text style={styles.te2}>{first.popularity}%</Text>
          </View>
        </View>

        <Text
          style={{
            color: "white",
            textAlign: "center",
            marginTop: 16,
            marginBottom: 5,
            fontSize: 24,
            fontFamily: "DancingScript-Bold",
          }}
        >
          Biography
        </Text>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            margin: 3,
            marginBottom: 30,
            fontSize: 18,
            fontFamily: "DancingScript-Bold",
          }}
        >
          {first.also_known_as} {first.biography}
        </Text>
        <Items data={personmov} title={"Movies Done"} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    paddingTop: 25,
    fontFamily: "DancingScript-Bold",
  },
  naming: {
    borderLeftWidth: 4,
    borderColor: "gray",
    marginLeft: 2,
  },
  gradient: {
    marginTop: 10,
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    height: height * 0.53,
    width: width * 0.86,
    borderRadius: width * 0.43, // Half of the image's width
  },
  img: {
    alignSelf: "center",
    alignItems: "center",
    borderRadius: width * 0.43,
    backgroundColor: "#2d2d2d",
    height: height * 0.49,
    width: width * 0.77,
    resizeMode: "cover",
    margin: 10,
    marginBottom: 10,
    position: "absolute",
  },

  te1: {
    color: "#212121",
    textAlign: "center",
    margin: 3,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "DancingScript-Bold",
  },
  te2: {
    color: "gray",
    textAlign: "center",
    margin: 3,
    marginBottom: 10,
    fontSize: 15,
    fontFamily: "DancingScript-Bold",
  },
});

export default MyComponent;
