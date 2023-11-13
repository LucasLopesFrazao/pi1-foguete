import { BsRocketTakeoffFill } from "react-icons/bs";
import Button from "../buttons";

export default function TelaInicial() {
  return (
    <div className="min-h-screen w-40 flex items-center justify-center bg-gray-100 p-4">
      <div className=" w-full max-w-xs  space-y-8 bg-white p-6 rounded-xl shadow-md">
        <div className="w-full flex items-center justify-center bg-red-300">
          <BsRocketTakeoffFill
            style={{ color: "#C5C5C5", width: "10rem", height: "10rem" }}
          />
        </div>
        <div className="mt-4 space-y-8 ">
          {Button({
            texto: "Sensor",
          })}
          {Button({
            texto: "Foguete",
          })}
          {Button({
            texto: "Lançamento",
          })}
        </div>
      </div>
    </div>
  );
}
