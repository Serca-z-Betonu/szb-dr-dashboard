import Link from "next/link";
import { PatientPreviewType } from "../utils/types.util";
import Header from "./header.component";

type Props = {
  patient: PatientPreviewType;
  children?: JSX.Element[] | JSX.Element;
};

export default function PatientPreview({ patient }: Props) {
  const color = `rgb(${Math.round(255 * patient.health_state)},0,0)`;

  return (
    <Link href={`patients/${patient.patient_id}`}>
      <a className="group bg-gray-200 rounded-lg shadow-md border-2 w-full h-32 p-2 border-teal-400 grid grid-cols-[1fr_100px] hover:opacity-50">
        <span className="material-icons-outlined text-5xl text-teal-900">
          {patient.sex === "MALE" ? "face_6" : "face_3"}
        </span>
        <div className="row-span-2 grid place-items-center">
          <span style={{ color }} className="material-icons-outlined text-7xl">
            favorite
          </span>
          <p className="absolute text-white pb-1">
            {Math.round(100 * patient.health_state)}%
          </p>
        </div>
        <div className="">
          <p className="text-sm w-max">Imię: {patient.name}</p>
          <p className="text-sm w-max">Nazwisko: {patient.surname}</p>
        </div>
      </a>
    </Link>
  );
}
