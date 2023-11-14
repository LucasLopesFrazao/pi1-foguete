import { BsRocketTakeoffFill } from "react-icons/bs";
import Button from "../../components/buttons";

export default function TelaInicial() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className=" w-full max-w-xs  space-y-8 bg-white p-6 rounded-xl shadow-md">
        <div className="w-full flex items-center justify-center">
          <BsRocketTakeoffFill
            style={{ color: "#C5C5C5", width: "10rem", height: "10rem" }}
          />
        </div>
        <div className="mt-4 space-y-8 flex flex-col">
          <Button texto="SENSOR"/>
          <Button texto="FOGUETE"/>
          <Button texto="LANÇAMENTO"/>
        </div>
      </div>
    </div>
  );
}
