import { useEffect, useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const registerUser = async () => {
    try {
      const respone = await fetch(`/api/register/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const result = await respone.json();
      return result;
    } catch (ex) {
      console.error("failed to register user", ex);
    }
  };

  return (
    <form onSubmit={registerUser}>
      <h4>Register</h4>
      <label>Username: </label>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <label>Password: </label>
      <input
        type="text"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <label>Address: </label>
      <input
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />

      <label>Phone: </label>
      <input
        type="text"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />

      <button type="submit">Create</button>
    </form>
  );
}
