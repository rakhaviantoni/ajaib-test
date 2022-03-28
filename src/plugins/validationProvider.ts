import { ValidationProvider, extend } from 'vee-validate';
import { required, email, max, numeric, confirmed } from 'vee-validate/dist/rules';

extend('email', email);
extend('required', {
  ...required,
  message: (fieldName) => {
    return `${fieldName} is required`;
  },
});
extend('max', {
  ...max,
  message: (fieldName, placeholders) => {
    return `${fieldName} can't have more than ${placeholders.length} characters`;
  },
});
extend('numeric', {
  ...numeric,
  message: (fieldName) => {
    return `${fieldName} must only have numeric characters`;
  },
});
extend('confirmed', confirmed);
extend('phone', {
  validate(value) {
    return /^(\+|-|[0-9])+$/.test(value);
  },
  message: (fieldName) => {
    return `${fieldName} is not valid`;
  },
});
extend('min_selected', {
  validate(value, args: any) {
    return value.length >= (typeof args[0] === 'string' ? args[0] : Number(args[0]));
  },
  message: (fieldName, placeholders) => {
    return `${fieldName} must be selected at least ${placeholders[0]}`;
  },
});

export default ValidationProvider;
