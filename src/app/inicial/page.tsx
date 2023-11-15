"use client";

import { useState } from "react";
import { Button, Input } from "../components/uikit";
import axios from "axios";

import { toast } from "react-toastify";
import ListSensor from "./listSensor";

export default function Inicial() {
  const [sensor, setSensor] = useState({
    name: "",
    function: "",
    value: "",
  });

  const handleSendSensor = () => {
    const urlPostSensor = `https://pi1-foguete-backend.vercel.app/sensor`;

    try {
      axios.post(urlPostSensor, sensor);
      toast.success("Sensor cadastrado com sucesso.");
    } catch (e) {
      toast.error("Erro ao cadastrar sensor.");
    }
  };

  return (
    <div className="min-h-screen justify-center bg-gray-100 p-4">
      <h1 className="text-black">Sensor</h1>
      <div className="flex items-center justify-center bg-gray-200 p-4">
        <div className="w-1/2 h-full">
          <Input
            label="Nome"
            value={sensor.name}
            onChange={(e) =>
              setSensor((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Input
            label="Função"
            value={sensor.function}
            onChange={(e) =>
              setSensor((prev) => ({ ...prev, function: e.target.value }))
            }
          />
          <Input
            label="Valor"
            value={sensor.value}
            onChange={(e) =>
              setSensor((prev) => ({ ...prev, value: e.target.value }))
            }
          />
          <Button variant="primary" className="mt-2" onClick={handleSendSensor}>
            Cadastrar
          </Button>
        </div>
      </div>
      <ListSensor />
    </div>
  );
}
