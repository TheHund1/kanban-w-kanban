import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import SignIn from './components/Auth/SignIn.jsx';
import SignOut from './components/Auth/SignOut';
import Kanban from './components/Kanban/Kanban';
import './App.css';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="top-header">
      <header className="app-header">
        <h1>Kanban w Kanban</h1>
        <SignOut />
      </header>
      <section>
        {user ? <Kanban /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;