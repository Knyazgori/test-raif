import React, { FC } from "react";
import { FormTextArea } from "../../components";
import classes from "./StepTextarea.module.scss";

export interface TextareaProps {
  formik: any;
  label: string;
  field: string;
  hasError: boolean;
  onChange?: () => void;
}
const StepTextarea: FC<TextareaProps> = ({
  formik,
  field,
  label,
  hasError,
  onChange,
}) => (
  <FormTextArea
    name={field}
    label={label}
    value={formik.values[field]}
    handleBlurFormik={() => {
      formik.setFieldTouched(field);
    }}
    onChangeFormik={(e) => {
      formik.setFieldValue(field, e);
      if (onChange) onChange();
    }}
    className={classes["form-text-area_custom"]}
    state={hasError ? "error" : "active"}
  />
);

export default StepTextarea;
