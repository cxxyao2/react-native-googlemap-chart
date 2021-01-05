import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Button } from "react-native";
import { facebookLogin } from "../actions/index";
import * as Facebook from "expo-facebook";

import { FACEBOOK_APP_ID } from "../constant";

class IndexScreen extends Component {
  componentDidAmount() {
    const { token } = this.props.loginKey; //TODO
    console.log("token is", token);

    if (token) {
      this.goToSearch();
    } else {
      this.props.facebookLogin(this.goToSearch);
    }
  }
  // TODO
  logIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: FACEBOOK_APP_ID,
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  goToSearch = () => {
    this.props.navigation.push("Search");
  };

  // this.props.loginKey
  render() {
    return (
      <View>
        <Button
          title="oldLoginIn"
          onPress={() => {
            const { token } = this.props.loginKey; //TODO
            console.log("token is", token);
            console.log(this.props);
            this.props.facebookLogin(this.goToSearch);
          }}
        ></Button>
        <Button title="Facebook" onPress={this.logIn}></Button>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginKey: state.authentification,
  };
};

const mapDispatchToProps = {
  facebookLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexScreen);
