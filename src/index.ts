import React, { useState } from "react";
import cloneDeep from "lodash.clonedeep";

const useValidation = (): any => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | null>
  >({});

  const updateValidationErrors = (
    fieldId: string,
    errorMessage: string | null
  ): void => {
    const newErrors = cloneDeep(validationErrors);
    newErrors[fieldId] = errorMessage;
    setValidationErrors(newErrors);
  };

  const fieldChecker = (
    fieldId: string,
    value: string,
    validator: (value: any) => boolean,
    message: string
  ): ((
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLSelectElement>
  ) => void) => (
    e: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement>
  ): void => {
    if (!validator(value)) {
      updateValidationErrors(fieldId, message);
    } else {
      updateValidationErrors(fieldId, null);
    }
  };

  const getError = (fieldId: string): string | null => {
    return typeof validationErrors[fieldId] === "string"
      ? validationErrors[fieldId]
      : null;
  };

  return [fieldChecker, getError];
};

// @ts-ignore
export { useValidation };
