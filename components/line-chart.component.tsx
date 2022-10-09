// @ts-nocheck
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { fetchMetric } from "../utils/fetchers.util";
import { useContext } from "react";
import { PatientContext } from "../pages/patients/[patientId]";
import { PatientContextType } from "../utils/types.util";

ChartJS.register(
  CategoryScale,
  LinearScale,
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

  const { data, isLoading } = useQuery([metricType], async () => {
    const result = await fetchMetric(patientId, metricType);
    return result;
  });

  if (isLoading) {
    return <div></div>;
  }

  const options = {
    scales: {
      x: {
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
