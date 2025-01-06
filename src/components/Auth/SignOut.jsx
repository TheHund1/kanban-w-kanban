import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

export default function SignOut() {
  return auth.currentUser && (
    <button onClick={() => signOut(auth)} class="sign-out-button">Sign Out</button>
  );
}