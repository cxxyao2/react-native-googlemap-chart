import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import axios from "axios";

export const subscribeToPushNotifications = () => {
  console.log("hi,facebook ");
  Permissions.getAsync(Permissions.Notifications).then((existingPermission) => {
    if (existingPermission.status != "granted") {
      Permissions.askAsync(Permissions.Notifications).then((permission) => {
        if (permission.status != "granted") {
          return;
        } else {
          Notifications.getExpoPushTokenAsync().then((token) => {
            // todo
            axios
              .get("//https://node-notification.herokuapp.com/?token=" + token)
              .then((axiosResponse) => {
                console.log("axios Response ", axiosResponse.data);
              });
          });
        }
      });
    } else {
      Notifications.getExpoPushTokenAsync().then((token) => {
        // todo
        axios
          .get("//https://node-notification.herokuapp.com/?token=" + token)
          .then((axiosResponse) => {
            console.log("axios Response ", axiosResponse.data);
          });
      });
    }
  });
};
