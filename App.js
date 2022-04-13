import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Attendances from "./pages/Attendances";
import Login from "./pages/Login";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";

const MyTheme = {
  dark: true,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "#262a34",
    card: "rgb(255, 255, 255)",
    border: "#171923",
    text: "rgb(28, 28, 30)",
    notification: "rgb(255, 69, 58)",
  },
};

const Tab = createBottomTabNavigator();
export default function App() {
  const [token, setToken] = useState(undefined);
  const [headers, setHeaders] = useState(undefined);

  const sendTokenToParent = (token) => {
    setToken(token);
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    setHeaders(headers);
    //save(token);
  };
  // async function save(value) {
  //   await SecureStore.setItemAsync("TOKEN", value);
  // }
  return (
    <>
      <StatusBar style="light" />
      {headers ? (
        <NavigationContainer theme={MyTheme}>
          <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color }) => {
                let iconName;
                if (route.name === "Dashboard") {
                  iconName = focused
                    ? "view-dashboard"
                    : "view-dashboard-outline";
                } else if (route.name === "Reports") {
                  iconName = focused
                    ? "chart-bell-curve-cumulative"
                    : "chart-bell-curve";
                } else if (route.name === "Attendances") {
                  iconName = focused
                    ? "calendar-account"
                    : "calendar-account-outline";
                }
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={35}
                    color={color}
                  />
                );
              },
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
              //tabBarActiveBackgroundColor: "#ddd",
              // tabBarInactiveBackgroundColor: "#dfd",
              tabBarStyle: {
                height: 70,
                paddingBottom: 10,
                paddingTop: 5,
                backgroundColor: "#262a34",
                // borderTopLeftRadius: 25,
                // borderTopRightRadius: 25,
              },
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "bold",
              },
              headerStyle: {
                height: 90,
                backgroundColor: "#181920",
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
              },
              headerTitleStyle: {
                color: "#00B386",
                fontWeight: "bold",
                paddingLeft: 5,
              },
            })}
          >
            <Tab.Screen
              name="Dashboard"
              children={() => <Dashboard headers={headers} />}
              options={{
                headerRight: () => (
                  <MaterialCommunityIcons
                    name="logout"
                    size={30}
                    style={styles.Logout}
                    color="#fff"
                    onPress={() => setHeaders(undefined)}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Reports"
              children={() => {
                return <Reports headers={headers} />;
              }}
            />
            <Tab.Screen
              name="Attendances"
              children={() => {
                return <Attendances headers={headers} />;
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <Login sendToken={sendTokenToParent} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  Logout: {
    paddingRight: 15,
  },
});
