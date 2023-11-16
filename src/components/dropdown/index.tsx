"use client";
import { useState, useEffect } from "react";
import { Select, Option } from "@material-tailwind/react";
import badgeColors from "@material-tailwind/react/theme/components/badge/badgeColors";



export default function Dropdown() {
  return (
    <div className="w-72">
      <Select
        className="text-blue-gray-200"
        label="Atribuir foguete ao"
        color="blue-gray"
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <Option>Sensor 1</Option>
        <Option>Sensor 2</Option>
        <Option>Sensor 3</Option>
      </Select>
    </div>
  );
}
