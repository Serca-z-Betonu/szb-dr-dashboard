import {
  DrugType,
  HistoryType,
  PatientPreviewType,
  PatientType,
} from "./types.util";
import { formatStringsToDatesChart } from "./functions.util";

const API_URL = "http://192.168.137.247:8090";

export const fetchPatients = async () => {
  const result = await fetch(`${API_URL}/patients`);
  const patient = (await result.json()) as PatientPreviewType;
  return patient;
};

export const fetchPatient = async (patientId: number) => {
  const result = await fetch(`${API_URL}/patients/${patientId}`);
  const patient = (await result.json()) as PatientType;
  return patient;
};

export const fetchDrugs = async (patientId: string) => {
  const result = await fetch(
    `${API_URL}/prescriptions?` +
      new URLSearchParams({
        patient_id: patientId,
      })
  );
  const drugs = (await result.json()) as DrugType[];
  return drugs;
};

export const fetchHistory = async (patientId: string) => {
  const result = await fetch(
    `${API_URL}/history?` +
      new URLSearchParams({
        patient_id: patientId,
      })
  );
  const histories = (await result.json()) as HistoryType[];
  return histories;
};

export const fetchMetric = async (patientId: string, metricType: string) => {
  const result = await fetch(
    `${API_URL}/metrics?` +
      new URLSearchParams({
        patient_id: patientId,
        metric_type: metricType,
      })
  );
  let { samples } = await result.json();

  let timestamps = samples.map((sample: any) => sample.timestamp) as string[];
  timestamps = formatStringsToDatesChart(timestamps);
  samples = samples.map((sample: any) => sample.value);

  return { timestamps, samples };
};
