"use client";

import { FaRocket, FaHockeyPuck, FaAvianex } from "react-icons/fa";

import { useRouter } from "next/navigation";

const CategoryCard = ({ icon, title, description }: any) => {
  const router = useRouter();

  const navigate = () => {
    let path = "";
    switch (icon) {
      case "sensores":
        path = "/sensor";
        break;
      case "foguetes":
        path = "/foguete";
        break;
      case "lancamentos":
        path = "/lancamento";
        break;
      default:
        return;
    }
    router.push(path);
  };

  const Icon = () => {
    switch (icon) {
      case "sensores":
        return (
          <FaHockeyPuck className="w-16 h-16 fill-gray-400 group-hover:fill-white" />
        );
      case "foguetes":
        return (
          <FaRocket className="w-16 h-16 fill-gray-400 group-hover:fill-white" />
        );
      case "lancamentos":
        return (
          <FaAvianex className="w-16 h-16 fill-gray-400 group-hover:fill-white" />
        );
      default:
        return null;
    }
  };

  return (
    <span
      onClick={navigate}
      className="cursor-pointer transition-all duration-1000 bg-white hover:bg-blue-500 hover:shadow-xl m-2 p-4 relative z-40 group"
    >
      <div className="absolute bg-blue-500/50 top-0 left-0 w-24 h-1 z-30 transition-all duration-200 group-hover:bg-white group-hover:w-1/2"></div>
      <div className="py-2 px-9 relative flex flex-col items-center">
        <Icon />
        <h3 className="mt-8 text-lg font-semibold text-black group-hover:text-white">
          {title}
        </h3>
        <p className="mt-4 text-base text-gray-600 group-hover:text-white">
          {description}
        </p>
      </div>
    </span>
  );
};

export default function Home() {
  const categories = [
    {
      icon: "sensores",
      title: "Sensores",
      description: "Gerencie os sensores",
      link: "#",
    },
    {
      icon: "foguetes",
      title: "Foguetes",
      description: "Gerencie os foguetes",
      link: "#",
    },
    {
      icon: "lancamentos",
      title: "Lançamentos",
      description: "Gerencie os lançamentos",
      link: "#",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 gap-2 mt-12 sm:grid-cols-3 lg:mt-20">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            icon={category.icon}
            title={category.title}
            description={category.description}
            link={category.link}
          />
        ))}
      </div>
    </>
  );
}
