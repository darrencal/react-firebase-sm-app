import { collection, getDocs, query, where } from 'firebase/firestore';
import { COLLECTION_USERS, db } from '../firebase';

export default async function checkUsernameExists(username) {
  const q = query(
    collection(db, COLLECTION_USERS),
    where('username', '==', username)
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.size > 0;
}
