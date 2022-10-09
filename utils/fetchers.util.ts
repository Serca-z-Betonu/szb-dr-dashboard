import {
  DrugAllType,
  DrugType,
  HistoryType,
  PatientPreviewType,
  PatientType,
  PrescriptionType,
} from "./types.util";

const API_URL = "http://54.93.191.75:8090";

export const fetchPatients = async () => {
  const result = await fetch(`${API_URL}/patients`);
  const patient = (await result.json()) as PatientPreviewType[];
  return patient;
};

export const fetchDrugsAll = async () => {
  const result = await fetch(`${API_URL}/drugs`);
  const drugs = (await result.json()) as DrugAllType[];
  return drugs;
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
  samples = samples.map((sample: any) => sample.value);

  return { timestamps, samples };
};

export const postPrescriptions = async (patientId: string, body: any) => {
  const result = await fetch(
    `${API_URL}/prescriptions?` +
      new URLSearchParams({
        patient_id: patientId,
      }),
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return result;
};

export const postAlert = async (patientId: string, body: any) => {
  const result = await fetch(
    `${API_URL}/medical-alerts?` +
      new URLSearchParams({
        patient_id: patientId,
      }),
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return result;
};
