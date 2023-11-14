export type Props = {
    texto: string
}

export default function Button({texto}: Props) {
    return (
      <button
      className=" w-full center mr-4 rounded-lg bg-blue-gray-900 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-gray-700/20 transition-all hover:shadow-lg hover:shadow-blue-gray-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      data-ripple-light="true"
    >
      {texto}
    </button>
    )
}