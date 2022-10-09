import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { fetchHistory } from "../utils/fetchers.util";
import { formatStringToDateChart } from "../utils/functions.util";
import { PatientContextType } from "../utils/types.util";
import { PatientContext } from "./tabs.component";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export default function History() {
  const { patientId } = useContext<PatientContextType>(PatientContext);
  const EVENT_TYPE = {
    ADVISE: "Porada",
    PROCEDURE: "Procedura",
  };

  const { data: histories, isLoading } = useQuery(
    [patientId, "histories"],
    async () => {
      const result = await fetchHistory(patientId);
      return result;
    }
  );

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col gap-4 my-2">
      <>
        {histories!.map((history, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-8">
            <div className="card-sm sticky top-[132px] w-3/5 justify-self-end">
              <p>{formatStringToDateChart(history.timestamp)}</p>
              <p>{EVENT_TYPE[history.medical_event_type]}</p>
              <p>{history.summary}</p>
            </div>
            <p className="w-3/5 text-lg">{history.description}</p>
          </div>
        ))}
      </>
    </div>
  );
}
