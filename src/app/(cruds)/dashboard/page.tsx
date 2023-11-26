"use client";

import { Header } from "@/app/components/uikit";
import { Launch } from "@/app/types/crud";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";

function Dashboard() {
  let {
    data: dataLaunch,
    refetch: refetchLaunch,
    isLoading: isLoadingLaunch,
  } = useQuery({
    queryKey: ["launch"],
    staleTime: 300,
    queryFn: () =>
      axios
        .get<Launch[]>(`https://pi1-foguete-backend.vercel.app/launch`)
        .then((res) => res.data),
  });

  return (
    <>
      <div className="flex flex-col items-center">
        <Header size={4} className="text-black self-center">
          Distância e volume de água
        </Header>
        <BarChart
          width={500}
          height={300}
          data={dataLaunch}
          margin={{
            right: 50,
            left: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="distance" fill="#8884d8" />
          <Bar dataKey="waterVolume" fill="#82ca9d" />
        </BarChart>

        <Header size={4} className="text-black self-center">
          Altura e pressão
        </Header>
        <AreaChart
          width={500}
          height={300}
          data={dataLaunch}
          stackOffset="expand"
          margin={{
            right: 50,
            left: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="pressure"
            stackId="1"
            stroke="#0DB8EA"
            fill="#0DB8EA"
          />
          <Area
            type="monotone"
            dataKey="height"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>

        <Header size={4} className="text-black self-center">
          Velocidade e aceleração instantânea
        </Header>
        <LineChart
          width={500}
          height={300}
          data={dataLaunch}
          margin={{
            right: 50,
            left: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="speed"
            stroke="#5DADE2"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="instantAcceleration"
            stroke="#58D68D"
          />
        </LineChart>
      </div>
    </>
  );
}

export default Dashboard;
