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
import 'chartjs-adapter-moment';
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
  Tooltip,
  Legend
);

type Props = {
  metricType: string;
  yLabel: string;
  title: string;
};

export default function LineChart({ metricType, yLabel, title }: Props) {
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
          unit: "day"
        },
        title: {
          display: true,
          text: "Data",
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
      /* title: {
        display: true,
        text: "Bicie serca",
      }, */
    },
  };

  const chartData = {
    labels: data!.timestamps,
    datasets: [
      {
        label: title,
        data: data!.samples,
        borderColor: "hsl(345deg, 74%, 80%)",
        backgroundColor: "hsl(345deg, 74%, 40%)",
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
