/**
 *  Utilities for form
 */

import moment from 'moment';

/**
 * Determine if field is valid
 * This is using "vee-validate" API
 * @param {Object} { vProvider, field }
 */
export const isValidState = ({ vProvider, field }: { vProvider: any; field: any }): boolean => {
  return (field.value && vProvider.valid) || vProvider.passed || !vProvider.required;
};

/**
 * Determine if field is invalid
 * * This is using "vee-validate" API
 * @param {Object} { vObserver, vProvider, field }
 */
export const isInvalidState = ({
  vObserver,
  vProvider,
  field,
}: {
  vObserver: any;
  vProvider: any;
  field: any;
}): boolean => {
  return (
    (vObserver.errors[field.name] && vObserver.errors[field.name].length > 0) ||
    (vProvider.invalid && vProvider.changed)
  );
};

/**
 * Determine if email field is invalid
 * * This is using "vee-validate" API
 * @param {Object} { vObserver, vProvider, field }
 */
export const isInvalidEmailState = ({
  vObserver,
  vProvider,
  field,
}: {
  vObserver: any;
  vProvider: any;
  field: any;
}): boolean => {
  return (
    vObserver.errors[field.name] &&
    vObserver.errors[field.name].length > 0 &&
    vProvider.invalid &&
    vProvider.touched
  );
};

export const isCheckboxValueDiff = (newVal: any, oldVal: any): boolean => {
  let isDiff = false;
  if (newVal.length !== oldVal.length) {
    return true;
  }
  Object.keys(oldVal).forEach((v, i) => {
    if (newVal.indexOf(v) < 0) {
      isDiff = true;
    }
  });
  return isDiff;
};

export const isDateLessThanToday = (date: string): boolean => {
  return moment().diff(moment(date), 'days') >= 1;
};

export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
