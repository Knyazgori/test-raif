import { FC } from "react";
import classes from "./FormInput.module.scss";
import cn from "classnames";

export interface FormInputProps {
  placeholder?: string;
  label?: string;
  size?: "s" | "m" | "l" | "max";
  state?: "active" | "error" | "select";
  type?: "smallContent" | "bigContent" | "choiceContent";
  onChange: (arg: string) => void;
  onChangeFormik?: any;
  name: string;
  handleBlurFormik: any;
  value: string;
  className?: string;
}
const FormInput: FC<FormInputProps> = ({
  size = "max",
  label = "",
  state = "active",
  placeholder = "",
  type = "smallContent",
  onChange,
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
      <input
        id={name}
        name={name}
        value={value}
        className={cn(rootClasses.join(" "), className)}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
          onChangeFormik(e);
        }}
        onBlur={handleBlurFormik}
        {...props}
      />
    </div>
  );
};

export default FormInput;
