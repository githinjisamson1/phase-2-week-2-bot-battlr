import React, { useState, useEffect, useContext } from "react";

// returns {Provider, Consumer}
const BotContext = React.createContext();

// Provider acting as distributor
export const BotProvider = ({ children }) => {
  // !state for bots
  const [bots, setBots] = useState([]);

  // !state for armyBots
  const [armyBots, setArmyBots] = useState([]);

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

  // !handle adding a bot to the army
  const handleAddToArmy = (addToArmy) => {
    if (!armyBots.includes(addToArmy)) {
      setArmyBots([...armyBots, addToArmy]);
      alert("Bot added to army");
    } else {
      alert("Bot already in army");
    }

    // console.log("armyBots:", armyBots);
  };

  // !release bot from army
  const handleReleaseFromArmy = (releaseFromArmy) => {
    if (armyBots.includes(releaseFromArmy)) {
      const remainingBots = armyBots.filter((armyBot) => {
        return armyBot.id !== releaseFromArmy.id;
      });
      setArmyBots(remainingBots);
      alert("Bot released from army");
    } else {
      alert("Bot not in army");
    }
  };

  // !completely discharge bot from duty
  const handleDischargeFromDuty = (dischargeFromDuty) => {
    // discharge from army
    const remainingOnDuty = armyBots.filter((armyBot) => {
      return armyBot.id !== dischargeFromDuty.id;
    });
    setArmyBots(remainingOnDuty);

    // remove from collection
    const remainingInCollection = bots.filter((bot) => {
      return bot.id !== dischargeFromDuty.id;
    });
    setBots(remainingInCollection);

    alert("Bot discharged from duty");
  };

  // !value props to distribute values
  return (
    <BotContext.Provider
      value={{
        bots,
        armyBots,
        handleAddToArmy,
        handleReleaseFromArmy,
        handleDischargeFromDuty,
      }}
    >
      {children}
    </BotContext.Provider>
  );
};

// !will be used globally
export const useGlobalBotContext = () => {
  return useContext(BotContext);
};
