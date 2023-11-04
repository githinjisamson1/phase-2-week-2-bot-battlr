import React, { useState, useEffect, useContext } from "react";

// returns {Provider, Consumer}
const BotContext = React.createContext();

// Provider acting as distributor
export const BotProvider = ({ children }) => {
  // !state
  const [bots, setBots] = useState([]);

  // !GET
  const fetchAllBots = () => {
    fetch("http://localhost:8000/bots")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setBots(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // !run once/initial render
  useEffect(() => {
    fetchAllBots();
  }, []);
  return <BotContext.Provider value={{ bots }}>{children}</BotContext.Provider>;
};

// will be used globally
export const useGlobalContext = () => {
  return useContext(BotContext);
};
