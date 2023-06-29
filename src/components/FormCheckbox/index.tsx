import { FC, useState } from "react";
import classes from "./FormCheckbox.module.scss";
import cn from "classnames";

export interface FormCheckboxProps {
  state?: "active" | "error" | "select";
  label?: string;
  className?: string;
}
const FormCheckbox: FC<FormCheckboxProps> = ({
  state = "active",
  className,
  ...props
}) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const rootClasses = [
    classes["checkbox-base"],
    classes["checkbox-base__disable"],
    classes[`checkbox-state_${state}`],
  ];

  return (
    <label {...props}>
      <input className={cn(rootClasses.join(" "), className)} type="checkbox" checked={checked} onChange={handleChange} />
      <div className={classes["checkbox-checkmark"]}></div>
    </label>
  );
};

export default FormCheckbox;
