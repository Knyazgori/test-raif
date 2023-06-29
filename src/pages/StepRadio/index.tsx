import React, { FC } from "react";
import { FormRadio } from "../../components";
import { radioArray } from "./constants";
import classes from "./StepRadio.module.scss";

export interface RadioProps {
  formik: any;
  field: string,
  onChange?: ()=>void,
  hasError: boolean
}

const StepRadio: FC<RadioProps> = ({ formik, field, onChange, hasError }) => {

  const setValue = (result: any)=>{

    const radio = radioArray.find(e=>e.answer===result)
    formik.setFieldValue(field, radio ? radio.value : null)

    setTimeout(()=>{
      formik.setFieldTouched(field)
      if(onChange) onChange()
    })

  }

  const getValue = ()=>{
    const radio = radioArray.find(e=>e.value===formik.values[field])
    return radio ? radio.answer : ''
  }

  return (
    <>
      {radioArray.map((radio) => {
        return (
          <div key={radio.answer} className={classes["form-radio-container"]}>
            <FormRadio
              onChangeFormik={setValue}
              name={field}
              withoutDot={false}
              selected={getValue()}
              label={radio.answer}
              className={classes["form-radio-custom"]}
              value={radio.answer}
            />
          </div>
        );
      })}
    </>
  );
};

export default StepRadio;
