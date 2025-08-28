import React, { useState } from "react";

export default function Player({
  initailName,
  sympol,
  isActive,
  updatePlayersName,
}) {
  let [name, setName] = useState(initailName);
  let [isEditing, setIsEditing] = useState(false);
  let input = (
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
  );
  let span = <span className="player-name">{name}</span>;
  const handelButtonClick = function () {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      updatePlayersName(sympol, name);
    }
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? input : span}
        <span className="player-symbol">{sympol}</span>
      </span>
      <button onClick={handelButtonClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
