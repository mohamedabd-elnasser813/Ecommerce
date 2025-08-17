import React, { createContext, useEffect, useState } from 'react'

export let userContext = createContext()


export default function UserContext({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
   const [userName, setUserName] = useState(localStorage.getItem("name"));
   const [email, setEmail] = useState(localStorage.getItem("email"));
  return (
    <userContext.Provider
      value={{ token, setToken, setUserName, setEmail, email, userName }}
    >
      {children}
    </userContext.Provider>
  );
}
