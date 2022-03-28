export type Field = {
  label: string;
  name: string;
  value: any;
  type?: string;
  dataType?: string;
  options?: Option[];
  disabled?: boolean;
  validationRules?: string;
};

interface Option {
  label: string;
  value: any;
}

export type FormFields = Field[];

export type ErrorFields = {
  [fieldName: string]: {
    label: string;
    errors: {
      [name: string]: string;
    };
  };
};
