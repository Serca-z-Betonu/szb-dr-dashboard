import { PatientPreviewType, PatientType } from "./types.util";

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
