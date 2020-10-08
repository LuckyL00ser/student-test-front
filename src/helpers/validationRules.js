import { extend } from "vee-validate";
import {
  email,
  required,
  min,
  max,
  confirmed,
  numeric
} from "vee-validate/dist/rules";

// in MB
extend("file_size", {
  message: "Twój plik jest zbyt duży, maksymalnie {size} MB",
  params: ["size"],
  validate: (value, { size } = {}) =>
    // eslint-disable-next-line no-useless-escape
    value.size <= size * 1024 * 1024
});

extend("file_type", {
  message: "Podaj plik z właściwym rozszerzeniem (.pdf)",
  params: ["type"],
  validate: (value, { type } = {}) =>
    // eslint-disable-next-line no-useless-escape
    value.name.endsWith(type)
});

extend("email", {
  ...email,
  message: "Podaj poprawny adres e-mail"
});
extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Hasła nie są identyczne"
});
extend("required", {
  ...required,
  message: "To pole jest wymagane"
});
extend("numeric", {
  ...numeric,
  message: "To pole może zawierać wyłącznie cyfry"
});
extend("max", {
  ...max,
  params: ["length"],
  message: "Zbyt długa nazwa. To pole może mieć maksymalnie {length} znaków"
});
extend("max_value", {
  params: ["specified"],
  validate(value, { specified }) {
    return value <= specified;
  },
  message: "Maksimum {specified}"
});
extend("min_value", {
  params: ["specified"],
  validate(value, { specified }) {
    return value >= specified;
  },
  message: "Minimum {specified}"
});
extend("min", {
  ...min,
  params: ["length"],
  message: "Zbyt krótkie. To pole musi mieć minimum {length} znaków"
});
extend("confirmed", {
  ...confirmed,
  params: ["target"],
  message: "Hasła różnią się od siebie"
});
