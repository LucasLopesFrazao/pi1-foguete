"use client";
import classNames from "classnames";

type Props = {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ label, onChange, value, ...rest }: Props) {
  return (
    <>
      {label && (
        <label
          className={classNames(
            "text-sm font-semibold text-gray-800"
          )}
        >
          {label}
        </label>
      )}
      <input
        className={classNames(
          "w-full leading-5 relative py-2 px-4 rounded-md bg-white border border-gray-300",
          "overflow-x-auto focus:outline-none focus:border-gray-500 focus:ring-0",
          "text-black"
        )}
        onChange={onChange}
        value={value}
        {...rest}
      />
    </>
  );
}
