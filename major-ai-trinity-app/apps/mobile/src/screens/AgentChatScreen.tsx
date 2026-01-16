import React, { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { styles } from "../ui/styles";
import { agentPersonas, getPillars } from "@trinity/core";

type AgentKey = "PILLAR" | "COME_UP" | "CODEX";

export default function AgentChatScreen() {
  const [agentId, setAgentId] = useState<AgentKey>("PILLAR");
  const agent = useMemo(() => agentPersonas.find(a => a.id === agentId)!, [agentId]);
  const pillars = useMemo(() => getPillars(agent.domain), [agent.domain]);

  const [msg, setMsg] = useState("");
  const [log, setLog] = useState<{ role: "user"|"agent"; text: string }[]>([
    { role:"agent", text:`I’m ${agent.name}. Tell me what you’re working on today.` }
  ]);

  function send() {
    if (!msg.trim()) return;
    const userText = msg.trim();
    setMsg("");
    const suggestion = pillars[Math.floor(Math.random() * pillars.length)];
    const agentText = `${suggestion.name}: ${suggestion.majorMove}\n\nReflection: ${suggestion.reflectionPrompt}`;
    setLog(l => [...l, { role:"user", text:userText }, { role:"agent", text:agentText }]);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        {agentPersonas.map(a => (
          <Pressable
            key={a.id}
            style={styles.button}
            onPress={() => {
              setAgentId(a.id as AgentKey);
              setLog([{ role:"agent", text:`I’m ${a.name}. Tell me what you’re working on today.` }]);
            }}
          >
            <Text style={styles.buttonText}>{a.name}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 8 }}>
        {log.map((m, i) => (
          <View key={i} style={[styles.card, { alignSelf: m.role==="user" ? "flex-end" : "flex-start", maxWidth: "95%" }]}>
            <Text style={styles.text}>{m.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={{ gap: 10 }}>
        <TextInput
          style={styles.input}
          value={msg}
          onChangeText={setMsg}
          placeholder="Type…"
          placeholderTextColor="rgba(255,255,255,0.5)"
        />
        <Pressable style={styles.button} onPress={send}>
          <Text style={styles.buttonText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
}
