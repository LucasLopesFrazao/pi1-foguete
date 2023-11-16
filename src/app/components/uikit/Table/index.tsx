import classNames from 'classnames'

export type Props<T> = {
  columns: {
    key: string,
    title: React.ReactNode,
    render: (value: T, index: number) => React.ReactNode,
    titleClassName?: string,
    className?: string,
  }[],
  data: T[],
  className?: string,
}

export default function Table<T = unknown>({ columns, data, className }: Props<T>) {
  return (
    <div className={classNames('overflow-auto', className)}>
      <table className={classNames('table-auto w-full')}>
        <thead className="bg-gray-400 border-t border-l border-r">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={classNames('px-4 py-3 text-black', column.titleClassName)}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className='bg-gray-200'>
          {
            data.length === 0 && (
              <tr>
                <td className="border border-gray-200 px-4 py-3 font-medium text-center text-black" colSpan={columns.length}>
                  Nenhum registro encontrado
                </td>
              </tr>
            )
          }
          {
            data.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key} className={classNames('border border-gray-200 px-4 py-3 font-medium text-black', column.className)}>
                    {column.render(item, index)}
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
