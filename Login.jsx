import { useState } from "react"; 
import "./Hey.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const f = async () => {
    const res = await fetch("https://reqres.in/api/users/");
    const json = await res.json();
    setUsers(json.data);
  };
  useEffect(() => {
    f();
  }, []);
  return (
    <div className="App">
      <h1>Here's Your Data</h1>
      <div className="flex">
        {users.length &&
          users.map((user) => {
            return (
              <div key={user.id}>
                <p>
                  <strong>{user.first_name}</strong>
                </p>
                <p>{user.email}</p>
                <img key={user.avatar} src={user.avatar} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
// import React from 'react'

// const login = () => {
//     return (
//         <div>
//             <h1>HEllo PEOPLE</h1>
//         </div>
//     )
// }

// export default login
