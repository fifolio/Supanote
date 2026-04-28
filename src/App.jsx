import { useEffect, useState } from 'react';
import './App.css'
import { Auth } from './components/Auth';
import TaskManager from './components/TaskManager';
import { supabase } from './supabase-client';
import LogoutButton from './components/LogoutButton';

function App() {

  const [session, setSession] = useState(null);

  async function fetchSession() {
    const session = await supabase.auth.getSession();
    console.log("Session:", session);
    setSession(session.data.session);
  }

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    }
  }, [])

  return (
    <>
      {session ? (
        <>
          <LogoutButton />
          <TaskManager session={session}/>
        </>
      ) : (
        <Auth />
      )}
    </>
  )
}

export default App
