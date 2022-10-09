// @ts-nocheck
import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { fetchMetric } from "../utils/fetchers.util";
import { useContext } from "react";
import { PatientContextType } from "../utils/types.util";
import { PatientContext } from "./tabs.component";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip
);

type Props = {
  metricType: string;
  yLabel: string;
  title: string;
};

export default function PressureChart() {
  const { patientId } = useContext<PatientContextType>(PatientContext);

  const { data: minData, isLoading: minLoading } = useQuery(
    [patientId, "BLOOD_PRESSURE_MIN"],
    async () => {
      const result = await fetchMetric(patientId, "BLOOD_PRESSURE_MIN");
      return result;
    }
  );
  const { data: maxData, isLoading: maxLoading } = useQuery(
    [patientId, "BLOOD_PRESSURE_MAX"],
    async () => {
      const result = await fetchMetric(patientId, "BLOOD_PRESSURE_MAX");
      return result;
    }
  );

  if (minLoading || maxLoading) {
    return <div></div>;
  }

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        title: {
          display: true,
          text: "Data",
        },
        ticks: {
          callback: function (value) {
            const formatter = new Intl.DateTimeFormat("pl-PL", {
              dateStyle: "medium",
            });
            return formatter.format(new Date(value));
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Ciśnienie [mm Hg]",
        },
        min: 50,
        max: 200,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const labels =
    minData!.timestamps.length > maxData!.timestamps.length
      ? minData!.timestamps
      : maxData!.timestamps;

  const chartData = {
    labels,
    datasets: [
      {
        label: "Minimalne",
        data: minData!.samples,
        borderColor: "hsl(200deg, 74%, 40%)",
        backgroundColor: "hsl(200deg, 74%, 30%)",

        borderDash: [5, 5],
        pointRadius: 6,
      },
      {
        label: "Maksymalne",
        data: maxData!.samples,
        borderColor: "hsl(345deg, 74%, 80%)",
        backgroundColor: "hsl(345deg, 74%, 40%)",
        borderDash: [5, 5],
        pointRadius: 6,
      },
    ],
  };

  return (
    <div className="col-span-2">
      <Line options={options} data={chartData} />
    </div>
  );
}
