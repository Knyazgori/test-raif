import { FC } from "react";
import classes from "./FormPhone.module.scss";
import InputMask from "react-input-mask";

import cn from "classnames";

export interface FormInputProps {
  placeholder?: string;
  label?: string;
  size?: "s" | "m" | "l" | "max";
  state?: "active" | "error" | "select";
  type?: "smallContent" | "bigContent" | "choiceContent";
  name: string;
  value: string;
  className?: string;
  onChangeFormik: (arg: any) => void;
  handleBlurFormik: () => void;
}
const FormInput: FC<FormInputProps> = ({
  size = "max",
  label = "",
  state = "active",
  type = "smallContent",
  onChangeFormik,
  name,
  handleBlurFormik,
  value,
  className,
  ...props
}) => {

  const rootClasses = [
    classes["input-base"],
    classes[`input-size_${size}`],
    classes[`input-state_${state}`],
    classes[`input-type_${type}`],
  ];

  return (
    <div className={classes["input-container"]}>
      <label className={classes["input-label"]}>{label}</label>
      <InputMask
        id={name}
        mask="+7 (999) 999-99-99"
        placeholder="+7 (___) ___-__-__"
        name={name}
        value={value}
        className={cn(rootClasses.join(" "), className)}
        onChange={(e) => {
          onChangeFormik(e.target.value);
        }}
        onBlur={()=>handleBlurFormik()}
        {...props}
      />
    </div>
  );
};

export default FormInput;
