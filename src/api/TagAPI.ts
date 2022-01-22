import { collection, query, addDoc } from "firebase/firestore";
import { getFirestore, getDocs } from "firebase/firestore";
import { Tag } from "../components/Tag";

import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { firebaseConfig } from "../config/config";

firebase.initializeApp(firebaseConfig);
const db = getFirestore();

export const searchTags: any = async () => {
  const q = query(collection(db, "tags"));
  const querySnapShot = await getDocs(q);
  const tags = querySnapShot.docs.map((doc) => doc.data() as Tag);
  return tags;
};

export const addTags = async (tags: Tag[]) => {
  tags.forEach((tag) => {
    addDoc(collection(db, "tags"),  tag);
  });
};