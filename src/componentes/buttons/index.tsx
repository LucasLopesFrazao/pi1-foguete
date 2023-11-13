export default function Button({
    texto,
}: {
    texto: string
}) {
    return (
        <button
            type="button"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {texto}
          </button>
    )
}