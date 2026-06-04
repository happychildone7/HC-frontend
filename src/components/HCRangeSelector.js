import { useState } from "react";
import "../styles/HCRangeSelector.css";

/**
 * Props
 *  • value     Number   (optional controlled value, e.g. 50000)
 *  • onChange  Function (newVal:Number)  (optional)
 *
 * If you omit both, the component manages its own state.
 */
const HCRangeSelector = ({ value, onChange, min, max }) => {
  const [internal, setInternal] = useState(min);
  const fee = value ?? internal;

  const handle = (e) => {
    const v = +e.target.value;
    if (onChange) onChange(v);
    else setInternal(v);
  };

  // Helper to format “k” suffix (e.g. 50000 → 50 k)
  const fmt = (v) => `${Math.round(v / 1000)} k`;

  return (
    <div className="fee-range">
      <span className="fee-range__label">Fee Range</span>

      <input
        type="range"
        className="fee-range__slider"
        min={min}
        max={max}
        step={1000}
        value={fee}
        onChange={handle}
      />

      <span className="fee-range__value">{fmt(fee)}</span>
    </div>
  );
};
export default HCRangeSelector;
