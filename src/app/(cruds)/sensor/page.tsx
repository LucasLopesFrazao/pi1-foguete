"use client";

import { useState } from "react";
import { Button, Header, Input } from "../../components/uikit";
import axios from "axios";
import { useQuery } from "react-query";

import { toast } from "react-toastify";
import ListSensor from "./listSensor";

export default function Sensor() {
  const [sensor, setSensor] = useState({
    id: "",
    name: "",
    function: "",
    value: "",
  });

  let { data, refetch } = useQuery({
    queryKey: ["sensor"],
    staleTime: 300, // Refetch every 5 minutes
    queryFn: () =>
      axios
        .get(`https://pi1-foguete-backend.vercel.app/sensor`)
        .then((res) => res.data),
  });

  const handleSendSensor = async () => {
    if (!sensor.name || !sensor.function || !sensor.value) {
      toast.error("Todos os campos devem ser preenchidos.");
      return;
    }

    if (!sensor.id) {
      const urlPostSensor = `https://pi1-foguete-backend.vercel.app/sensor`;

      try {
        await axios.post(urlPostSensor, {
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
        await axios.put(urlPutSensor, {
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
    await refetch();
  };

  const handleDeleteSensor = async (sensorId: string) => {
    const urlDeleteSensor = `https://pi1-foguete-backend.vercel.app/sensor/${sensorId}`;

    try {
      await axios.delete(urlDeleteSensor);
      toast.success("Sensor deletado com sucesso.");
    } catch (e) {
      toast.error("Erro ao deletar sensor.");
    }

    resetSensor();
    await refetch();
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
    <div className="bg-gray-300 flex flex-col gap-2">
      <Header size={5} className="text-black self-center">
        Gerenciamento De Sensores
      </Header>
      <div>
        <div>
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
            label="Valor (R$)"
            value={sensor.value}
            onChange={(e) =>
              setSensor((prev) => ({ ...prev, value: e.target.value }))
            }
            validation={{
              fn: (value) => {
                // Verifica se o valor está no formato correto
                if (!/^R?\$?\s?\d{1,3}(\.\d{3})*(\d{2})?$/.test(value)) {
                  setSensor((prev) => ({ ...prev, value: "" }));

                  return {
                    message:
                      "Informe um valor válido no formato R$ 999.999,99.",
                  };
                }

                return null;
              },
              on: "blur",
            }}
          />
          <div className="flex justify-around">
            <Button variant="primary" onClick={handleSendSensor}>
              {sensor.id ? "Editar" : "Cadastrar"}
            </Button>
            <Button
              variant="primary"
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
      </div>
      <div>
        <ListSensor
          setSensor={setSensor}
          onDelete={handleDeleteSensor}
          data={data}
        />
      </div>
    </div>
  );
}
