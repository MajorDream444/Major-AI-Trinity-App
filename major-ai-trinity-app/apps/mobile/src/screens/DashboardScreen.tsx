import React, { useMemo, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { styles } from "../ui/styles";
import { getPillars } from "@trinity/core";

type Domain = "life" | "money" | "tech";

export default function DashboardScreen() {
  const [domain, setDomain] = useState<Domain>("life");
  const pillars = useMemo(() => getPillars(domain), [domain]);
  const [completed, setCompleted] = useState<string[]>([]);

  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        {(["life","money","tech"] as Domain[]).map(d => (
          <Pressable key={d} style={styles.button} onPress={() => setDomain(d)}>
            <Text style={styles.buttonText}>{d.toUpperCase()}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.muted}>Completed: {completed.length} / 30</Text>

      <ScrollView style={{ marginTop: 12 }}>
        {pillars.map(p => {
          const done = completed.includes(p.id);
          return (
            <Pressable
              key={p.id}
              style={styles.card}
              onPress={() => setCompleted(prev => done ? prev.filter(x => x !== p.id) : [...prev, p.id])}
            >
              <Text style={styles.muted}>{p.domain.toUpperCase()} · #{p.number} {done ? "✅" : ""}</Text>
              <Text style={styles.h2}>{p.name}</Text>
              <Text style={styles.text}>{p.majorMove}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
