import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import PageNave from "../components/PageNave"
import Button from "../components/Button";
import { useAuth } from "../context/fakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const {login, isAuthenticated} = useAuth()
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault()
    if(email, password){
      login(email, password)
    }
  }

  useEffect(function(){
    if(isAuthenticated) navigate("/app", {replace: true})
  },[isAuthenticated, navigate])

  return (
    <main className={styles.login}>
      <PageNave/>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type='primary'>Login</Button>
        </div>
      </form>
    </main>
  );
}
