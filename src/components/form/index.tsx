import Button from "../buttons";

export type Props = {
  email?: string;
  senha?: string;
  placeHolderEmail?: string;
  placeHolderSenha?: string;
};

export default function Form({
  email,
  senha,
  placeHolderEmail = "Endereço de email",
  placeHolderSenha = "Senha",
}: Props) {
  return (
    <form className="mt-4 space-y-6" action="#" method="POST">
      <div className="rounded-md shadow-sm space-y-4">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Usuário
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            className="appearance-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={placeHolderEmail}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="appearance-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={placeHolderSenha}
          />
        </div>
      </div>
      {Button({ texto: "Entrar" })}
    </form>
  );
}
