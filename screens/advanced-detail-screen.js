import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { getForecastWeatherByCity } from "../actions";
import { kelvinToCelcius } from "../services/temperature";
import { Button } from "react-native-elements";

class AdvancedDetailScreen extends Component {
  componentDidMount() {
    const city = this.props.route.params.city;
    this.props.getForecastWeatherByCity(city);
  }

  getTemperatuers() {
    return this.props.forecastWeather.list.map((weather) => {
      return kelvinToCelcius(weather.main.temp);
    });
  }

  getHumidity() {
    return this.props.forecastWeather.list.map((weather) => {
      return kelvinToCelcius(weather.main.humidity);
    });
  }
  getLabels() {
    return this.props.forecastWeather.list.map((_, index) => {
      let day = index / 8;
      return index === 0 ? "t" : index % 8 === 0 ? "t+" + day + "j" : "";
    });
  }

  renderChart(data) {
    return (
      <LineChart
        data={{
          labels: this.getLabels(),
          datasets: [{ data }],
        }}
        width={wp("90%")}
        height={hp("30%")}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier={true}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    );
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  renderCharts() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 30, paddingTop: hp("1%") }}>
          {this.props.forecastWeather.city.name} 5 days forecast
        </Text>
        <Text style={{ marginBottom: hp("2%"), fontSize: 20 }}>
          Temperatures(C)
        </Text>
        {this.renderChart(this.getTemperatuers())}
        <Text style={{ marginBottom: hp("2%"), fontSize: 20 }}>
          Humidity(%)
        </Text>
        {this.renderChart(this.getHumidity())}
        <Button
          onPress={this.goBack}
          title="Back"
          containerStyle={{ marginTop: hp("1%"), width: wp("90%") }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        {this.props.forecastWeather ? (
          this.renderCharts()
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    forecastWeather: state.weather.forecastWeather,
  };
};

const mapDispatchToProps = {
  getForecastWeatherByCity,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedDetailScreen);
