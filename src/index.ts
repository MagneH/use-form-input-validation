import React, { useState } from "react";
import { Schema } from "yup";
import { cloneDeep } from "lodash";

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
    schema: Schema<any>,
    message: string
  ): ((
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLSelectElement>
  ) => void) => (
    e: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement>
  ): void => {
    if (!schema.isValidSync(value)) {
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
