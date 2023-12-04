"use client";

import { useState } from "react";
import { Button, Header, Input, Select } from "../../components/uikit";
import axios from "axios";
import { useQuery } from "react-query";

import { toast } from "react-toastify";
import ListLaunch from "./listLaunch";
import { Launch } from "@/app/types/crud";

import { formatDate } from "@/app/utils/functions";
import { Box, Modal, Typography } from "@mui/material";

export default function Lancamento() {
  const [launch, setLaunch] = useState<Launch>({
    id: "",
    date: "",
    waterVolume: "",
    distance: "",
    weight: "",
    speed: "",
    pressure: "",
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
    if (
      !launch.waterVolume ||
      !launch.distance ||
      !launch.height ||
      !launch.speed ||
      !launch.pressure ||
      !launch.instantAcceleration ||
      !launch.rocketId
    ) {
      toast.error("Todos os campos devem ser preenchidos.");
      return;
    }

    if (!launch.id) {
      const urlPostLaunch = `https://pi1-foguete-backend.vercel.app/launch`;

      try {
        await axios.post(urlPostLaunch, {
          date: formatDate(),
          waterVolume: launch.waterVolume,
          distance: launch.distance,
          weight: 750 + Number(launch.waterVolume),
          speed: launch.speed,
          pressure: launch.pressure,
          angle: 45,
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
          waterVolume: launch.waterVolume,
          distance: launch.distance,
          weight: 750 + Number(launch.waterVolume),
          speed: launch.speed,
          pressure: launch.pressure,
          angle: 45,
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
      date: "",
      waterVolume: "",
      distance: "",
      weight: "",
      speed: "",
      pressure: "",
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
            id="vol"
            label="Volume de água (ML)"
            value={launch.waterVolume}
            onChange={(e) =>
              setLaunch((prev) => ({ ...prev, waterVolume: e.target.value }))
            }
            validation={{
              fn: (value) => {
                // Verifica se o valor está no formato de número inteiro ou decimal
                if (!/^\d+(\.\d+)?$/.test(value)) {
                  setLaunch((prev) => ({ ...prev, waterVolume: "" }));

                  return {
                    message: "Informe um valor válido.",
                  };
                }

                return null;
              },
              on: "blur",
            }}
          />
          <Input
            id="dist"
            label="Distância (Metros)"
            value={launch.distance}
            onChange={(e) =>
              setLaunch((prev) => ({ ...prev, distance: e.target.value }))
            }
            validation={{
              fn: (value) => {
                // Verifica se o valor está no formato de número inteiro ou decimal
                if (!/^\d+(\.\d+)?$/.test(value)) {
                  setLaunch((prev) => ({ ...prev, distance: "" }));

                  return {
                    message: "Informe um valor válido.",
                  };
                }

                return null;
              },
              on: "blur",
            }}
          />
          <Input
            id="alt"
            label="Altitude (Metros)"
            value={launch.height}
            onChange={(e) =>
              setLaunch((prev) => ({ ...prev, height: e.target.value }))
            }
            validation={{
              fn: (value) => {
                // Verifica se o valor está no formato de número inteiro ou decimal
                if (!/^\d+(\.\d+)?$/.test(value)) {
                  setLaunch((prev) => ({ ...prev, height: "" }));

                  return {
                    message: "Informe um valor válido.",
                  };
                }

                return null;
              },
              on: "blur",
            }}
          />
        </div>
        <div className="w-2/5 flex flex-col">
          <Input
            id="vel"
            label="Velocidade (m/s)"
            value={launch.speed}
            onChange={(e) =>
              setLaunch((prev) => ({ ...prev, speed: e.target.value }))
            }
            validation={{
              fn: (value) => {
                // Verifica se o valor está no formato de número inteiro ou decimal
                if (!/^\d+(\.\d+)?$/.test(value)) {
                  setLaunch((prev) => ({ ...prev, speed: "" }));

                  return {
                    message: "Informe um valor válido.",
                  };
                }

                return null;
              },
              on: "blur",
            }}
          />
          <Input
            id="psi"
            label="Pressão (PSI)"
            value={launch.pressure}
            onChange={(e) =>
              setLaunch((prev) => ({ ...prev, pressure: e.target.value }))
            }
            validation={{
              fn: (value) => {
                // Verifica se o valor está no formato de número inteiro ou decimal
                if (!/^\d+(\.\d+)?$/.test(value)) {
                  setLaunch((prev) => ({ ...prev, pressure: "" }));

                  return {
                    message: "Informe um valor válido.",
                  };
                }

                return null;
              },
              on: "blur",
            }}
          />
          <Input
            label="Aceleração (m/s²)"
            value={launch.instantAcceleration}
            onChange={(e) =>
              setLaunch((prev) => ({
                ...prev,
                instantAcceleration: e.target.value,
              }))
            }
            validation={{
              fn: (value) => {
                // Verifica se o valor está no formato de número inteiro ou decimal
                if (!/^\d+(\.\d+)?$/.test(value)) {
                  setLaunch((prev) => ({ ...prev, instantAcceleration: "" }));

                  return {
                    message: "Informe um valor válido.",
                  };
                }

                return null;
              },
              on: "blur",
            }}
          />
        </div>
      </div>
      <div className=" w-full flex flex-col justify-center items-center ">
        <Select
          className="w-full p-2 -mt-4"
          label="Foguete"
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

      <div className=" w-full flex flex-col justify-center items-center ">
        <div className="flex w-full items-center justify-center gap-8 mb-12">
          <Button variant="primary" onClick={handleSendLaunch}>
            {launch.id ? "Editar" : "Cadastrar"}
          </Button>
          <Button variant="primary" onClick={resetLaunch}>
            Limpar
          </Button>
          <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
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
