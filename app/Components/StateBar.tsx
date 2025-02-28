import React from "react";

interface StatBarProps {
  statName: string;
  value: number;
  maxValue?: number;
  color?: string;
}

const StatBar: React.FC<StatBarProps> = ({
  statName,
  value,
  maxValue = 255
}) => {

  // Format stat name to be more readable
  const formatStatName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const percentage = Math.min((value / maxValue) * 100, 100);
  console.log(percentage)

  // Determine color based on stat value
  const getStatColor = (statName: string, value: number): string => {
    if (value >= 120) return "bg-green-500";
    if (value >= 90) return "bg-teal-500";
    if (value >= 60) return "bg-blue-500";
    if (value >= 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  const barColor = getStatColor(statName, value);

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">
          {formatStatName(statName)}
        </span>
        <span className="text-sm font-medium text-gray-900">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`${barColor} h-2.5 rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatBar;