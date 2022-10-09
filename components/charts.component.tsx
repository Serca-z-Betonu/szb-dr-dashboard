import LineChart from "./line-chart.component";
import PressureChart from "./pressure-chart.component";

export default function Charts() {
  return (
    <div className="grid grid-cols-2 grid-rows-[fit-content_1fr] gap-4">
      <LineChart
        metricType="HEARTRATE"
        yLabel="tętno [bpm]"
        title="Tętno"
        colorPart="hsl(345deg, 74%,"
      />
      <LineChart
        metricType="WEIGHT"
        yLabel="waga [kg]"
        title="Waga"
        colorPart="hsl(115deg, 60%,"
      />
      <PressureChart />
    </div>
  );
}
