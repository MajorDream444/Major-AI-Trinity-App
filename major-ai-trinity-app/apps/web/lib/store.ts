import { db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  updateDoc,
} from "firebase/firestore";

export type ProgressDoc = {
  completed: string[];
  updatedAt?: unknown;
};

export type JournalEntry = {
  text: string;
  createdAt?: unknown;
};

export type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  createdAt?: unknown;
};

function userRef(uid: string) {
  return doc(db, "users", uid);
}

export async function ensureUserDoc(uid: string) {
  await setDoc(userRef(uid), { createdAt: serverTimestamp() }, { merge: true });
}

/** Progress */
export async function getProgress(uid: string): Promise<ProgressDoc> {
  const ref = doc(db, "users", uid, "progress", "v1");
  const snap = await getDoc(ref);
  if (!snap.exists()) return { completed: [] };
  return snap.data() as ProgressDoc;
}

export async function setProgress(uid: string, completed: string[]) {
  const ref = doc(db, "users", uid, "progress", "v1");
  await setDoc(ref, { completed, updatedAt: serverTimestamp() }, { merge: true });
}

/** Journal */
export async function addJournal(uid: string, text: string) {
  const ref = collection(db, "users", uid, "journal");
  await addDoc(ref, { text, createdAt: serverTimestamp() });
}

export async function listJournal(uid: string, n = 50): Promise<(JournalEntry & { id: string })[]> {
  const ref = collection(db, "users", uid, "journal");
  const q = query(ref, orderBy("createdAt", "desc"), limit(n));
  const snaps = await getDocs(q);
  return snaps.docs.map((d) => ({ id: d.id, ...(d.data() as JournalEntry) }));
}

/** Chat threads */
export async function createThread(uid: string, agentId: string) {
  const ref = collection(db, "users", uid, "threads");
  const docRef = await addDoc(ref, {
    agentId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function addChatMessage(uid: string, threadId: string, msg: ChatMessage) {
  const ref = collection(db, "users", uid, "threads", threadId, "messages");
  await addDoc(ref, { ...msg, createdAt: serverTimestamp() });
  await updateDoc(doc(db, "users", uid, "threads", threadId), { updatedAt: serverTimestamp() });
}

export async function listChatMessages(
  uid: string,
  threadId: string,
  n = 50
): Promise<(ChatMessage & { id: string })[]> {
  const ref = collection(db, "users", uid, "threads", threadId, "messages");
  const q = query(ref, orderBy("createdAt", "asc"), limit(n));
  const snaps = await getDocs(q);
  return snaps.docs.map((d) => ({ id: d.id, ...(d.data() as ChatMessage) }));
}
