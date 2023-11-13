import Button from "../buttons";
import { BsRocketTakeoffFill } from "react-icons/bs";
import Form from "../form";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full  max-w-xs space-y-8 bg-white p-6 rounded-xl shadow-md">
        <div className="w-full flex items-center justify-center bg-red-300">
          <BsRocketTakeoffFill
            style={{ color: "#C5C5C5", width: "8em", height: "8em" }}
          />
        </div>
        {Form({
          placeHolderEmail: "Endereço de email",
          placeHolderSenha: "Senha"
        })}
      </div>
    </div>
  );
}
