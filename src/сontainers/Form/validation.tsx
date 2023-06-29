/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-template-curly-in-string */
import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import { setLocale } from "yup";

const messages = {
  mixed: {
    required: "Это поле обязательно.",
    default: "Некорректное значение.",
  },
  string: {
    //email: 'Введите корректный email',
    //url: 'Введите корректный URL',
    min: "Должно быть минимум символов: ${min}.",
    max: "Должно быть символов до: ${max}.",
  },
  number: {
    //min: 'Значение должно быть больше или равно ${min}',
    //max: 'Значение должно быть меньше или равно ${max}',
  },
  date: {
    //min: 'Дата должна быть после ${min}',
    //max: 'Дата должна быть до ${max}',
  },
};

setLocale(messages);

const phoneValidator = (message = "Некорректный номер телефона") =>
  Yup.string().test("phone", message, (value) => {
    if (!value) return true;
    const phoneNumber = parsePhoneNumberFromString(value, "RU");
    return phoneNumber ? phoneNumber.isValid() : false;
  });

export default () =>
  Yup.object().shape({
    why_choose: Yup.string().min(10).max(500).required(),
    phone: phoneValidator("Некорректный номер телефона").required(),
    address: Yup.string().max(255).required(),
    is_main_bank: Yup.boolean().required(),
    main_bank_why: Yup.string().min(10).max(500).required(),
    is_investment: Yup.boolean().required(),
    investment_prefer: Yup.string()
      .nullable()
      .when("is_investment", {
        is: true,
        then: (schema) => schema.min(1).max(500).required(),
      }),
    is_investment_plan: Yup.boolean()
      .nullable()
      .when("is_investment", {
        is: false,
        then: (schema) => schema.required(),
      }),
  });
