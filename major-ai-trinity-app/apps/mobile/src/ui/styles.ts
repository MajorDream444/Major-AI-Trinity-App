import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, backgroundColor: "#000" },
  card: { borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", borderRadius: 16, padding: 14, marginBottom: 12, backgroundColor: "rgba(255,255,255,0.04)" },
  h1: { fontSize: 22, fontWeight: "600", color: "#fff", marginBottom: 12 },
  h2: { fontSize: 16, fontWeight: "600", color: "#fff" },
  text: { fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 6 },
  muted: { fontSize: 12, color: "rgba(255,255,255,0.6)" },
  row: { flexDirection: "row", gap: 10, marginBottom: 12 },
  button: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.18)" },
  buttonText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", borderRadius: 14, padding: 12, color: "#fff", backgroundColor: "rgba(255,255,255,0.04)" }
});
