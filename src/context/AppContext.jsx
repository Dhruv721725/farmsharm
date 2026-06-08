import { createContext, useContext, useState } from 'react'

const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [selectedLanguage, setSelectedLanguage] = useState('English')
    return (
        <AppContext.Provider
        value={{selectedLanguage, setSelectedLanguage}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(AppContext);
}