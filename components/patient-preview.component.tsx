import Link from "next/link";
import { PatientPreviewType } from "../utils/types.util";
import Header from "./header.component";

type Props = {
  patient: PatientPreviewType;
  children?: JSX.Element[] | JSX.Element;
};

export default function PatientPreview({ patient }: Props) {
  return (
    <Link href={`patients/${patient.patient_id}`}>
      <a className="group bg-gray-200 rounded-lg shadow-md border-2 w-full h-32 p-2 border-teal-400 grid grid-cols-[1fr_100px] hover:opacity-50">
        <span className="material-icons text-5xl text-teal-900">
          account_circle
        </span>
        <div className="row-span-2 grid place-items-center">
          <span className="material-icons-outlined text-5xl">favorite</span>
        </div>
        <div className="">
          <p className="text-sm w-max">Imię: {patient.name}</p>
          <p className="text-sm w-max">Nazwisko: {patient.surname}</p>
        </div>
      </a>
    </Link>
  );
}
