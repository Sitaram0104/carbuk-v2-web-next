import React from "react";

export default function LoginComp() {
  return (
    <div className="d-flex" style={{ backdropFilter: "blur(14px)" }}>
      <button className="flex-grow-1">Guest User</button>
      <button className="flex-grow-1">Login</button>
      <button className="flex-grow-1">Register</button>
    </div>
  );
}
