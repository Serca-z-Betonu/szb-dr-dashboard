import { useState } from "react";

export function Tabs() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabsData = [
    { label: "Wykresy", component: <p>fajnie</p> },
    { label: "Leki", component: <p>gitara</p> },
    { label: "Historia Leczenia", component: <p>hisotria leczenia</p> },
  ];
  return (
    <div>
      <div className="flex space-x-3">
        {tabsData.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`py-2 flex-1 shadow-md rounded-lg transition-colors duration-300 ${
                idx === activeTabIndex
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTabIndex(idx)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="py-4">{tabsData[activeTabIndex].component}</div>
    </div>
  );
}
