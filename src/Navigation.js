import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import List from "./List/List";
import Screen from "./Screen/Screen";
import Profile from "./Profile/Profile";
import Videos from "./Video/Videoitem";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Search from "./Search/Search";
import Login from "./Register/Login";
import Signin from "./Register/Signin";
import Listitems from "./Listitems";
import { Dimensions } from "react-native"; // Import Dimensions

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Stacknavigation = () => {
  return (    <NavigationContainer>
    <Stack.Navigator>
       <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Tabnavigation}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="List"
        component={List}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Video"
        component={Videos}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={Profile}
      />
     
    </Stack.Navigator>
    </NavigationContainer>
  );
};

const Tabnavigation = () => {
  const { width } = Dimensions.get("window"); // Get window width
  return (

      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            width: width,
            paddingTop: 0,
            backgroundColor: "#000000",
            borderTopWidth: 0,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconComponent;
            let iconColor = focused ? "red" : "gray";

            if (route.name === "Home") {
              iconComponent = focused ? (
                <MaterialCommunityIcons name="home" size={30} color={iconColor} />
              ) : (
                <MaterialCommunityIcons
                  name="home-outline"
                  size={30}
                  color={iconColor}
                />
              );
            } else if (route.name === "Lists") {
              iconComponent = focused ? (
                <MaterialCommunityIcons
                  name="format-list-bulleted"
                  size={30}
                  color={iconColor}
                />
              ) : (
                <MaterialCommunityIcons
                  name="format-list-bulleted"
                  size={30}
                  color={iconColor}
                />
              );
            } else if (route.name === "Search") {
              iconComponent = focused ? (
                <Ionicons name="search" size={30} color={iconColor} />
              ) : (
                <Ionicons name="search-outline" size={30} color={iconColor} />
              );
            }
            return iconComponent;
          },
        })}
      >
        <Tab.Screen name="Home" component={Screen} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Lists" component={Listitems} />
      </Tab.Navigator>
    
  );
};

export default Stacknavigation
