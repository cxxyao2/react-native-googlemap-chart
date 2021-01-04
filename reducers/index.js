import { combineReducers } from "redux";
import WeatherReducer from "./weather";

const rootReducer = combineReducers({
  weather: WeatherReducer,
});

export default rootReducer;
