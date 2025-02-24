import React, { createContext, useContext, useState } from 'react';

// Create a context for user
const UserContext = createContext();

// Custom hook to access the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// Provider component to wrap around the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Default is null, set user after login

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
