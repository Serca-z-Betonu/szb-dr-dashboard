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
