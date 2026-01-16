import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import AgentChatScreen from "./screens/AgentChatScreen";
import JournalScreen from "./screens/JournalScreen";

export type RootStackParamList = {
  Home: undefined;
  Dashboard: undefined;
  AgentChat: undefined;
  Journal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "#000" }, headerTintColor: "#fff" }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Major AI Trinity" }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: "Dashboard" }} />
        <Stack.Screen name="AgentChat" component={AgentChatScreen} options={{ title: "Agent Chat" }} />
        <Stack.Screen name="Journal" component={JournalScreen} options={{ title: "Journal" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
