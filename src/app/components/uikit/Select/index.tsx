import classNames from 'classnames';
import { useId } from 'react';
import ReactSelect from 'react-select'

type Option = {
  value: string;
  label: string;
}

type Props<IsMulti extends boolean = false> = {
  options: Option[];
  placeholder?: string;
  multiple?: IsMulti;
  label?: string;
  value?: IsMulti extends true ? string[] : string;
  onChange?: (value: IsMulti extends true ? string[] : string) => void;
  autoFocus?: boolean;
  className?: string;
  id?: string;
  disabled?: boolean;
}

export default function Select<IsMulti extends boolean = false>({
  label, options, placeholder, multiple, value, id, className, onChange, autoFocus, disabled=false
}: Props<IsMulti>) {
  const genId = useId();
  const renderedId = id || genId;

  return (
    <div className={classNames('flex flex-col gap-2 mb-4', className)}>
      {label && (
        <label
          htmlFor={renderedId}
          className={classNames(
            'text-sm font-semibold text-black',
          )}
        >
          {label}
        </label>
      )}

      <ReactSelect<Option, IsMulti>
        isDisabled={disabled}
        id={renderedId}
        placeholder={placeholder || 'Selecione...'}
        noOptionsMessage={() => 'Nenhum resultado encontrado'}
        isMulti={multiple}
        options={options}
        value={multiple ? options.filter((o) => value?.includes(o.value)) : (options.find((o) => o.value === value) ?? null)}
        onChange={(option) => {
          const returnedValue = multiple
            ? (option as Option[]).map((o) => o.value)
            : (option as Option).value;

          onChange?.(returnedValue as (IsMulti extends true ? string[] : string));
        }}
        autoFocus={autoFocus}
        className='dark:text-gray-800'
      />
    </div>
  );
}
