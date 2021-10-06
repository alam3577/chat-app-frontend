import React, { useState } from "react";

function Online({ users }) {
  return (
    <>
      <div className="online__user_q">
        <h3>Total online</h3>
        <h3 className="user__count">{users.length}</h3>
      </div>
      <label className="circle"></label>
      {users.map((elem, i) => (
        <>
          <div className="green__align">
            <div className="green__circle"></div>
            <h4>{elem}</h4>
          </div>
        </>
      ))}
    </>
  );
}

export default Online;
