import { FC } from "react";
import classes from "./FormButton.module.scss";
import cn from "classnames";

export interface FormButtonProps {
  children: string;
  size?: "s" | "m" | "l";
  state?: "disable" | "active";
  className?: string;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  handleClick: () => any;
}
const FormButton: FC<FormButtonProps> = ({
  children,
  size = "m",
  state = "active",
  className,
  type,
  handleClick,
  disabled,
  ...props
}) => {
  const rootClasses = [
    classes["button-base"],
    classes[`button-size_${size}`],
    classes[`button-state_${state}`],
  ];

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={cn(rootClasses.join(" "), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default FormButton;
