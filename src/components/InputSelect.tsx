"use client";

import { useMemo } from "react";
import type { SingleValue } from "react-select";
import Select, { components, type ValueContainerProps } from "react-select";
import type { SelectWrapperOption } from "@/utils/types";
import Icon from "./Icon";
import { getControlStyle, getMenuStyle, getSelectProps } from "@/app/utils/sharedSelectProps";

interface InputSelectProps {
  value: SelectWrapperOption | null;
  options: SelectWrapperOption[];
  onChange?: (value: SelectWrapperOption | null) => void;
  label?: string;
  errorMessage?: string;
  placeholder?: string;
  prefixIcon?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  customNoOptionsText?: string;
  customInputClassName?: string;
  variant?: "detached" | null;
}

export default function InputSelect({
  value,
  options,
  onChange,
  label,
  errorMessage,
  placeholder,
  prefixIcon,
  isDisabled,
  customNoOptionsText,
  customInputClassName,
  isRequired,
  variant,
  ...rest
}: InputSelectProps) {
  const inputId = label ? label.toLowerCase().replace(/\s+/g, "-") : undefined;

  const handleChange = (value: SingleValue<SelectWrapperOption>) => {
    if (onChange) onChange(value);
  };

  const CustomValueContainer = ({
    children,
    ...props
  }: ValueContainerProps<SelectWrapperOption, false>) => (
    <>
      {prefixIcon && (
        <Icon className="ml-2 size-4" icon={prefixIcon} title="Search" />
      )}
      <components.ValueContainer {...props}>{children}</components.ValueContainer>
    </>
  );

  const ClearIndicator = (props: any) => (
    <components.ClearIndicator {...props}>
      <Icon className="cursor-pointer text-brightBlue-500" icon="close-circle-line" title="Clear text" />
    </components.ClearIndicator>
  );

  const controlStyle = useMemo(() => getControlStyle(variant), [variant]);
  const menuStyle = useMemo(() => getMenuStyle(variant), [variant]);

  const selectProps = getSelectProps({
    value,
    options,
    handleChange,
    label,
    errorMessage,
    inputId,
    placeholder,
    isDisabled,
    isRequired,
    customNoOptionsText,
    isSearchable: false,
    controlStyle,
    menuStyle,
  });

  return (
    <div className={`relative ${customInputClassName ?? ""}`} data-test="react-select" {...rest}>
      <Select
        {...selectProps}
        components={{ ClearIndicator, ValueContainer: CustomValueContainer }}
      />
    </div>
  );
}
