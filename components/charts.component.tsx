import LineChart from "./line-chart.component";

export default function Charts() {
  return (
    <div className="flex flex-col gap-8">
      <LineChart metricType="HEARTRATE" yLabel="tętno [bpm]" title="Tętno" />
      <LineChart metricType="WEIGHT" yLabel="waga [kg]" title="Waga" />
    </div>
  );
}
