import axios from "axios";
import API_KEY, { FACEBOOK_APP_ID } from "../constant";
const WEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
const FORECAST_WEATHER_BASE_URL =
  "http://api.openweathermap.org/data/2.5/forecast";
import {
  SET_CURRENT_WEATHER,
  SET_FORECAST_WEATHER,
} from "../actions/action-types";
import * as Facebook from "expo-facebook";
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_ERROR } from "./action-types";

export const getCurrentWeatherByCity = (city) => async (dispatch) => {
  const response = await axios.get(
    `${WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}`
  );
  dispatch({ type: SET_CURRENT_WEATHER, payload: response.data });
};

export const getForecastWeatherByCity = (city) => async (dispatch) => {
  const response = await axios.get(
    `${FORECAST_WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}`
  );
  dispatch({ type: SET_FORECAST_WEATHER, payload: response.data });
};

export const facebookLogin = (onSuccess, onError) => (dispatch) => {
  Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
    permissions: ["public_profile"],
  })
    .then((fbResponse) => {
      if (fbResponse.type === "success") {
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: fbResponse.token });
        // TODO AsyncStorage.setItem("fbToken", fbResponse.token);

        onSuccess && onSuccess();
        // dispatch success  fbResponse.token
      } else {
        dispatch({ type: FACEBOOK_LOGIN_ERROR });
        onError && onError();
        // dispatch an error
      }
    })
    .catch((error) => {
      dispatch({ type: FACEBOOK_LOGIN_ERROR });
      onError && onError();
    });
};
