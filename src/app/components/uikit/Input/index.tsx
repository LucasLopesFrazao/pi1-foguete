"use client";
import classNames from "classnames";
import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function Input({
  className,
  label,
  onChange,
  value,
  ...rest
}: Props) {
  return (
    <div className={classNames("flex flex-col gap-2 mb-4 text-gray-800")}>
      {label && (
        <label className={classNames("text-sm font-semibold text-gray-800")}>
          {label}
        </label>
      )}
      <input
        {...rest}
        className={classNames(
          className,
          "w-full leading-5 relative py-2 px-4 rounded-md bg-white border border-gray-300",
          "overflow-x-auto focus:outline-none focus:border-gray-500 focus:ring-0",
          "text-black"
        )}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
