import React, { createContext, useEffect, useState } from "react";

export const DarkContext = createContext();

export default function DarkModeContext({children}) {

  const [isDark, setDarkMode] = useState(()=>{return  localStorage.getItem("mode") === "true"});
  
  useEffect(()=>{
    if(isDark){document.documentElement.classList.add("dark", "bg-slate-950");}
    else{document.documentElement.classList.remove("dark","bg-slate-950")}
    localStorage.setItem("mode" , isDark)
  },[isDark])
  
  
   
  return (
    <DarkContext.Provider value={{ isDark, setDarkMode }}>
      {children}
    </DarkContext.Provider>
  );
}



