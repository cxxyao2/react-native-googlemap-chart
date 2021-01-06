import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import React, { Component } from "react";
import { Provider } from "react-redux";
import { View, Text, Button } from "react-native";
import store from "./store";
import AdvancedDetailScreen from "./screens/advanced-detail-screen";
import SearchScreen from "./screens/search-screen";
import IndexScreen from "./screens/index-screen";
import ExpoNotification from "./components/expo-notification";

const Stack = createStackNavigator();
const NestedStack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <Provider store={store}>
      <NestedStack.Navigator mode="modal" initialRouteName="notify">
        <NestedStack.Screen name="notify" component={ExpoNotification} />
        <NestedStack.Screen name="Index" component={IndexScreen} />
        <NestedStack.Screen name="Search" component={SearchScreen} />
        <NestedStack.Screen
          name="AdvancedDetail"
          component={AdvancedDetailScreen}
        />
      </NestedStack.Navigator>
    </Provider>
  );
}
// goBack 处理时有区别。 navigation直接回归，一般时沿着push的路径
// navigation.popToTop()回到第一个画面
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate("Details")} // find an existing route firstly; directly routing
      />
      <Button
        title="Go to Details.But Push"
        onPress={() => navigation.push("Details")} // add a new route,
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" mode="modal">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Overview" }}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
