import { useContext,useEffect,useState,createContext } from "react";
const AppContext=createContext();
const getInitialDarkMode=()=>{
  const initialMode=window.matchMedia('(prefers-color-scheme:dark)').matches;
  const stored=localStorage.getItem('darkTheme')==="true";
  return stored || initialMode;
}
export const AppProvider=({children})=>{
 
  const [isDarkTheme,setIsDarkTheme]=useState(getInitialDarkMode);
  const [searchTerm,setSearchTerm]=useState('cat');
  const toggleDarkTheme=()=>{
    const newDarkTheme=!isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem('darkTheme',newDarkTheme);
  }
  useEffect(()=>{
    document.body.classList.toggle('dark-theme',isDarkTheme)
  },[isDarkTheme])
  return <AppContext.Provider value={{isDarkTheme,toggleDarkTheme,searchTerm,setSearchTerm}}>
    {children}
  </AppContext.Provider>
}
const useGlobalContext=()=>useContext(AppContext);
export default useGlobalContext;