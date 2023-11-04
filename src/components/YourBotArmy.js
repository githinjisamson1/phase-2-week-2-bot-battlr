import React from "react";
import { useGlobalBotContext } from "../context/botContext";

function YourBotArmy() {
  // access value props from BotProvider
  const { armyBots, handleReleaseFromArmy, handleDischargeFromDuty } =
    useGlobalBotContext();
  // console.log(armyBots);

  // !DELETE/:id
  const deleteBot = (armyBot) => {
    fetch(`http://localhost:8000/bots/${armyBot.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        // remove from army and collection
        handleDischargeFromDuty(armyBot);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
          {armyBots.map((armyBot) => {
            const {
              armor,
              avatar_url,
              bot_class,
              catchphrase,
              damage,
              health,
              id,
              name,
            } = armyBot;

            return (
              <div key={id} className="bot">
                <div className="bot-img-container">
                  <img src={avatar_url} alt={name} />
                </div>

                <div className="bot-details">
                  <h2 className="bot-name">{name}</h2>
                  <p className="bot-catchphrase">{catchphrase}</p>
                  <p className="bot-class">
                    <span>Class: {bot_class}</span>
                    <button
                      onClick={() => {
                        handleReleaseFromArmy(armyBot);
                      }}
                    >
                      Release Bot
                    </button>
                  </p>
                </div>

                <div className="lower-section">
                  <span>
                    <i className="fa-solid fa-heart-crack"></i>
                    {damage}
                  </span>
                  <span>
                    <i className="fa-solid fa-bolt-lightning"></i>
                    {health}
                  </span>
                  <span>
                    <i className="fa-solid fa-shield"></i>
                    {armor}
                  </span>

                  <span>
                    <i
                      onClick={() => {
                        deleteBot(armyBot);
                      }}
                      className="fa-solid fa-trash-can"
                    ></i>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;
