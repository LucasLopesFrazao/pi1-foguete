"use client";

import classNames from "classnames";
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  InputHTMLAttributes,
  useId,
  useState,
} from "react";

type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  value?: string;
  label?: string;
  validation?: {
    fn: (value: string) => null | { message: string } | boolean;
    on?: "blur" | "change";
  };
  mask?: {
    mask: (value: string) => string;
    unmask: (value: string) => string;
  };
  onChange?: (e: ChangeEvent<HTMLInputElement>, unmaskedValue: string) => void;
};

export default function Input({
  className,
  label,
  validation,
  value,
  mask,
  onChange,
  ...rest
}: Props) {
  const id = useId();
  const renderedId = rest.id || id;

  const [internalValue, setInternalValue] = useState<string>(value as string);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );

  const onValidate = (val: string) => {
    if (!validation?.fn) return;

    const result = validation.fn(val as string);
    if (result === null) {
      setIsValid(null);
    } else if (result === true) {
      setIsValid(true);
    } else {
      setIsValid(false);
      setValidationMessage(result === false ? null : result.message);
    }
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    if (validation?.on === "blur" || (validation?.fn && !validation?.on))
      onValidate(internalValue);
    rest.onBlur?.(e);
  };

  const onChangeInternal: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (validation?.on === "change") onValidate(newValue);
    onChange?.(e, mask?.unmask ? mask.unmask(newValue) : newValue);
  };

  return (
    <div className={classNames("flex flex-col gap-2 mb-4 text-gray-800")}>
      {label && (
        <label
          htmlFor={renderedId}
          className={classNames("text-sm font-semibold text-gray-800", {
            "text-red-700 dark:text-red-500": isValid === false,
          })}
        >
          {label}
        </label>
      )}
      <input
        {...rest}
        value={mask?.mask && value ? mask.mask(value as string) : value}
        onBlur={onBlur}
        onChange={onChangeInternal}
        className={classNames(
          className,
          "w-full leading-5 relative py-2 px-4 rounded-md bg-white border border-gray-300",
          "overflow-x-auto focus:outline-none focus:border-gray-500 focus:ring-0",
          {
            "shadow-[0_2px_0_#b91c1c] dark:shadow-[0_3px_0_#ef4444]":
              isValid === false,
          },
          {
            "shadow-[0_2px_0_#15803d] dark:shadow-[0_3px_0_#22c55e]":
              isValid === true,
          }
        )}
        id={renderedId}
      />
      <div
        className={classNames("overflow-hidden transition-all duration-500", {
          "max-h-0": isValid || isValid === null,
          "max-h-[999px]": isValid === false,
        })}
      >
        <span
          className={classNames(
            "block transition-all duration-300 text-red-700 dark:text-red-500 text-sm",
            {
              "opacity-0 -translate-y-full": isValid || isValid === null,
              "opacity-100 translate-y-0": isValid === false,
            }
          )}
        >
          {validationMessage}
        </span>
      </div>
    </div>
  );
}
