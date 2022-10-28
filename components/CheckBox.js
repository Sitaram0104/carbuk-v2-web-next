import React from "react";

export default function CheckBox({ label, id, value, onChange, Comp }) {
  return (
    <section className="containerSection">
      <input
        id={id}
        type="checkbox"
        name="t1"
        checked={value}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
      <div>{Comp}</div>
    </section>
  );
}
