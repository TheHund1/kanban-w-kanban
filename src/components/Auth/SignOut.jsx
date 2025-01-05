import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

export default function SignOut() {
  return auth.currentUser && (
    <button onClick={() => signOut(auth)}>Sign Out</button>
  );
}