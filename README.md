                                                                                                                                                                                                                               
React Hook - useFormInputValidation
==========
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A hook for validating form input

## Get Started

### Installation

```
npm install use-form-input-validation --save
```

### Prerequisites

You need to provide the curry function with a yup schema for validation of each specific field.

### Usage

The hook maintains its own state and returns a tuple consisting of [0] a curry function used to create onBlur handlers
and [1] a function to retrieve a potential error. 

The curry function takes four values:

1. A unique id.
2. A value to validate.
3. A validator function that takes a value and returns a boolean value, either `true` or `false`.
4. A custom error message to render on error.

### Example

``` javascript
import React from 'react';
import * as yup from 'yup';
import { useValidation } from 'use-form-input-validation';

const renderError = errorMessage => {
  return errorMessage ? <div className="form__error-message">{errorMessage}</div> : null;
};

const HelloWorld = () => {

    const [value, setValue] = useState('');
    const [otherValue, setOtherValue] = useState('');

    // Apply hook
    const [fieldChecker, getError] = useValidation();
    
    return (
        <>
            <input
                type="text"
                id="some-id"
                placeholder={'some placeholder'}
                value={value}
                onChange={setValue}
                onBlur={fieldChecker(
                'some-id',
                value,
                (inputValue) => yup
                    .string()
                    .notOneOf([''])
                    .required()
                    .validateSync(inputValue),
                'Please enter a value',
                )}
            />
    
           // Render error 1
           {renderError(getError('some-id'))}
    
            <input
                type="text"
                id="some-other-id"
                placeholder={'some placeholder'}
                value={otherValue}
                onChange={setOtherValue}
                onBlur={fieldChecker(
                'some-other-id',
                otherValue,
                (inputValue) => yup
                    .string()
                    .notOneOf([''])
                    .required()
                    .validateSync(inputValue),
                'Please enter some other value',
                )}
            />
    
            // Render error 2
            {renderError(getError('some-other-id'))}
        </>
    );
}
```
