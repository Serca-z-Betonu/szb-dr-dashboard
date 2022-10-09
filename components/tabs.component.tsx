import { useState } from "react";
import Charts from "./charts.component";
import Drugs from "./drugs.component";
import History from "./history.component";

export function Tabs() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabsData = [
    { label: "Wykresy", component: <Charts /> },
    { label: "Aktualne leki", component: <Drugs /> },
    { label: "Historia leczenia", component: <History /> },
  ];
  return (
    <div>
      <div className="flex space-x-3">
        {tabsData.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`py-2 flex-1 shadow-md rounded-lg transition-colors duration-300 hover:opacity-75 ${
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
      <div className="py-8">{tabsData[activeTabIndex].component}</div>
    </div>
  );
}
