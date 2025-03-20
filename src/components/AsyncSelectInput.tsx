'use client';

import React from 'react';

import AsyncSelect from 'react-select/async';

export interface ColorOption {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const colorOptions: readonly ColorOption[] = [
  { value: 'ocean', label: 'Ocean', isFixed: true },
  { value: 'blue', label: 'Blue', isDisabled: true },
  { value: 'purple', label: 'Purple' },
  { value: 'red', label: 'Red', isFixed: true },
  { value: 'orange', label: 'Orange', },
];


const filterColors = (inputValue: string) => {
  return colorOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const loadOptions = (
  inputValue: string,
  callback: (options: ColorOption[]) => void
) => {
  setTimeout(() => {
    callback(filterColors(inputValue));
  }, 1000);
};

const AsyncSelectInput = () => (
  <AsyncSelect cacheOptions loadOptions={loadOptions} defaultOptions />
);

export default AsyncSelectInput;
