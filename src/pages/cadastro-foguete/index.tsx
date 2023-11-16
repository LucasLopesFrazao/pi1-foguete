import { BsRocketTakeoffFill } from "react-icons/bs";
import Button from "../../components/buttons";
import Input from "@/components/inputs";
import Dropdown from "@/components/dropdown";

export default function CadastroFoguete() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div
        className=" w-full max-w-xs flex flex-col items-center justify-center space-y-8
       bg-gradient-radial-foguete
        p-6 rounded-xl shadow-md"
      >
        <div className="w-full flex items-center justify-center">
          <BsRocketTakeoffFill
            style={{ color: "#d6d6d6", width: "7rem", height: "7rem" }}
          />
        </div>
        <div className="mt-4 space-y-8 flex flex-col">
          <Input texto="Nome" placeHolderTexto="Nome" />
          <Input texto="Material" placeHolderTexto="Material" />
          <Dropdown />
        </div>
        <div className="w-full">
          <Button texto={"Confirmar"}/>
        </div>
      </div>
    </div>
  );
}
