"use client";

import { Button, Table } from "../../components/uikit";
import { Rocket, Sensor } from "@/app/types/crud";

type Props = {
  setRocket: any;
  onDelete: (id: string) => void;
  data: any;
  sensors: any;
};

export default function ListRocket({
  setRocket,
  data,
  sensors,
  onDelete,
}: Props) {
  const sensorsFiltered = data.map((rocket: Rocket) => {
    const linkedSensors = rocket.sensors
      .map((sensorId) =>
        sensors.find((sensor: Sensor) => sensor.id === sensorId)
      )
      .filter((sensor) => sensor !== undefined);
    return {
      ...rocket,
      newSensors: linkedSensors,
    };
  });

  return (
    <>
      <Table
        data={sensorsFiltered || []}
        columns={[
          {
            key: "name",
            title: "Nome",
            render: (rocket: any) => rocket.name,
          },
          {
            key: "material",
            title: "Material",
            render: (rocket: any) => rocket.material,
          },
          {
            key: "sensor",
            title: "Sensores",
            render: (rocket: any) =>
              rocket.newSensors.map((sensor: Sensor) => (
                <ul className="text-sm">
                  <li>· {sensor.name}</li>
                </ul>
              )),
          },
          {
            key: "actions",
            title: "Ações",
            render: (rocket: any) => (
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  onClick={() =>
                    setRocket({
                      id: rocket.id,
                      name: rocket.name,
                      material: rocket.material,
                      sensors: rocket.sensors,
                    })
                  }
                >
                  Editar
                </Button>
                <Button variant="danger" onClick={() => onDelete(rocket.id)}>
                  Excluir
                </Button>
              </div>
            ),
          },
        ]}
      />
    </>
  );
}
