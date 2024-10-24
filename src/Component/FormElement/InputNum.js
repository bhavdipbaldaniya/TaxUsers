import React from "react";
import Style from "./form.module.css";

const InputNum = ({
  placeholder,
  value,
  setValue,
  name,
  onBlur,
  disable,
  className,
  onChange
}) => {
  return (
    <input
      type="number"
      className={`${Style.input} noSpinner`}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange} 
      onBlur={onBlur}
      disabled={disable}
      onWheel={(e) => e.target.blur()}
      autoComplete="off"
      onKeyDown={(e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();
        }
      }}
    />
  );
};

export default InputNum;