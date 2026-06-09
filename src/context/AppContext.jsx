import { createContext, useContext, useState } from 'react'

const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [selectedLanguage, setSelectedLanguage] = useState('English')
    const [farmers, setFarmers] = useState([
        {
            id: 1,
            name: "Ramesh",
            village: "Tumkur"
        },
        {
            id: 2,
            name: "Suresh",
            village: "Bangalore"
        }
    ]);
    const [search, setSearch] = useState("");


    const addFarmer=(farmer)=>{
        setFarmers([...farmers, farmer])
    }

    return (
        <AppContext.Provider
        value={{selectedLanguage, setSelectedLanguage, farmers, setFarmers, addFarmer, search, setSearch}}>
            {children}
        </AppContext.Provider>
    )
} 

export const useAppContext = ()=>{
    return useContext(AppContext);
}