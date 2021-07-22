/**
 * Checks eligibility of account number
 * 
 * @param {number} accountNumber 
 * @returns string result
 */
const eligibilityService = (accountNumber) => {
  let result = "";
  const accounts = [
      { number: 1234567891, eligible: true },
      { number: 1222567891, eligible: true },
      { number: 1234527891, eligible: false },
    ],
    re = /^\d+$/;

  if (!accountNumber) {
    throw "Technical failure exception";
  }

  if (
    accountNumber.toString().length === 10 &&
    re.test(accountNumber) &&
    accounts.some((e) => e.number === accountNumber && e.eligible)
  ) {
    result = "CUSTOMER_ELIGIBLE";
  } else if (accounts.some((e) => e.number === accountNumber && !e.eligible)) {
    result = "CUSTOMER_INELIGIBLE";
  } else {
    throw "Invalid account number exception";
  }

  return result;
};

exports.eligibilityService = eligibilityService;
