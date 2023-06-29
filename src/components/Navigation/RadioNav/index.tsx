import { FC } from "react";
import classes from "./RadioNav.module.scss";
import cn from "classnames";

export interface RadioNavProps {
  selected: string;
  value: string;
  onChange: (arg: string) => void;
  withoutDot: boolean;
  className?: string;
}
const RadioNav: FC<RadioNavProps> = ({
  selected,
  onChange,
  value,
  className,
  withoutDot = false,
  ...props
}) => (
  <label className={classes["radio-base"]}>
    <input
      className={cn(classes["radio-input"])}
      type="radio"
      value={value || ""}
      onChange={() => onChange(value)}
      checked={value === selected}
      {...props}
    />
    <span
      className={cn(
        classes["radio-circle"],
        `${
          !withoutDot
            ? classes["radio-circle_inner"]
            : classes["radio-circle__light"]
        }`,
        className
      )}
    />
  </label>
);

export default RadioNav;
