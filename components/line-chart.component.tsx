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
  Title,
  Tooltip
);

type Props = {
  metricType: string;
  yLabel: string;
  title: string;
  colorPart: string;
};

export default function LineChart({
  metricType,
  yLabel,
  title,
  colorPart,
}: Props) {
  const { patientId } = useContext<PatientContextType>(PatientContext);

  const { data, isLoading } = useQuery([patientId, metricType], async () => {
    const result = await fetchMetric(patientId, metricType);
    return result;
  });

  if (isLoading) {
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
          text: yLabel,
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

  const chartData = {
    labels: data!.timestamps,
    datasets: [
      {
        label: title,
        data: data!.samples,
        borderColor: colorPart + "80%)",
        backgroundColor: colorPart + "40%)",
        borderDash: [5, 5],
        pointRadius: 6,
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={chartData} />
    </div>
  );
}
