import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, fallbackPersonImage } from "../Api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const MyComponent = ({ route }) => {
  const { data } = route.params || { data: [] };
  const [first, setFirst] = useState([]);
  const [sorted, setSorted] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getlist = await AsyncStorage.getItem("Listitem");
        if (getlist) {
          let sortedData = JSON.parse(getlist);
          setFirst(sortedData);
        }
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error);
      }
    };
    fetchData();
  }, [AsyncStorage]);

  useEffect(() => {
    const saveData = async () => {
      try {
        const existingData = await AsyncStorage.getItem("Listitem");
        let dataArray = [];
        if (existingData) {
          dataArray = JSON.parse(existingData);
        }
        dataArray.push(data);
        await AsyncStorage.setItem("Listitem", JSON.stringify(dataArray));
        console.log("Data saved successfully:", dataArray);
        setFirst(prevData => [...prevData, data]);
      } catch (error) {
        console.error("Error saving data to AsyncStorage:", error);
      }
    };
    
    saveData();
  }, [data]);

  const handleSort = () => {
    // Toggle sorting order
    const sortedArray = [...first].sort((a, b) => {
      if (sorted) {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setFirst(sortedArray);
    setSorted(!sorted);
  };
  
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.header} >
        <MaterialIcons
          name="arrow-back"
          size={30}
          color={"white"}
          onPress={() => navigation.goBack()} // Use navigation.goBack() to navigate back
        />
        <Text style={[styles.title, { flex: 1 }]}>My List</Text>
        <MaterialIcons
          name="mode-edit"
          size={30}
          color={"white"}
        />
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 7,
        }}
        onPress={handleSort}
      >
        <Text style={styles.sortByText}>Sort by</Text>
        <AntDesign
          name={sorted ? "caretup" : "caretdown"}
          size={20}
          color={"white"}
          style={{ position: "relative", bottom: 5 }}
        />
      </TouchableOpacity>
      <ScrollView>
        {first.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.replace(`Video`, { data: item })}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 10,
                marginBottom: 30,
              }}
            >
              <Image
                source={{
                  uri: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : fallbackMoviePoster,
                }}
                style={styles.img}
              />
              <Text style={styles.titleText}>{item.title}</Text>
              <AntDesign
                name="playcircleo"
                size={30}
                color={"white"}
                style={{ position: "relative", marginHorizontal: 10 }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop:10
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 10,
    color: "#ffffff",
  },
  sortByText: {
    color: "gray",
    fontSize: 18,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  img: {
    height: height * 0.12,
    width: width * 0.35,
    marginHorizontal: 5,
    borderRadius: 10,
    resizeMode: "cover",
  },
  titleText: {
    color: "white",
    flex: 1,
    fontSize: 15,
    textTransform: "uppercase",
    alignItems: "center",
    textAlign: "left",
    justifyContent: "center",
  },
});

export default MyComponent;
