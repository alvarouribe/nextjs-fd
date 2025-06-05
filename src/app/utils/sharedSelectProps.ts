import type { SelectWrapperOption } from "@/utils/types";

export const defaultControlStyle =
  "pl-1 w-full h-11.25 text-black text-sm placeholder-slateGrey-300 border focus-within:!border-brightBlue-500 disabled:bg-gray-200 disabled:cursor-not-allowed outline-none !shadow-none";

export const getControlStyle = (variant: "detached" | null) =>
  variant === "detached" ? "!rounded-md" : "!rounded-t-md !rounded-b-none";

export const getMenuStyle = (variant: "detached" | null) =>
  variant === "detached"
    ? "!mt-2 text-sm rounded-md !z-20"
    : "!mt-0 text-sm rounded-md !rounded-t-none !z-20";

export const getSelectProps = (
  params: {
    value: SelectWrapperOption | null;
    options: SelectWrapperOption[];
    handleChange: (val: any) => void;
    label?: string;
    errorMessage?: string;
    inputId?: string;
    placeholder?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
    customNoOptionsText?: string;
    isSearchable?: boolean;
    controlStyle: string;
    menuStyle: string;
  }
) => ({
  ariaLabel: params.label,
  ariaRequired: params.isRequired,
  ariaInvalid: !!params.errorMessage,
  ariaErrormessage: params.errorMessage,
  name: params.inputId,
  inputId: params.inputId,
  options: params.options,
  value: params.value,
  onChange: params.handleChange,
  placeholder: params.placeholder || "Select property type",
  classNamePrefix: "react-select",
  isDisabled: params.isDisabled,
  isClearable: true,
  noOptionsMessage: () => params.customNoOptionsText || "No options found",
  classNames: {
    control: (state: any) =>
      `${!params.value && params.errorMessage ? "!border-system-red" : "!border-fade-lighter !hover:border-fade-lighter"}
      ${state.selectProps.menuIsOpen ? params.controlStyle : "!rounded-md"}
      ${defaultControlStyle}`,
    indicatorSeparator: (state: any) =>
      state.getValue().length > 0 ? "block" : "hidden",
    dropdownIndicator: (state: any) =>
      `${!params.value && params.errorMessage ? "!text-system-red" : "!text-black"} !scale-75 ${state.selectProps.menuIsOpen ? "transform rotate-180" : ""} ${params.isSearchable ? "!hidden" : ""}`,
    menu: () => params.menuStyle,
    menuList: () => "!py-0",
    option: (state: any) =>
      `hover:bg-blue-800 hover:text-white ${
        state.isFocused ? "!bg-blue-800 !text-white" : ""
      }`,
    singleValue: () =>
      `${!params.value && params.errorMessage ? "!text-system-red" : "!text-black"}`,
  },
});
