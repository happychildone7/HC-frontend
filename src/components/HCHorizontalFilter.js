import { useState } from "react";
import "../styles/HCHorizontalFilter.css";

const HCHorizontalFilter = ({ label,options,value, onChange }) => {
  // fall back to internal state if parent doesn’t control it
  const [internal, setInternal] = useState("");

  const selected = value ?? internal;

  const handleClick = (opt) => {
    if (onChange) onChange(opt);
    else setInternal(opt);
  };

  return (
    <div className="type-filter">
      <span className="type-filter__label">{label}</span>

      {options.map((opt) => (
        <button
          key={opt}
          className={
            "type-filter__pill" + (selected === opt ? " is-active" : "")
          }
          onClick={() => handleClick(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};
export default HCHorizontalFilter;
