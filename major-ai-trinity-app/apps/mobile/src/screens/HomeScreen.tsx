import React from "react";
import { View, Text, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { agentPersonas } from "@trinity/core";
import { styles } from "../ui/styles";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.screen}>
      <Text style={styles.h1}>30 Pillars · 3 Agents</Text>

      {agentPersonas.map((a) => (
        <View key={a.id} style={styles.card}>
          <Text style={styles.h2}>{a.name}</Text>
          <Text style={styles.muted}>{a.archetype}</Text>
          <Text style={styles.text}>{a.voice}</Text>
        </View>
      ))}

      <View style={styles.row}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Dashboard")}>
          <Text style={styles.buttonText}>Dashboard</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate("AgentChat")}>
          <Text style={styles.buttonText}>Agent Chat</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Journal")}>
          <Text style={styles.buttonText}>Journal</Text>
        </Pressable>
      </View>

      <Text style={styles.muted}>MVP runs offline. Next phase: Firebase + real LLM chat.</Text>
    </View>
  );
}
