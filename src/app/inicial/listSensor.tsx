"use client";

import { useEffect, useState } from "react";
import { Button, Input, Table } from "../components/uikit";
import axios from "axios";

import { toast } from "react-toastify";

export default function ListSensor() {
  const urlSensor = `https://pi1-foguete-backend.vercel.app/sensor`;

  const [sensor, setSensor] = useState([
    {
      name: "",
      function: "",
      value: "",
    },
  ]);

  useEffect(() => {
    const fetchSensor = async () => {
      const response = await axios.get(urlSensor);
      console.log(response);
      setSensor(response.data);
      toast.success("Sensor cadastrado com sucesso.");
    };

    fetchSensor().catch(console.error);
  }, []);

  return (
    <>
      <Table
        data={sensor || []}
        columns={[
          {
            key: "name",
            title: "Nome",
            render: (sensor) => sensor.name,
          },
          {
            key: "desc",
            title: "descricao",
            render: (sensor) => sensor.function,
          },
          {
            key: "price",
            title: "Preço (R$)",
            render: (sensor) => sensor.value,
          },
          {
            key: "actions",
            title: "Ações",
            render: (dcp) => (
              <div className="flex justify-around">
                <Button variant="primary">Editar</Button>
                <Button variant="primary">Excluir</Button>
              </div>
            ),
          },
        ]}
      />
    </>
  );
}
