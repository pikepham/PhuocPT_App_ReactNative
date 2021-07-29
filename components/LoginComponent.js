

import React, { Component } from "react";
import { ScrollView, View, Button, Image } from "react-native";
import { Input, CheckBox } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
// expo-sdk
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: baseUrl + "images/logo.png",
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      remember: false,
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={{ justifyContent: "center", margin: 20 }}>
          <View style={{ flex: 1, flexDirection: "row", margin: 20 }}>
            <Image
              source={{ uri: this.state.imageUrl }}
              style={{ margin: 10, width: 80, height: 60 }}
            />
            <View style={{ justifyContent: "center" }}>
              <Button
                title="Camera"
                onPress={() => this.getImageFromCamera()}
              />
            </View>
            <View style={{ width: 10 }} />
            <View style={{ justifyContent: "center" }}>
              <Button
                title="Gallery"
                onPress={() => this.getImageFromGallery()}
              />
            </View>
          </View>
          <Input
            placeholder="Username"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
          />
          <Input
            placeholder="Password"
            leftIcon={{ type: "font-awesome", name: "key" }}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          <Input
            placeholder="First Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            value={this.state.firstname}
            onChangeText={(firstname) => this.setState({ firstname })}
          />
          <Input
            placeholder="Last Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            value={this.state.lastname}
            onChangeText={(lastname) => this.setState({ lastname })}
          />
          <Input
            placeholder="Email"
            leftIcon={{ type: "font-awesome", name: "envelope-o" }}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />
          <CheckBox
            containerStyle={{ backgroundColor: null }}
            title="Remember Me"
            center
            checked={this.state.remember}
            onPress={() => this.setState({ remember: !this.state.remember })}
          />
          <View style={{ marginTop: 20 }}>
            <Button
              title="Register"
              color="#7cc"
              onPress={() => this.handleRegister()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  async getImageFromCamera() {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (
      cameraPermission.status === "granted" &&
      cameraRollPermission.status === "granted"
    ) {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!capturedImage.cancelled) {
        //alert(JSON.stringify(capturedImage));
        this.processImage(capturedImage.uri);
      }
    }
  }

  async getImageFromGallery() {
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (cameraRollPermission.status === "granted") {
      let capturedImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!capturedImage.cancelled) {
        //alert(JSON.stringify(capturedImage));
        this.processImage(capturedImage.uri);
      }
    }
  }

  async processImage(imageUri) {
    let processedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 400, height: 300 } }],
      { format: "png" }
    );
    //alert(JSON.stringify(processedImage));
    this.setState({ imageUrl: processedImage.uri });
  }

  handleRegister() {
    if (this.state.remember) {
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      ).catch((error) => console.log("Could not save user info", error));
      alert("Remembered user!");
    }
  }
}
export default Register;
