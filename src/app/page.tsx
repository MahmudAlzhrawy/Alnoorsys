'use client'
import InsertNewClient from "@/components/insertNewClient";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(status === "true");
  }, []);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password === 'Alnoor2025') {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } else {
      alert("Wrong Password");
      localStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
      setPassword(' ')
    }
    window.location.reload();
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className="frm">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                className="form-control"
                value="Anloor@admin"
                id="name"
                readOnly
              />
              <small id="nameHelp" className="form-text text-muted">
                We&apos;ll never share your name with anyone else
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="pass">Password:</label>
              <input
              value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="pass"
                placeholder="Enter password"
              />
              <small id="passHelp" className="form-text text-muted">
                We&apos;ll never share your password with anyone else
              </small>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <>
        <InsertNewClient />
        </>
      )}
    </>
  );
}
