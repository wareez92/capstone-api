import { useEffect, useState } from "react";

export default function Register() {
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [address, setAddress] = useState({});
  const [phone, setPhone] = useState({});

  useEffect(() => {
    const registerUser = async () => {
      const user = await fetch("", {});
    };
  }, []);


// Return.
// Return2

  return (
    <form onSubmit={postPup}>
      <label>Register</label>
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
      <select
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      >
        <option value="field">field</option>
        <option value="bench">bench</option>
      </select>

      <label>Phone: </label>
      <input
        type="url"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />

      <button type="submit">Create</button>
    </form>
  );
}
