import { FC } from "react";
import classes from "./FormTextArea.module.scss";
import cn from "classnames";
import ReactTextareaAutosize from "react-textarea-autosize";

export interface FormTextAreaProps {
  placeholder?: string;
  label?: string;
  className?: string;
  value: string;
  name: string;
  onChangeFormik: (arg: any) => void;
  handleBlurFormik: () => void;
  state: string;
}
const FormTextArea: FC<FormTextAreaProps> = ({
  label = "",
  value,
  placeholder = "",
  className,
  onChangeFormik,
  name,
  handleBlurFormik,
  ...props
}) => {
  const rootClasses = [classes["textarea-base"]];

  return (
    <div className={classes["textarea-container"]}>
      <label className={classes["textarea-label"]}>{label}</label>

      <ReactTextareaAutosize
        name={name}
        value={value}
        minRows={1}
        maxRows={20}
        onChange={(e) => {onChangeFormik(e.target.value);}}
        onBlur={()=>handleBlurFormik()}
        className={cn(rootClasses.join(" "), className)}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default FormTextArea;
