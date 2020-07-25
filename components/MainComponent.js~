import React, { Component } from "react";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import { Icon } from "react-native-elements";
import { View, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import AboutUs from "./AboutComponent";

const MenuNavigator = createStackNavigator();
function MenuNavigatorScreen() {
  return (
    <MenuNavigator.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <MenuNavigator.Screen
        name="Menu"
        component={Menu}
        options={{ title: "Menu" }}
      />
      <MenuNavigator.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{ title: "Dish Details" }}
      />
    </MenuNavigator.Navigator>
  );
}
const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen() {
  return (
    <HomeNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <HomeNavigator.Screen
        name="Home"
        component={Home}
        options={{ title: "Home" }}
      />
    </HomeNavigator.Navigator>
  );
}

const ContactNavigator = createStackNavigator();

function ContactNavigatorScreen() {
  return (
    <ContactNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <ContactNavigator.Screen
        name="Contact"
        component={Contact}
        options={{ title: "Contact us" }}
      />
    </ContactNavigator.Navigator>
  );
}
const HistoryNavigator = createStackNavigator();

function HistoryNavigatorScreen() {
  return (
    <HistoryNavigator.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <HistoryNavigator.Screen
        name="Contact"
        component={AboutUs}
        options={{ title: "About Us" }}
      />
    </HistoryNavigator.Navigator>
  );
}
const MainNavigator = createDrawerNavigator();

function MainNavigatorScreen() {
  return (
    <MainNavigator.Navigator
      drawerStyle={{
        backgroundColor: "#c6cbef",
      }}
    >
      <MainNavigator.Screen
        name="Home"
        component={HomeNavigatorScreen}
        options={{ title: "Home", drawerLabel: "Home" }}
      />
      <MainNavigator.Screen
        name="Menu"
        component={MenuNavigatorScreen}
        options={{ title: "Menu", drawerLabel: "Menu" }}
      />
      <MainNavigator.Screen
        name="Contact"
        component={ContactNavigatorScreen}
        options={{ title: "Contact us", drawerLabel: "Contact us" }}
      />
      <MainNavigator.Screen
        name="AboutUs"
        component={HistoryNavigatorScreen}
        options={{ title: "About us", drawerLabel: "About Us" }}
      />
    </MainNavigator.Navigator>
  );
}

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen />
      </NavigationContainer>
    );
  }
}

export default Main;
