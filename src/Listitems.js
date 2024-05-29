import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fallbackMoviePoster } from "./Api/Api";

const { height, width } = Dimensions.get("window");

const Listitems = () => {
  const [first, setFirst] = useState([]);
  const [sorted, setSorted] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getlist = await AsyncStorage.getItem("Listitem");
        if (getlist) {
          setFirst(JSON.parse(getlist));
        }
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error);
      }
    };
    fetchData();
  }, [AsyncStorage]);

  const handleSort = () => {
    // Toggle sorting order
    const sortedArray = first.slice().sort((a, b) => {
      if (sorted) {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setFirst(sortedArray);
    setSorted(!sorted);
  };

  const handleRemoveItem = async (itemIndex) => {
    // Create a new array without the item to be removed
    const updatedList = first.filter((_, index) => index !== itemIndex);
    // Update state and AsyncStorage with the updated list
    setFirst(updatedList);
    await AsyncStorage.setItem("Listitem", JSON.stringify(updatedList));
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back"
          size={30}
          color={"white"}
          onPress={() => navigation.goBack()}
        />
        <Text style={[styles.title, { flex: 1 }]}>All List</Text>
        <MaterialIcons name="mode-edit" size={30} color={"white"} />
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
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(`Video`, { data: item })}
          >
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
                  uri: item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : fallbackMoviePoster,
                }}
                style={styles.img}
              />
              <Text style={styles.titleText}>{item.title.slice(0,10)}...</Text>
             
              <AntDesign
                name="playcircleo"
                size={25}
                color={"white"}
                style={{ position: "relative"}}
              />
               <TouchableOpacity
                onPress={() => handleRemoveItem(index)}
                style={{ marginLeft:10,zIndex: 30 ,marginHorizontal:10}}
              >
                <AntDesign name="delete" size={25} color={"red"} />
              </TouchableOpacity>
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
    marginHorizontal:10
  },
});

export default Listitems;
