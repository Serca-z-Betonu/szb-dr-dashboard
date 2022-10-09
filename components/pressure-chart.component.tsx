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
};

export default function PressureChart() {
  const { patientId } = useContext<PatientContextType>(PatientContext);

  const { data: minPressure, isLoading: minLoading } = useQuery(
    [patientId, metricType],
    async () => {
      const result = await fetchMetric(patientId, "BLOOD_PRESSURE_MIN");
      return result;
    }
  );
  const { data: maxPressure, isLoading: maxLoading } = useQuery(
    [patientId, metricType],
    async () => {
      const result = await fetchMetric(patientId, "BLOOD_PRESSURE_MAX");
      return result;
    }
  );

  if (minLoading || maxLoading) {
    return <div></div>;
  }

  for (min of minPressure) {
    for ()
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
            callback: function (label) {
              let realLabel = this.getLabelForValue(label);
              const month = realLabel.split(";")[0];
              const year = realLabel.split(";")[1];
              return month;
            },
          },
          xAxis2: {
            type: "MaxPressure",
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              callback: function (label) {
                let realLabel = this.getLabelForValue(label);

                const month = realLabel.split(";")[0];
                const year = realLabel.split(";")[1];
                if (year) {
                  return year;
                } else {
                  return "";
                }
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
      },
    };

  const chartData = {
    labels: minPressure.forE,
    datasets: [
      {
        data: minPressure!.samples,
        borderColor: "hsl(345deg, 74%, 40%)",
        backgroundColor: "hsl(345deg, 74%, 40%)",
        borderDash: [5, 5],
        pointRadius: 6,
      },
      {
        data: maxPressure!.samples,
        borderColor: "hsl(345deg, 74%, 80%)",
        backgroundColor: "hsl(345deg, 74%, 20%)",
        borderDash: [5, 5],
        pointRadius: 6,
      },
    ],
  };

  return (
    <div className="w-3/4 mx-auto">
      <Line options={options} data={chartData} />
    </div>
  );
}
