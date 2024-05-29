import React, { useState } from "react";
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
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
const { height, width } = Dimensions.get("window");
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";


const Signin = () => {
  const navigation = useNavigation();
  const [name, setname] = useState("");
  const [validname, setvalidname] = useState(false);
  const [valipassword, setvalipassword] = useState(false);
  const [valimobile, setvalimobile] = useState(false);
  const [valiemail, setvaliemail] = useState(false);
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showpass, setshowpass] = useState(true)

  const handlesubmit = async () => {
    try {
      if (validname && valiemail && valimobile && valipassword) {
        const response = await axios.post("http://192.168.43.145:5000/signup", { name, email, password, mobile });
        // Check if the response is successful and contains data
        if (response.status === 200 && response.data) {
          console.log(response.data);
          if (response.data.status === 'ok') {
            Alert.alert("Signup Successful");
            navigation.navigate('Home')
          } else {
            Alert.alert(response.data.data);
          }
        } else {
          console.error('Failed to submit data or empty response');
        }
      } else {
        Alert.alert("Fill mandatory details!!");
      }
    } catch (error) {
      console.error('Error occurred while submitting data:', error);
    }
  };
  
  const handlename = (e) => {
    const namevar = e.nativeEvent.text;
    setname(namevar);
    setvalidname(false);
    if (namevar.length > 1) {
      setvalidname(true);
    }
  };

  const handleremail = (e) => {
    const emailvar = e.nativeEvent.text;
    setemail(emailvar);
    setvaliemail(false);
    if (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailvar)) {
      setemail(emailvar);
      setvaliemail(true);
    }
  };

  const handlemobile = (e) => {
    const mobileval = e.nativeEvent.text;
    setmobile(mobileval);
    setvalimobile(false);
    if (/^[6-9]\d{9}$/.test(mobileval)) {
      setmobile(mobileval);
      setvalimobile(true);
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

  return (
    <SafeAreaView
      style={{
       
        backgroundColor: "black",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        padding:10,
        width:width
     
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
            Start your free 30 days trail
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              gap: 10,
              paddingHorizontal: 10,
            }}
          >
            <Feather
              name="user"
              size={25}
              color="gray"
              style={{ position: "relative", top: 15 }}
            />
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor="gray" // Added placeholder text color
              style={{
                width: width * 0.6,
                height: 50, // Adjusted height
                color: "gray",
                fontSize: 18,
                underlineColorAndroid: "transparent",
              }}
              onChange={(e) => {
                handlename(e);
              }}
            />
            {name.length < 1 ? null : validname ? (
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

          {name.length < 1 ? null : validname ? null : (
            <Text style={{ color: "red", marginTop: 10, marginLeft: 20 }}>
              Name should be more than 1 character
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
            <AntDesign
              name="mobile1"
              size={25}
              color="gray"
              style={{ position: "relative", top: 15 }}
            />
            <TextInput
              placeholder="mobile number"
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
                handlemobile(e);
              }}
            />
            {mobile.length < 1 ? null : valimobile ? (
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

          {mobile.length < 1 ? null : valimobile ? null : (
            <Text style={{ color: "red", marginTop: 10, marginLeft: 20 ,padding:10}}>
              mobile number with 6-9 and remaining 9 digit 0-9
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
            <Text style={{ color: "red", marginTop: 10}}>
              password at least 8 character,1 digit,1 lowercase,1 uppercase,one
              special character{" "}
            </Text>
          )}

          <Pressable
            style={{
              backgroundColor: "#f71e1e",
              width: width * 0.4,
              height: height * 0.07,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
              marginBottom: 10,
              alignSelf: "center",
              marginTop: 20,
              marginBottom: 10,
            }}
            onPress={ handlesubmit}
          >
            <Text style={{ color: "white", fontSize: 18 }}>SIGN UP</Text>
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
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>SIGN IN</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
