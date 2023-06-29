import React, { FC, useState } from "react";
import classes from "./FormDropList.module.scss";
import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import "react-dadata/dist/react-dadata.css";

export interface FormDropListProps {
  placeholder?: string;
  label?: string;
  handleBlurFormik: () => void;
  onChangeFormik: (arg: any) => void;
  name: string;
  state?: "active" | "error" | "select";
  value?: string;
  className?: string;
}
const FormDropList: FC<FormDropListProps> = ({
  placeholder = "",
  label = "",
  name,
  value,
  className,
  state,
  handleBlurFormik,
  onChangeFormik,
}) => {
  const rootClasses = [
    classes["drop-list-base"],
    classes[`drop-list-state_${state}`],
  ];
  const [address, setAddress] = useState<DaDataSuggestion<DaDataAddress> | undefined>();
  
  return (
    <div className={classes["drop-list-container"]}>
      <label className={classes["input-label"]}>{label}</label>
      <div className={classes["input-container"]}>
        <AddressSuggestions
          containerClassName={rootClasses.join(" ")}
          token={process.env.REACT_APP_DADATA_API_KEY + ""}
          defaultQuery={value}
          value={address}
          count={3}
          delay={100}
          onChange={(e: any) => {
            setAddress(e)
            onChangeFormik(e.value);
          }}
          inputProps={{
            name: name,
            placeholder: placeholder,
            onChange: (e) => {
              const target = e.target as HTMLTextAreaElement;
              onChangeFormik(target.value);
            },
            onBlur: () => handleBlurFormik(),
          }}
        />
      </div>
    </div>
  );
};

export default FormDropList;
