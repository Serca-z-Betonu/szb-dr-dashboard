import type { NextPage } from "next";
import Layout from "../components/layout.component";
import PatientPreview from "../components/patient-preview.component";
import { fetchPatients } from "../utils/fetchers.util";
import { PatientPreviewType } from "../utils/types.util";

type Props = {
  patients: PatientPreviewType[];
};

export async function getServerSideProps() {
  const patients = await fetchPatients();

  return {
    props: { patients },
  };
}

const Home = ({ patients }: Props) => {
  console.log(patients);
  return (
    <Layout>
      <div className="w-1/4 mx-auto my-4 flex flex-col gap-8">
        {patients.map((patient: PatientPreviewType, idx: number) => (
          <PatientPreview key={idx} patient={patient} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
