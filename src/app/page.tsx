"use client";

import { useState } from "react";
import { useAuth } from "../../firebase/AuthContext";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseApp";
import { useRouter } from "next/navigation";

import { toast } from 'react-toastify';

type TypeLogin = {
  email: string;
  senha: string;
};

export default function Home() {
  const [login, setLogin] = useState<TypeLogin>({
    email: "",
    senha: "",
  });

  const { loading, currentUser } = useAuth();
  const router = useRouter();

  const signIn = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, login.email, login.senha)
      .then((response) => {
        router.replace("/inicial");
      })
      .catch((error) => {
        console.log(error)
        toast.error('Usuário ou senha inválido.');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xs space-y-8 bg-white p-6 rounded-xl shadow-md">
        <div>
          <h2 className="text-center text-2xl font-extrabold text-gray-900">
            Rocket Team
          </h2>
        </div>
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
                placeholder="Endereço de Email"
                onChange={(e) =>
                  setLogin((prev) => ({ ...prev, email: e.target.value }))
                }
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
                placeholder="Senha"
                onChange={(e) =>
                  setLogin((prev) => ({ ...prev, senha: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={signIn}
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
