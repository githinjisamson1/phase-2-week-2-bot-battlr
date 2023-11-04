import React from "react";
import { useGlobalContext } from "../context/botContext";

function BotCollection() {
  // Your code here
  const { bots } = useGlobalContext();

  return (
    <div className="ui four column grid">
      <div className="row">
        {/*...and here..*/}
        {/* Collection of all bots */}
        {bots.map((bot) => {
          const {
            armor,
            avatar_url,
            bot_class,
            catchphrase,
            created_at,
            damage,
            health,
            id,
            name,
            updated_at,
          } = bot;
          return (
            <div key={id} className="bot">
              <div className="bot-img-container">
                <img src={avatar_url} alt={name} />
              </div>

              <div className="bot-details">
                <h2>{name}</h2>
                <p className="catchphrase">{catchphrase}</p>
                <p>Class: {bot_class}</p>
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BotCollection;
