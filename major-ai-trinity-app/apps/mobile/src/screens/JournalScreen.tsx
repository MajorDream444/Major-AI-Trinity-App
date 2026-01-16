import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { styles } from "../ui/styles";

type Entry = { date: string; text: string };

export default function JournalScreen() {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);

  function save() {
    if (!text.trim()) return;
    const date = new Date().toISOString().slice(0,10);
    setEntries(e => [{ date, text: text.trim() }, ...e].slice(0, 100));
    setText("");
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.h1}>Journal</Text>
      <TextInput
        style={[styles.input, { minHeight: 100 }]}
        value={text}
        onChangeText={setText}
        placeholder="Write your reflection…"
        placeholderTextColor="rgba(255,255,255,0.5)"
        multiline
      />
      <Pressable style={[styles.button, { marginTop: 10 }]} onPress={save}>
        <Text style={styles.buttonText}>Save Entry</Text>
      </Pressable>

      <ScrollView style={{ marginTop: 16 }}>
        {entries.map((e, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.muted}>{e.date}</Text>
            <Text style={styles.text}>{e.text}</Text>
          </View>
        ))}
        {entries.length === 0 ? <Text style={styles.muted}>No entries yet.</Text> : null}
      </ScrollView>
    </View>
  );
}
