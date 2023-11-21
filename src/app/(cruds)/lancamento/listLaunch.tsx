"use client";

import { Button, Table } from "../../components/uikit";
import { Rocket, Launch } from "@/app/types/crud";

type Props = {
  setLaunch: any;
  onDelete: (id: string) => void;
  data: any;
  rockets: any;
};

export default function ListLaunch({
  setLaunch,
  data,
  rockets,
  onDelete,
}: Props) {
  const rocketFiltered = data.map((launch: Launch) => {
    if (Array.isArray(launch.rockets)) {
      const linkedRockets = launch.rockets
        .map((rocketId) =>
          rockets.find((rocket: Rocket) => rocket.id === rocketId)
        )
        .filter((rocket) => rocket !== undefined);
      return {
        ...launch,
        newRockets: linkedRockets,
      };
    } else {
      return launch;
    }
  });

  return (
    <Table
      data={rocketFiltered || []}
      columns={[
        {
          key: "name",
          title: "Nome",
          render: (launch: any) => launch.name,
        },
        {
          key: "waterVolume",
          title: "Volume de água",
          render: (launch: any) => launch.waterVolume,
        },
        {
          key: "distance",
          title: "Distância",
          render: (launch: any) => launch.distance,
        },
        {
          key: "weight",
          title: "Peso",
          render: (launch: any) => launch.weight,
        },
        {
          key: "speed",
          title: "Velocidade",
          render: (launch: any) => launch.speed,
        },
        {
          key: "pressure",
          title: "Pressão",
          render: (launch: any) => launch.pressure,
        },
        {
          key: "angle",
          title: "Ângulo",
          render: (launch: any) => launch.angle,
        },
        {
          key: "height",
          title: "Altitude",
          render: (launch: any) => launch.height,
        },
        {
          key: "instantAcceleration",
          title: "Velocidade instantânea",
          render: (launch: any) => launch.instantAcceleration,
        },
        {
          key: "actions",
          title: "Ações",
          render: (launch: any) => (
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={() =>
                  setLaunch({
                    id: launch.id,
                    name: launch.name,
                    waterVolume: launch.waterVolume,
                    distance: launch.distance,
                    weight: launch.weight,
                    speed: launch.speed,
                    pressure: launch.pressure,
                    angle: launch.angle,
                    height: launch.height,
                    instantAcceleration: launch.instantAcceleration,
                  })
                }
              >
                Editar
              </Button>
              <Button variant="primary" onClick={() => onDelete(launch.id)}>
                Excluir
              </Button>
            </div>
          ),
        },
      ]}
    />
  );
}
