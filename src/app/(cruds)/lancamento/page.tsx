"use client";

import { useState } from "react";
import { Button, Header, Input, Select } from "../../components/uikit";
import axios from "axios";
import { useQuery } from "react-query";

import { toast } from "react-toastify";
import ListLaunch from "./listLaunch";
import { Launch } from "@/app/types/crud";

export default function Lancamento() {
  const [launch, setLaunch] = useState<Launch>({
    id: "",
    name: "",
    waterVolume: "",
    distance: "",
    weight: "",
    speed: "",
    pressure: "",
    angle: "",
    height: "",
    instantAcceleration: "",
    rocketId: "",
  });

  let {
    data: dataLaunch,
    refetch: refetchLaunch,
    isLoading: isLoadingLaunch,
  } = useQuery({
    queryKey: ["launch"],
    staleTime: 300,
    queryFn: () =>
      axios
        .get(`https://pi1-foguete-backend.vercel.app/launch`)
        .then((res) => res.data),
  });

  let { data: dataRocket, isLoading: isLoadingRocket } = useQuery({
    queryKey: ["rocket"],
    staleTime: 300, // Refetch every 5 minutes
    queryFn: () =>
      axios
        .get(`https://pi1-foguete-backend.vercel.app/rocket`)
        .then((res) => res.data),
  });

  const handleSendLaunch = async () => {
    if (!launch.id) {
      const urlPostLaunch = `https://pi1-foguete-backend.vercel.app/launch`;

      try {
        await axios.post(urlPostLaunch, {
          name: launch.name,
          waterVolume: launch.waterVolume,
          distance: launch.distance,
          weight: launch.weight,
          speed: launch.speed,
          pressure: launch.pressure,
          angle: launch.angle,
          height: launch.height,
          instantAcceleration: launch.instantAcceleration,
          rocketId: launch.rocketId,
        });
        toast.success("Lançamento cadastrado com sucesso.");
      } catch (e) {
        toast.error("Erro ao cadastrar lançamento.");
      }
    } else {
      const urlPutLaunch = `https://pi1-foguete-backend.vercel.app/launch/${launch.id}`;
      try {
        await axios.put(urlPutLaunch, {
          name: launch.name,
          waterVolume: launch.waterVolume,
          distance: launch.distance,
          weight: launch.weight,
          speed: launch.speed,
          pressure: launch.pressure,
          angle: launch.angle,
          height: launch.height,
          instantAcceleration: launch.instantAcceleration,
          rocketId: launch.rocketId,
        });
        toast.success("Lançamento editado com sucesso.");
      } catch (e) {
        toast.error("Erro ao editar lançamento.");
      }
    }

    resetLaunch();
    await refetchLaunch();
  };

  const handleDeleteLaunch = async (launchId: string) => {
    const urlDeleteLaunch = `https://pi1-foguete-backend.vercel.app/launch/${launchId}`;

    try {
      await axios.delete(urlDeleteLaunch);
      toast.success("Lançamento deletado com sucesso.");
    } catch (e) {
      toast.error("Erro ao deletar Lançamento.");
    }

    resetLaunch();
    await refetchLaunch();
  };

  const resetLaunch = () => {
    setLaunch({
      id: "",
      name: "",
      waterVolume: "",
      distance: "",
      weight: "",
      speed: "",
      pressure: "",
      angle: "",
      height: "",
      instantAcceleration: "",
      rocketId: "",
    });
  };

  return (
    <div className=" bg-gray-300 flex flex-col gap-2">
      <Header size={5} className="text-black self-center">
        Gerenciamento De Lançamento
      </Header>
      <div className="min-w-full flex flex-row justify-center gap-16">
        <div className="w-2/5 flex flex-col ">
          <Input
            label="ID"
            value={launch.id}
            disabled={true}
            placeholder="Gerado automaticamente..."
            className="text-gray-300"
          />
          <Input
            label="Nome"
            value={launch.name}
            onChange={(e) =>
              setLaunch((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Input
            label="Volume de água"
            value={launch.waterVolume}
            onChange={(e) =>
              setLaunch((prev) => ({ ...prev, waterVolume: e.target.value }))
            }
          />
          <Input
            label="Distância"
            value={launch.distance}
            onChange={(e) =>
              setLaunch((prev) => ({ ...prev, distance: e.target.value }))
            }
          />
          <Input
            label="Peso"
            value={launch.weight}
            onChange={(e) =>
              setLaunch((prev) => ({ ...prev, weight: e.target.value }))
            }
          />
        </div>
        <div className="w-2/5 flex flex-col">
          <Input
            label="Velocidade"
            value={launch.speed}
            onChange={(e) =>
              setLaunch((prev) => ({ ...prev, speed: e.target.value }))
            }
          />
          <Input
            label="Pressão"
            value={launch.pressure}
            onChange={(e) =>
              setLaunch((prev) => ({ ...prev, pressure: e.target.value }))
            }
          />
          <Input
            label="Ângulo"
            value={launch.angle}
            onChange={(e) =>
              setLaunch((prev) => ({ ...prev, angle: e.target.value }))
            }
          />
          <Input
            label="Altitude"
            value={launch.height}
            onChange={(e) =>
              setLaunch((prev) => ({ ...prev, height: e.target.value }))
            }
          />
          <Input
            label="Aceleração instantânea"
            value={launch.instantAcceleration}
            onChange={(e) =>
              setLaunch((prev) => ({
                ...prev,
                instantAcceleration: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <div className=" w-full flex flex-col justify-center items-center ">
        <div className="  w-2/3 mb-4">
          <Select
            label="Foguetes"
            options={
              dataRocket?.map((rocket: any) => ({
                value: rocket.id,
                label: rocket.name,
              })) ?? []
            }
            value={launch.rocketId || ""}
            onChange={(rocketId) =>
              setLaunch({ ...(launch as Launch), rocketId })
            }
          />
        </div>
        <div className="flex w-full items-center justify-center gap-8 mb-12">
          <Button variant="primary" onClick={handleSendLaunch}>
            {launch.id ? "Editar" : "Cadastrar"}
          </Button>
          <Button variant="primary" onClick={resetLaunch}>
            Limpar
          </Button>
        </div>
      </div>
      <div className="w-full ">
        {!isLoadingLaunch && !isLoadingRocket && (
          <ListLaunch
            setLaunch={setLaunch}
            onDelete={handleDeleteLaunch}
            data={dataLaunch}
            rockets={dataRocket}
          />
        )}
      </div>
    </div>
  );
}
