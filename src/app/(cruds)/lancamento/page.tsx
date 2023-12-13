"use client";

import { useState } from "react";
import { Button, Header, Input, Select } from "../../components/uikit";
import axios from "axios";
import { useQuery } from "react-query";

import { toast } from "react-toastify";
import ListLaunch from "./listLaunch";
import { Launch } from "@/app/types/crud";
import Modal from "react-modal";

import { formatDate } from "@/app/utils/functions";

export default function Lancamento() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [file, setFile] = useState<File>();

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : undefined;

    if (file) {
      // Verifica se o arquivo é um .txt
      if (file.name.endsWith(".txt") || file.type === "text/plain") {
        setFile(file);
      } else {
        toast.error("Por favor, selecione um arquivo .txt.");
        setFile(undefined); // Atualizado para undefined em vez de null
      }
    } else {
      setFile(undefined); // Atualizado para undefined em vez de null
    }
  };

  const processLine = async (line: string) => {
    const regex = /Latitude: ([-\d.]+) Longitude: ([-\d.]+) Data \(GMT\): (.+?) Horario \(GMT\): (.+?) Altitude \(cm\): ([-\d.]+) Velocidade \(m\/s\): ([-\d.]+) Aceleracao \(m\/s\^2\): ([-\d.]+)/;
    const match = line.match(regex);

    if (match) {
        const altitude = Math.abs(parseFloat(match[5]));
        const velocidade = Math.abs(parseFloat(match[6]));
        const aceleracao = match[7] !== 'nan' && match[7] !== 'inf' ? Math.abs(parseFloat(match[7])) : null;

      const urlPostLaunch = `https://pi1-foguete-backend.vercel.app/launch`;

      try {
        await axios.post(urlPostLaunch, {
          date: formatDate(),
          waterVolume: 0,
          distance: 0,
          weight: 850,
          speed: velocidade,
          pressure: 0,
          angle: 45,
          height: altitude,
          instantAcceleration: aceleracao,
          rocketId: launch.rocketId,
        });
        await refetchLaunch();
      } catch (e) {
        toast.error("Erro ao cadastrar lançamento.");
      }
    }
  };

  const sendFile = async () => {
    if (!launch.rocketId) {
        toast.error("Selecione um foguete para concluir a ação.");
        return;
    }

    if (file) {
        const reader = new FileReader();

        reader.onload = async (e) => {
            const text = e.target?.result;
            const lines = text?.toString().split(/\r?\n/);

            let invalidLineCount = 0;

            lines?.forEach((line, index) => {
                // Utilizando o regex fornecido
                const regex = /Latitude: ([-\d.]+) Longitude: ([-\d.]+) Data \(GMT\): (.+?) Horario \(GMT\): (.+?) Altitude \(cm\): ([-\d.]+) Velocidade \(m\/s\): ([-\d.]+) Aceleracao \(m\/s\^2\): ([-\d.]+)/;
                const match = line.match(regex);

                if (!match) {
                    console.error(`Linha ${index + 1} inválida: ${line}`);
                    invalidLineCount++;
                } else {
                    // Processa a linha válida
                    processLine(line);
                }
            });

            if (invalidLineCount > 0) {
                toast.warn(`${invalidLineCount} linha(s) inválida(s) foram ignoradas.`);
            }
            
            toast.success("Lançamentos válidos foram cadastrados com sucesso.");
            
            handleCloseModal();
            await refetchLaunch();
        };

        reader.readAsText(file);
    }
};

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: { zIndex: 1000 },
  };

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
    setFile(undefined);
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
          <Button variant="success" onClick={() => setModalIsOpen(true)}>
            Carregar arquivo
          </Button>
          <Button variant="danger" onClick={resetLaunch}>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
      >
        <div className="mb-4">
          <label
            htmlFor="fileInput"
            className="w-full cursor-pointer inline-block px-4 py-2 text-center border-green-600 text-gray-100 bg-green-600 hover:text-white hover:bg-green-700 hover:border-green-700 focus:bg-green-700 focus:border-green-700' rounded"
          >
            Clique aqui para selecionar um arquivo a ser enviado
          </label>

          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-black flex justify-center mt-1">
            Arquivo selecionado:{" "}
            <span className="text-black ml-2">{file?.name}</span>
          </p>
          <div className=" w-full flex flex-col justify-center items-center mt-2">
            <Select
              className="w-full p-2 "
              placeholder="Selecione um foguete.."
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
          <div className="flex justify-center gap-2">
            <Button variant="primary" onClick={sendFile} disabled={!file?.name}>
              Enviar arquivo
            </Button>

            <Button variant="danger" onClick={resetLaunch}>
              Limpar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
