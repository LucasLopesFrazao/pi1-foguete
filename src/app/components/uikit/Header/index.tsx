import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  size: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  marginLess?: boolean;
}

export default function Header({ children, size, marginLess, className }: Props) {
  const computedClassName = classNames(
    'font-bold',
    {
      'mb-4': !marginLess,
    },
    {
      'text-4xl': size === 1,
      'text-3xl': size === 2,
      'text-2xl': size === 3,
      'text-xl': size === 4,
      'text-lg': size === 5,
      'text-base': size === 6,
    },
    className,
  );

  switch (size) {
    case 1: return <h1 className={computedClassName}>{children}</h1>;
    case 2: return <h2 className={computedClassName}>{children}</h2>;
    case 3: return <h3 className={computedClassName}>{children}</h3>;
    case 4: return <h4 className={computedClassName}>{children}</h4>;
    case 5: return <h5 className={computedClassName}>{children}</h5>;
    case 6: return <h6 className={computedClassName}>{children}</h6>;
  }
}
