import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { fetchDrugs } from "../utils/fetchers.util";
import { PatientContextType } from "../utils/types.util";
import DrugDialog from "./drug-dialog.component";
import Header from "./header.component";
import { PatientContext } from "./tabs.component";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export default function Drugs() {
  const { patientId } = useContext<PatientContextType>(PatientContext);
  const [drugDialogIsOpen, drugDialogSetIsOpen] = useState<boolean>(false);
  const { data: drugs, isLoading } = useQuery(
    [patientId, "drugs"],
    async () => {
      const result = await fetchDrugs(patientId);
      return result;
    }
  );

  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      <table className="table-auto mx-auto shadow-md border-2 border-t-8 border-teal-500">
        <thead>
          <tr>
            <th className="text-xl p-4 border-b-2 border-teal-500">Nazwa</th>
            <th className="text-xl p-4 border-b-2 border-teal-500">
              Brana dzienna dawka
            </th>
            <th className="p-4 text-xl border-b-2 border-teal-500">
              Spodziewana dzienna dawka
            </th>
            <th className="p-4 text-xl border-b-2 border-teal-500">Ważny do</th>
          </tr>
        </thead>
        <tbody>
          {drugs!.map((drug, idx) => (
            <tr key={idx} className="odd:bg-gray-200 even:bg-white">
              <td className="text-lg px-4">{drug.drug_name}</td>
              <td className="text-lg px-4">{`${
                drug.average_actual_daily_dosage
              } ${drug.drug_unit.toLowerCase()}`}</td>
              <td className="text-lg px-4">{`${
                drug.expected_daily_dosage
              } ${drug.drug_unit.toLowerCase()}`}</td>
              <td className="text-lg px-4">{drug.expires_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn flex mx-auto my-16"
        onClick={() => drugDialogSetIsOpen(true)}
      >
        Dodaj lek
      </button>
      <DrugDialog
        patientId={patientId}
        isOpen={drugDialogIsOpen}
        setIsOpen={drugDialogSetIsOpen}
      />
    </>
  );
}
