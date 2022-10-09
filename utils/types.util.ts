export type PatientPreviewType = {
  patient_id: number;
  name: string;
  pesel: string;
  surname: string;
  health_state: number;
};

export type PatientType = {
  patient_id: number;
  name: string;
  surname: string;
  pesel: string;
  sex: string;
  birth_date: string;
  age: number;
  health_state: number;
};

export type DrugType = {
  drug_name: string;
  drug_unit: string;
  average_actual_daily_dosage: number;
  expected_daily_dosage: number;
  expires_at: string;
};

export type PatientContextType = {
  patientId: string;
};

export type HistoryType = {
  medical_event_type: "ADVISE" | "PROCEDURE";
  summary: string;
  description: string;
  timestamp: string;
};
