import React from "react";
import Style from "./form.module.css";
import { ic_Password_Open } from "@/src/Utils/svg";

const Input = ({
  placeholder,
  value,
  setValue,
  name,
  onBlur,
  disabled,
  className,
  type,
  onChange,
}) => {
  return (
    <>
      <input
        type={type}
        className={`${Style.input} ${className}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        autoComplete="off"
      />
    </>
  );
};

export default Input;
