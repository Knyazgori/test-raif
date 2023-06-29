import { FC } from "react";
import { FormPhone } from "../../components";

export interface TelephoneProps {
  formik: any;
  hasError: boolean;
  field: string;
  label: string;
}

const StepTelephone: FC<TelephoneProps> = ({
  formik,
  hasError,
  field,
  label,
}) => (
  <div>
    <FormPhone
      name={field}
      label={label}
      state={hasError ? "error" : "active"}
      type="bigContent"
      value={formik.values[field]}
      handleBlurFormik={() => {
        formik.setFieldTouched(field);
      }}
      onChangeFormik={(e) => formik.setFieldValue(field, e)}
    />
  </div>
);

export default StepTelephone;
