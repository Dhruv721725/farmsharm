import { createContext, useContext, useState } from 'react'

const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [selectedLanguage, setSelectedLanguage] = useState('English')
    const [farmers, setFarmers] = useState([]);
    const [labourers, setlabourers] = useState([]);
    const [search, setSearch] = useState("");

    const addFarmer=(farmer)=>{
        setFarmers([...farmers, farmer])
    }

    const addLabourer=(labourer)=>{
        setlabourers([...labourers, labourer])
    }

    return (
        <AppContext.Provider
        value={{
            selectedLanguage, setSelectedLanguage, 
            farmers, setFarmers, addFarmer,
            labourers,setlabourers, addLabourer,
            search, setSearch}}>
            {children}
        </AppContext.Provider>
    )
} 

export const useAppContext = ()=>{
    return useContext(AppContext);
}