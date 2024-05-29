import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
const { height, width } = Dimensions.get("window");
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Login = () => {

const navigation=useNavigation()
const [valipassword, setvalipassword] = useState(false);

const [valiemail, setvaliemail] = useState(false);

const [email, setemail] = useState("");
const [password, setpassword] = useState("");
const [showpass, setshowpass] = useState(true)
useEffect(() => {
  const CheckLoginStatus = async () => {
      try {
          const token = await AsyncStorage.getItem("Token")
          if (token) {
              navigation.replace("Home")
          }
      } catch (error) {
          console.log(error);
      }
  }

  CheckLoginStatus()

}, [])

const handleremail = (e) => {
  const emailvar = e.nativeEvent.text;
  setemail(emailvar);
  setvaliemail(false);
  if (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailvar)) {
    setemail(emailvar);
    setvaliemail(true);
  }
};

const handlepassword = (e) => {
  const passval = e.nativeEvent.text;
  setpassword(passval);
  setvalipassword(false);
  if (
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
      passval
    )
  ) {
    setpassword(passval);
    setvalipassword(true);
  }
};
const handleClick = async () => {
  try {
    console.log(email, password);
    const dataSend = await axios.post('http://192.168.43.145:5000/signin', {
      email: email,
      password: password
    });
    console.log(dataSend.data);
    if (dataSend.data.status === "ok") {
      Alert.alert("Successfully Login !!")
      AsyncStorage.setItem("Token", dataSend.data.data);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }] 
      });
     navigation.navigate("Home")
 
    } else {
      console.log("Error:", dataSend.data); // Log error message
    }
  } catch (err) {
    console.log("Error:", err); // Log error message
  }
};

   
      return (
        <SafeAreaView
        style={{
          backgroundColor: "black",
          width:width,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          padding:10
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={"always"}
         
        >
          <Image
            style={{
              width: width * 0.5,
              height: height * 0.2,
              alignSelf: "center",
              marginTop: 20,
              marginBottom: 10,
            }}
            source={require("../../assets/netflix.png")}
          />
  
          <KeyboardAvoidingView>
            <Text
              style={{
                color: "white",
              fontSize: 20,
              marginBottom: 20,
              marginTop: 40,
              textAlign:'center',
              alignItems:'center',
              justifyContent:'center',
              flex:1,
              alignSelf:'center',
              alignContent:'center'
              }}
            >
             Enjoy the World of Entertaiment 
            </Text>
              <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              gap: 10,
              paddingHorizontal: 10,
            }}
          >
            <MaterialIcons
              name="email"
              size={25}
              color="gray"
              style={{ position: "relative", top: 15 }}
            />

            <TextInput
              placeholder="Email or Phone number"
              placeholderTextColor="gray" // Added placeholder text color
              style={{
                width: width * 0.6,
                height: 50, // Adjusted height
                color: "gray",
                borderColor: "black",
                fontSize: 18,
                underlineColorAndroid: "transparent",
              }}
              onChange={(e) => {
                handleremail(e);
              }}
            />
            {email.length < 1 ? null : valiemail ? (
              <AntDesign
                name="checkcircle"
                size={25}
                color="green"
                style={{ position: "relative", top: 15 }}
              />
            ) : (
              <Entypo
                name="circle-with-cross"
                size={25}
                color="red"
                style={{ position: "relative", top: 15 }}
              />
            )}
          </View>
          <Text
            style={{
              borderBottomColor: "gray",
              width: width / 1.2,
              borderBottomWidth: 3,
              position: "relative",
              bottom: 10,
            }}
          />
          {email.length < 1 ? null : valiemail ? null : (
            <Text style={{ color: "red", marginTop: 10, marginLeft: 20 }}>
              Enter correct email address
            </Text>
          )}

    
<View
            style={{
              flexDirection: "row",
              marginTop: 20,
              gap: 10,
              paddingHorizontal: 10,
            }}
          >
            <Entypo
              name="lock"
              size={25}
              color="gray"
              style={{ position: "relative", top: 15 }}
            />
            <TextInput
              placeholder="password"
              placeholderTextColor="gray" // Added placeholder text color
              secureTextEntry={showpass}
              style={{
                width: width * 0.6,
                height: 50, // Adjusted height
                color: "gray",
                borderColor: "black",
                fontSize: 18,
                underlineColorAndroid: "transparent",
              }}
              onChange={(e) => {
                handlepassword(e);
              }}
            />
            {password.length < 1 ? null : showpass ? (
              <Ionicons name="eye"
                size={25}
                color={valipassword?"green":"red"}
                style={{ position: "relative", top: 15 }}
                onPress={()=>{setshowpass(!showpass)}}
              />
            ) : (
              <Ionicons name="eye-off-sharp" 
              size={25}
              onPress={()=>{setshowpass(!showpass)}}
                color={valipassword?"green":"red"}
                style={{ position: "relative", top: 15 }}
              />
            )}



          </View>
          <Text
            style={{
              borderBottomColor: "gray",
              width: width / 1.2,
              borderBottomWidth: 3,
              position: "relative",
              bottom: 10,
            }}
          />

          {password.length < 1 ? null : valipassword ? null : (
            <Text style={{ color: "red", marginTop: 10,padding:10}}>
               8 character,1 digit,1 lowercase,1 uppercase,1 special character
            </Text>
          )}

    
              <Pressable onPress={() => console.log("Forgot password pressed")}>
                <Text
                  style={{
                    color: "gray",
             
                    fontSize: 18,
                    marginTop: 20,
                    alignSelf: "center",
                    marginTop: 20,
                    marginBottom: 10,
                  }}
                >
                  Forgot Password ?
                </Text>
              </Pressable>
    
              <Pressable
                style={{
                  backgroundColor: "#f71e1e",
                  width: width * 0.4,
                  height: height * 0.07,
                  justifyContent: "center",
                  alignItems: "center",
               
                  marginBottom: 10,
                  alignSelf: "center",
                  marginTop: 20,
                  marginBottom: 10,
                }}
                onPress={handleClick}         >
                <Text style={{ color: "white", fontSize: 18 }}>SIGN IN</Text>
              </Pressable>
    
              <Pressable
                style={{
                  backgroundColor: "black",
                  width: width * 0.4,
                  height: height * 0.07,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  marginTop: 20,
                  marginBottom: 20,
                  borderWidth: 3,
                  borderColor: "#f71e1e",
                }}
              >
                <Text style={{ color: "white", fontSize: 18 }} onPress={()=>{navigation.navigate('Signin')}}>SIGN UP</Text>
              </Pressable>
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      );
  
   
 
};

export default Login;
