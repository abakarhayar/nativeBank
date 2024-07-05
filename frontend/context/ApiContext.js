import React, { createContext, useContext } from 'react';

const ApiContext = createContext();


export const ApiProvider = ({ children }) => {
    const apiUrl = 'http://localhost:7000/api';
    

    return (
        <ApiContext.Provider value={apiUrl}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => useContext(ApiContext);