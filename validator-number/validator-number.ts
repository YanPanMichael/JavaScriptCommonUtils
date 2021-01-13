
type ValidatorFuncType = (rule: any, value: any, callback: any, source?: any, options?: any) => any;

/**
 * 金额校验
// var regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
// ^[1-9] The number must start with 1-9
// \d* The number can then have any number of any digits
// (...)$ look at the next group from the end (...)$
// (...)?(...)? Look for two groups optionally. The first is for the comma, the second is for the decimal.
// (,\d{3}){1} Look for one occurance of a comma followed by exactly three digits
// \.\d{0,2} Look for a decimal followed by zero, one, or two digits.

// This regex works off of these rules:

// Valid values are numbers 0-9, comma and decimal point.
// If a customer enters more than one decimal point or more than one comma, the value is invalid and will not be accepted.

// Examples of invalid input values

// 1.2.3
// 1,2,4
// Examples of valid input values
// 1.23
// 1,000
// 3967.
// 23
// 1.2
// 999,999.99
 */
export const moneyValidator = (allowZero = false) => {
  return ((_, value, callback) => {
    const regex = new RegExp(`^([1-9][0-9]{0,8}(\\.\\d{1,2})?|0\\.\\d{1,2}${allowZero ? '|0' : ''})$`);
    if (!regex.test(value)) {
      callback('请输入正确的金额');
      return;
    }

    callback();
  }) as ValidatorFuncType;
};