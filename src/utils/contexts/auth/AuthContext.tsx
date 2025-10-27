import React from 'react';

export const AuthContext = React.createContext({
    authenticated: false,
    roles: [] as string[],
    login: (token: string) => { console.log(token) },
    logout: () => {},
});