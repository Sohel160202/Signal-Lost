import { db } from './config';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  onSnapshot
} from 'firebase/firestore';

export const createRoom = async (roomId, playerData) => {
  const roomRef = doc(db, 'rooms', roomId);
  const roomSnap = await getDoc(roomRef);

  if (!roomSnap.exists()) {
    await setDoc(roomRef, {
      createdAt: Date.now()
    });
  }

  const playerRef = doc(db, 'rooms', roomId, 'players', playerData.id);
  await setDoc(playerRef, playerData);
};

export const listenToPlayers = (roomId, callback) => {
  return onSnapshot(collection(db, 'rooms', roomId, 'players'), (snapshot) => {
    const players = snapshot.docs.map((doc) => doc.data());
    callback(players);
  });
};
