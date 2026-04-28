import { supabase } from "../supabase-client";

export default function LogoutButton() {

    async function handleLogout() {
        await supabase.auth.signOut();
    }

    return (
        <button type="button" onClick={handleLogout} style={{ width: '100px', height: '40px', backgroundColor: 'lightcoral', border: 'none', cursor: 'pointer' }}>Logout</button>
    )
}