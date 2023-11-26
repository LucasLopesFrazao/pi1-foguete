"use client";

import { useState } from "react";
import { Button, Header, Input, Select } from "../../components/uikit";
import axios from "axios";
import { useQuery } from "react-query";

import { toast } from "react-toastify";
import ListRocket from "./listRocket";
import { Rocket } from "@/app/types/crud";


export default function Foguete() {
  const [rocket, setRocket] = useState<Rocket>({
    id: "",
    name: "",
    material: "",
    sensors: [],
  });

  let {
    data: dataRocket,
    refetch: refetchRocket,
    isLoading: isLoadingRocket,
  } = useQuery({
    queryKey: ["rocket"],
    staleTime: 300, // Refetch every 5 minutes
    queryFn: () =>
      axios
        .get(`https://pi1-foguete-backend.vercel.app/rocket`)
        .then((res) => res.data),
  });

  let { data: dataSensor, isLoading: isLoadingSensor } = useQuery({
    queryKey: ["sensor"],
    staleTime: 300, // Refetch every 5 minutes
    queryFn: () =>
      axios
        .get(`https://pi1-foguete-backend.vercel.app/sensor`)
        .then((res) => res.data),
  });

  const handleSendRocket = async () => {
    if (!rocket.name || !rocket.material || rocket.sensors.length === 0) {
      toast.error("Todos os campos devem ser preenchidos.");
      return;
    }

    if (!rocket.id) {
      const urlPostRocket = `https://pi1-foguete-backend.vercel.app/rocket`;

      try {
        await axios.post(urlPostRocket, {
          name: rocket.name,
          material: rocket.material,
          sensorIds: rocket.sensors,
        });
        toast.success("Foguete cadastrado com sucesso.");
      } catch (e) {
        toast.error("Erro ao cadastrar foguete.");
      }
    } else {
      const urlPutRocket = `https://pi1-foguete-backend.vercel.app/rocket/${rocket.id}`;
      try {
        await axios.put(urlPutRocket, {
          name: rocket.name,
          material: rocket.material,
          sensors: rocket.sensors,
        });
        toast.success("Foguete editado com sucesso.");
      } catch (e) {
        toast.error("Erro ao editar foguete.");
      }
    }

    resetRocket();
    await refetchRocket();
  };

  const handleDeleteRocket = async (rocketId: string) => {
    const urlDeleteRocket = `https://pi1-foguete-backend.vercel.app/rocket/${rocketId}`;

    try {
      await axios.delete(urlDeleteRocket);
      toast.success("Foguete deletado com sucesso.");
    } catch (e) {
      toast.error("Erro ao deletar foguete.");
    }

    resetRocket();
    await refetchRocket();
  };

  const resetRocket = () => {
    setRocket({
      id: "",
      name: "",
      material: "",
      sensors: [],
    });
  };

  return (
    <div className="bg-gray-300 flex flex-col gap-2">
      <Header size={5} className="text-black self-center">
        Gerenciamento De Foguete
      </Header>
      <div>
        <div>
          <Input
            label="Nome"
            value={rocket.name}
            onChange={(e) =>
              setRocket((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Input
            label="Material"
            value={rocket.material}
            onChange={(e) =>
              setRocket((prev) => ({ ...prev, material: e.target.value }))
            }
          />
          <Select
            multiple
            label="Sensores"
            options={
              dataSensor?.map((sensor: any) => ({
                value: sensor.id,
                label: sensor.name,
              })) ?? []
            }
            value={rocket.sensors || []}
            onChange={(sensors) =>
              setRocket({ ...(rocket as Rocket), sensors })
            }
          />
          <div className="flex justify-around">
            <Button variant="primary" onClick={handleSendRocket}>
              {rocket.id ? "Editar" : "Cadastrar"}
            </Button>
            <Button variant="primary" onClick={resetRocket}>
              Limpar
            </Button>
          </div>
        </div>
      </div>
      <div>
        {!isLoadingRocket && !isLoadingSensor && (
          <ListRocket
            setRocket={setRocket}
            onDelete={handleDeleteRocket}
            data={dataRocket}
            sensors={dataSensor}
          />
        )}
      </div>
    </div>
  );
}
