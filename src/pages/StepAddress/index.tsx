import { FC } from "react";
import { FormDropList } from "../../components";

export interface AddressProps {
  formik: any;
  label: string;
  field: string;
  hasError: boolean;
}

const StepAddress: FC<AddressProps> = ({ formik, field, label, hasError }) => (
  <div>
    <FormDropList
      name={field}
      label={label}
      placeholder={"г Санкт-Петербург"}
      value={formik.values.address}
      state={hasError ? "error" : "active"}
      handleBlurFormik={() => {
        formik.setFieldTouched(field);
      }}
      onChangeFormik={(e) => formik.setFieldValue(field, e)}
    />
  </div>
);

export default StepAddress;
