import { createContext, useContext, useState } from "react";


export const ProgressBarContext = createContext();

export const ProgressBarContextProvider = ({children}) =>{
    // * Show Progressbar when ever user changes
    const [hideProgress, setHideProgress] = useState(true)
    

    return (
        <ProgressBarContext.Provider value={{hideProgress, setHideProgress}}>
            {children}
        </ProgressBarContext.Provider>
    )
}

export const useProgressBarContext = ()=> useContext(ProgressBarContext);
export default ProgressBarContextProvider