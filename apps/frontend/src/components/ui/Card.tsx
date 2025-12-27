import React from "react";

type CardProps = {
    id: number;
    selected?: number;
    setSelected?: (id: number) => void;
    title: string;
    description: string;
};

const Card = ({ id, selected, setSelected, title, description }: CardProps) => {
  const isSelected = selected === id;

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        setSelected?.(id);
      }}
      className={`block max-w-sm p-6 border rounded-lg shadow-sm transition
            ${isSelected
      ? "bg-blue-900 border-blue-500"
      : "bg-gray-800 border-gray-700 hover:bg-gray-700"}`}
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
        {title}
      </h5>
      <p className="font-normal text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default Card;
