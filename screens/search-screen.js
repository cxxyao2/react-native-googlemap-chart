import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SearchBar } from "react-native-elements";
import { connect } from "react-redux";
import { getCurrentWeatherByCity } from "../actions/index";
import WeatherCard from "../components/weather-card";

const DEFAULT_CORD = {
  lat: 48.89,
  lng: 2.34,
};
class SearchScreen extends Component {
  state = { search: "", region: undefined };
  updateSearch = (search) => {
    this.setState({ search });
  };
  submitSearch = () => {
    this.props.getCurrentWeatherByCity(this.state.search);
    console.log(this.state.search);
  };

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.currentWeather);
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.props.currentWeather
              ? this.props.currentWeather.coord.lat
              : DEFAULT_CORD.lat,
            longitude: this.props.currentWeather
              ? this.props.currentWeather.coord.lon
              : DEFAULT_CORD.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        {this.props.currentWeather && (
          <WeatherCard currentWeather={this.props.currentWeather} />
        )}
        <SearchBar
          LightTheme
          onChangeText={this.updateSearch}
          value={this.state.search}
          onSubmitEditing={this.submitSearch}
          placeholder="Type your city..."
          containerStyle={{
            position: "absolute",
            bottom: hp("50%"),
            left: wp("5%"),
            width: wp("90%"),
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const mapStateToProps = (store) => {
  return {
    currentWeather: store.weather.currentWeather,
  };
};

const mapDispatchToProps = { getCurrentWeatherByCity };

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
