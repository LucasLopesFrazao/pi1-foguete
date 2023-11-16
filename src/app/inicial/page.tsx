"use client";

import { useEffect, useState } from "react";
import { Button, Input } from "../components/uikit";
import axios from "axios";

import { toast } from "react-toastify";
import ListSensor from "./listSensor";

export default function Inicial() {
  const [sensor, setSensor] = useState({
    id: "",
    name: "",
    function: "",
    value: "",
  });

  const [data, setData] = useState([{
    id: "",
    name: "",
    function: "",
    value: "",
  }]);

  useEffect(() => {
    fetchSensors();
  }, []);

  const fetchSensors = async () => {
  const urlSensor = `https://pi1-foguete-backend.vercel.app/sensor`;

    try {
      const response = await axios.get(urlSensor);
      setData(response.data);
    } catch (error) {
      toast.error("Erro ao buscar sensores.");
    }
  };

  const handleSendSensor = async () => {
    if (!sensor.id) {
      const urlPostSensor = `https://pi1-foguete-backend.vercel.app/sensor`;

      try {
        axios.post(urlPostSensor, {
          name: sensor.name,
          function: sensor.function,
          value: sensor.value,
        });
        toast.success("Sensor cadastrado com sucesso.");
      } catch (e) {
        toast.error("Erro ao cadastrar sensor.");
      }
    } else {
      const urlPutSensor = `https://pi1-foguete-backend.vercel.app/sensor/${sensor.id}`;
      try {
        axios.put(urlPutSensor, {
          name: sensor.name,
          function: sensor.function,
          value: sensor.value,
        });
        toast.success("Sensor editado com sucesso.");
      } catch (e) {
        toast.error("Erro ao editar sensor.");
      }
    }

    resetSensor();
    await fetchSensors();
    await fetchSensors();
  };

  const handleDeleteSensor = async (sensorId: string) => {
    const urlDeleteSensor = `https://pi1-foguete-backend.vercel.app/sensor/${sensorId}`;

    try {
      axios.delete(urlDeleteSensor);
      toast.success("Sensor deletado com sucesso.");
    } catch (e) {
      toast.error("Erro ao deletar sensor.");
    }

    resetSensor();
    await fetchSensors();
    await fetchSensors();
  };

  const resetSensor = () => {
    setSensor({
      id: "",
      name: "",
      function: "",
      value: "",
    });
  };

  return (
    <div className="min-h-screen justify-center bg-gray-100 p-4">
      <h1 className="text-black">Sensor</h1>
      <div className="flex items-center justify-center bg-gray-200 p-4">
        <div className="w-1/2 h-full">
          <Input
            label="ID"
            value={sensor.id}
            disabled={true}
            className="text-gray-300"
          />
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
          <Button
            variant="primary"
            className="mt-2 mr-2"
            onClick={handleSendSensor}
          >
            {sensor.id ? "Editar" : "Cadastrar"}
          </Button>
          <Button
            variant="primary"
            className="mt-2"
            onClick={() =>
              setSensor({
                id: "",
                name: "",
                function: "",
                value: "",
              })
            }
          >
            Limpar
          </Button>
        </div>
      </div>
      <ListSensor setSensor={setSensor} onDelete={handleDeleteSensor} data={data}/>
    </div>
  );
}
