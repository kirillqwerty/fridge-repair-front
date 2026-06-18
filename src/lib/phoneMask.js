export const BELARUS_PHONE_PLACEHOLDER = "+375 (__) ___-__-__";

export function getBelarusPhoneDigits(value = "") {
  let digits = String(value).replace(/\D/g, "");

  if (digits.startsWith("375")) {
    digits = digits.slice(3);
  } else if (digits.startsWith("80")) {
    digits = digits.slice(2);
  } else if (digits.startsWith("8") && digits.length > 9) {
    digits = digits.slice(1);
  }

  return digits.slice(0, 9);
}

function formatBelarusPhoneDigits(digits = "") {
  const cleanDigits = String(digits).replace(/\D/g, "").slice(0, 9);

  if (!cleanDigits) {
    return "";
  }

  const operatorCode = cleanDigits.slice(0, 2);
  const firstPart = cleanDigits.slice(2, 5);
  const secondPart = cleanDigits.slice(5, 7);
  const thirdPart = cleanDigits.slice(7, 9);

  let result = `+375 (${operatorCode}`;

  if (operatorCode.length === 2) {
    result += ")";
  }

  if (firstPart) {
    result += ` ${firstPart}`;
  }

  if (secondPart) {
    result += `-${secondPart}`;
  }

  if (thirdPart) {
    result += `-${thirdPart}`;
  }

  return result;
}

export function formatBelarusPhone(value = "", previousValue = "") {
  let digits = getBelarusPhoneDigits(value);
  const previousDigits = getBelarusPhoneDigits(previousValue);

  const isDeleting = String(value).length < String(previousValue).length;
  const deletedOnlyMaskSymbol =
    isDeleting && digits === previousDigits && digits.length > 0;

  if (deletedOnlyMaskSymbol) {
    digits = digits.slice(0, -1);
  }

  return formatBelarusPhoneDigits(digits);
}

export function isValidBelarusPhone(value = "") {
  return getBelarusPhoneDigits(value).length === 9;
}
