import { useFormik } from "formik";
import React, { useState } from "react";
import StepAddress from "../../pages/StepAddress";
import StepRadio from "../../pages/StepRadio";
import StepTelephone from "../../pages/StepTelephone";
import StepThanks from "../../pages/StepThanks";
import { FormButton } from "../../components";
import Navigation from "../../components/Navigation";
import classes from "./Form.module.scss";
import formValidation from "./validation";
import StepTextarea from "../../pages/StepTextarea";
import { FormApi } from "../../api/Form.api";
import cn from "classnames";

export interface validateProps {
  why_choose: string;
  phone: string;
  address: string;
  is_main_bank: boolean;
  main_bank_why: string;
  is_investment: boolean;
  investment_prefer: string;
  is_investment_plan: boolean;
  domain_referer: string;
}

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndexForce] = useState(0);

  const formik = useFormik({
    initialValues: {
      why_choose: "",
      phone: "",
      address: "",
      is_main_bank: null,
      main_bank_why: "",
      is_investment: null,
      investment_prefer: "",
      is_investment_plan: null,
      domain_referer: "",
    },
    validationSchema: formValidation(),
    onSubmit: () => {},
  });

  const hasError = (field: keyof validateProps) => {
    return (formik.touched[field] && formik.errors[field]) as boolean;
  };

  const errorTemplate = (field: keyof validateProps) => {
    if (hasError(field)) {
      const isTextArea =
        field === "investment_prefer" ||
        field === "why_choose" ||
        field === "main_bank_why";
      return (
        <p
          key={"validation-" + field}
          className={cn(classes["form-error-text"], {
            [classes["form-error-text__margin"]]: isTextArea,
          })}
        >
          {formik.errors[field]}
        </p>
      );
    }
    return null;
  };

  const pagesData = [
    {
      title: "Почему вы выбрали наш банк?",
      num: "1",
      fields: ["why_choose"],
      template: () => (
        <>
          <StepTextarea
            key={"why_choose"}
            formik={formik}
            hasError={hasError("why_choose")}
            field={"why_choose"}
            label={"Введите текст"}
          />
          {errorTemplate("why_choose")}
        </>
      ),
    },
    {
      title: "Введите номер телефона",
      num: "2",
      fields: ["phone"],
      template: () => (
        <>
          <StepTelephone
            key={"phone"}
            formik={formik}
            hasError={hasError("phone")}
            field={"phone"}
            label={"Введите номер телефона"}
          />
          {errorTemplate("phone")}
        </>
      ),
    },
    {
      title: "Адрес",
      num: "3",
      fields: ["address"],
      template: () => (
        <>
          <StepAddress
            key={"address"}
            formik={formik}
            label={"Введите адрес"}
            field={"address"}
            hasError={hasError("address")}
          />
          {errorTemplate("address")}
        </>
      ),
    },
    {
      title: "Планируете ли вы сделать наш банк основным своим банком?",
      num: "4",
      fields: ["is_main_bank"],
      template: () => (
        <>
          <StepRadio
            key={"is_main_bank"}
            formik={formik}
            field={"is_main_bank"}
            hasError={hasError("is_main_bank")}
          />
          {errorTemplate("is_main_bank")}
        </>
      ),
    },
    {
      title: "Почему?",
      num: "5",
      fields: ["main_bank_why"],
      template: () => (
        <>
          <StepTextarea
            key={"main_bank_why"}
            formik={formik}
            field={"main_bank_why"}
            label={"Введите текст"}
            hasError={hasError("main_bank_why")}
          />
          {errorTemplate("main_bank_why")}
        </>
      ),
    },
    {
      title: "Занимаетесь ли вы инвестированием?",
      num: "6",
      fields: ["is_investment"],
      template: () => (
        <>
          <StepRadio
            key={"is_investment"}
            formik={formik}
            hasError={hasError("is_investment")}
            field={"is_investment"}
          />
          {errorTemplate("is_investment")}
        </>
      ),
    },
    {
      title: formik.values.is_investment
        ? "Во что предпочитаете инвестировать?"
        : "Планируете ли в обозримом будущем инвестировать?",
      num: "7",
      isFinal: true,
      fields: [
        formik.values.is_investment
          ? "investment_prefer"
          : "is_investment_plan",
      ],
      template: () => {
        if (formik.values.is_investment) {
          return (
            <>
              <StepTextarea
                key={"investment_prefer"}
                formik={formik}
                field={"investment_prefer"}
                label={"Введите текст"}
                hasError={hasError("investment_prefer")}
                onChange={() =>
                  formik.setFieldValue("is_investment_plan", null)
                }
              />
              {errorTemplate("investment_prefer")}
            </>
          );
        } else {
          return (
            <>
              <StepRadio
                key={"is_investment_plan"}
                formik={formik}
                field={"is_investment_plan"}
                hasError={hasError("is_investment_plan")}
                onChange={() => formik.setFieldValue("investment_prefer", "")}
              />
              {errorTemplate("is_investment_plan")}
            </>
          );
        }
      },
    },
    {
      title: "",
      num: "8",
      isEnd: true,
      fields: [],
      template: () => {
        return <StepThanks />;
      },
    },
    {
      title: "Сервис временно не доступен",
      num: "9",
      isEnd: true,
      fields: [],
      template: () => {
        return "";
      },
    },
  ];

  let currentPage = pagesData[pageIndex];
  const setPageIndex = (index: number) => {
    setPageIndexForce(index);
    currentPage = pagesData[index];
  };

  const isFieldCorrect = (
    field: keyof validateProps,
    isDisableButton: boolean
  ) => {
    
    if (isDisableButton) {
      return (
        formik.errors[field] === undefined &&
        (formik.touched[field] === true ||
          formik.values[field] !== formik.initialValues[field])
      );
    } else {
      return (
        formik.errors[field] === undefined && formik.touched[field] === true
      );
    }
  };

  const isPageCorrect = (isDisableButton: boolean = false) => {
    let isCorrect = true;
    currentPage.fields.forEach((e) => {
      isCorrect &&= isFieldCorrect(e as keyof validateProps, isDisableButton);
    });
    return isCorrect;
  };

  const handleNext = () => {
    if (!isPageCorrect()) {
      currentPage.fields.forEach((e) => {
        formik.setFieldTouched(e);
      });
      return;
    }

    return setPageIndex(pageIndex + 1);
  };

  const handleSubmit = async () => {
    if (!isPageCorrect()) {
      currentPage.fields.forEach((e) => {
        formik.setFieldTouched(e);
      });
      return;
    }

    if (formik.errors && Object.keys(formik.errors).length) {
      alert("Проверьте корректность заполнения формы");
      return;
    }
    setIsLoading(true);
    try {
      await FormApi.form(formik.values);
      setPageIndex(7);
    } catch (error: any) {
      if (error?.status === 422) {
        alert("Проверьте корректность заполнения формы.");
      } else {
        setPageIndex(8);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrev = () => {
    setPageIndex(pageIndex >= 1 ? pageIndex - 1 : 0);
  };
  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Navigation
        title={currentPage.title}
        totalPages={
          !currentPage?.isEnd ? pagesData.filter((e) => !e?.isEnd).length : null
        }
        pagesData={pagesData}
        pageIndex={pageIndex}
        page={currentPage.num}
        setPage={setPageIndex}
      />

      <div className={classes["form-container"]}>
        {" "}
        {currentPage.template()}
        {!currentPage.isEnd && (
          <div className={classes["form-footer"]}>
            <div className={classes["form-agreement"]}>
              <span>
                Нажимая кнопку «Далее», я соглашаюсь <br />
                <a
                  href={process.env.REACT_APP_SUBMISSION_CONDITIONS_URL}
                  className={classes["form-agreement_link"]}
                  target="_blank"
                  rel="noreferrer"
                >
                  C условиями подачи онлайн-заявки
                </a>
              </span>
            </div>
            <div className={classes["form-buttons-container"]}>
              {pageIndex > 0 && (
                <FormButton
                  type="button"
                  handleClick={handlePrev}
                  className={classes["form-buttons_prev"]}
                >
                  Назад
                </FormButton>
              )}
              {currentPage?.isFinal ? (
                <FormButton
                  handleClick={handleSubmit}
                  disabled={isLoading}
                  type="button"
                >
                  Отправить
                </FormButton>
              ) : (
                <FormButton
                  state={isPageCorrect(true) ? "active" : "disable"}
                  handleClick={handleNext}
                  type="button"
                  className={classes["form-burron-right"]}
                >
                  Далее
                </FormButton>
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  );
};
export default Form;
