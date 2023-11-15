//import {IFoguete} from "./interface/foguete";

import { IFoguete } from "@/interface/foguete/foguete.interface";
import { IconButton } from "@material-tailwind/react";
import { useCallback, useEffect, useState } from "react";
import Button from "../../components/buttons";
import {
  BsRocketTakeoffFill,
  BsFillTrashFill,
  BsPencilFill,
} from "react-icons/bs";


function VisualizarFoguete() {
  //  const [list, setList] = useState<IFoguete[]>([]);

  const list = [
    {
      nome: "Foguete 1",
      material: "plastico",
    },
    {
      nome: "Foguete 2",
      material: "plastico",
    },
    {
      nome: "Foguete 3",
      material: "plastico",
    },
  ];

  /* useEffect(() => {
    Foguete.getAll().then((result) => {
      if (result instanceof ApiException) {
        alert(result.message);
      } else {
        alert('Houve um erro');
      }
    });
  }, []); */

  /*const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === "Enter") {
          if (e.currentTarget.value.trim().length === 0) return; 
          const value = e.currentTarget.value;
          e.currentTarget.value = "";

          if (list.some((listItem) => listItem.title === value)) return;
          Foguete.create({ title: value, isCompleted: false }).then(
            (result) => {
              if (result instanceof ApiException) {
                alert(result.message);
              } else {
                setList((oldList) => [...oldList, result]);
              } 
            }
          ); 
        } 
      },[list]); */

  /*  const handleDelete = useCallback((id: number) => {
    Foguete.deleteById(id).then((result) => {
      if (result instanceof ApiException) {
        alert(result.message);
      } else {
        setList((oldList) => {
          return oldList.filter((oldListItem) => oldListItem.id !== id);
        });
      }
    });
  }, []); */

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
        <title>Foguetes</title>
        <h2 style={{ color: "#E8E8E8" }}> Foguete </h2>
        <ul>
          {list.map((listItem, index) => (
            <li key={index}>
              <h3> {listItem.nome} </h3>
              <span>
                {" "}
                Material: {listItem.material}
                </span>  
                <BsFillTrashFill style={{ color: "#E8E8E8" }}  />
                <BsPencilFill style={{ color: "#E8E8E8" }} />
              
            </li>
          ))}
        </ul>
        <div className="w-full">
          <Button texto={"Adicionar foguete"}/>
        </div>
      </div>
    </div>
  );
}
export default VisualizarFoguete;
