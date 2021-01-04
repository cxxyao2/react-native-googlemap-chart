import React, { Component } from "react";
import SearchScreen from "./screens/search-screen";
import { Provider } from "react-redux";

import store from "./store";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SearchScreen />
      </Provider>
    );
  }
}
