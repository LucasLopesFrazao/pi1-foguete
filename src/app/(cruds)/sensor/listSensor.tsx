"use client";

import { Button, Table } from "../../components/uikit";

type Props = {
  setSensor: any;
  onDelete: (id: string) => void;
  data: any;
}

export default function ListSensor({setSensor, data, onDelete}: Props) {
  return (
    <>
      <Table
        data={data || []}
        columns={[
          {
            key: "name",
            title: "Nome",
            render: (sensor: any) => sensor.name,
          },
          {
            key: "desc",
            title: "Descrição",
            render: (sensor: any) => sensor.function,
          },
          {
            key: "price",
            title: "Preço",
            render: (sensor: any) => sensor.value,
          },
          {
            key: "actions",
            title: "Ações",
            render: (sensor: any) => (
              <div className="flex gap-2">
                <Button variant="primary" onClick={()=>setSensor(sensor)}>Editar</Button>
                <Button variant="danger" onClick={()=>onDelete(sensor.id)}>Excluir</Button>
              </div>
            ),
          },
        ]}
      />
    </>
  );
}
