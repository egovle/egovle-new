import { useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../firebase';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const role = docSnap.exists() ? docSnap.data().role : "customer";
      if (role === "admin") router.push("/admin");
      else if (role === "vle") router.push("/vle");
      else router.push("/dashboard");
    } catch (error) {
      alert("Login error: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const uid = result.user.uid;
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const role = docSnap.exists() ? docSnap.data().role : "customer";
      if (role === "admin") router.push("/admin");
      else if (role === "vle") router.push("/vle");
      else router.push("/dashboard");
    } catch (error) {
      alert("Google login error: " + error.message);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
      <button onClick={handleLogin}>Login</button>&nbsp;
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
}