import { FC } from "react";
import classes from "./FormRadio.module.scss";
import cn from "classnames";

export interface FormRadioProps {
  selected: string;
  value: string;
  label?: string;
  onChangeFormik: (arg: any) => void;
  name: string;
  withoutDot: boolean;
  className?: string;
}
const FormRadio: FC<FormRadioProps> = ({
  selected,
  value,
  label,
  onChangeFormik,
  name,
  className,
  withoutDot = false,
  ...props
}) => (
  <label className={classes["radio-base"]}>
    <input
      className={cn(classes["radio-input"])}
      name={name}
      type="radio"
      value={value}
      onChange={(e) => {
        onChangeFormik(value);
      }}
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

    <p className={classes["radio-label"]}>{label}</p>
  </label>
);

export default FormRadio;
