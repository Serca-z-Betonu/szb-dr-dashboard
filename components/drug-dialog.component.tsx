import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { postPrescriptions } from "../utils/fetchers.util";
import { DrugAllType } from "../utils/types.util";
import ListBox from "./list-box.component";

type Props = {
  patientId: string;
  isOpen: boolean;
  setIsOpen: any;
};

export default function DrugDialog({ patientId, isOpen, setIsOpen }: Props) {
  const [selected, setSelected] = useState<DrugAllType>({
    drug_id: -1,
    name: "Select Drug",
    unit: "",
  });
  const [startDate, setStartDay] = useState("");
  const [endDate, setEndDay] = useState("");
  const [doseSize, setDoseSize] = useState<string>("");
  const [dailyDoseSize, setDailyDoseSize] = useState<string>("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function handleSubmit(e: any, patientId: string) {
    e.preventDefault();
    const body = {
      drug_id: selected.drug_id,
      start_date: startDate,
      end_date: endDate,
      dose_size: doseSize,
      daily_dose_count: dailyDoseSize,
    };

    await postPrescriptions(patientId, body);
    location.reload();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="top-64 bottom-64 m-auto w-[400px] absolute max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h2"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Nowa recepta
                </Dialog.Title>
                <form
                  onSubmit={(e) => handleSubmit(e, patientId)}
                  className="flex flex-col gap-4"
                >
                  <ListBox selected={selected} setSelected={setSelected} />
                  <section>
                    <label className="block">Start date:</label>
                    <input
                      className="border-2 px-2 border-teal-500 rounded-lg w-1/2"
                      type="date"
                      id="start"
                      name="start"
                      value={startDate}
                      min="2022-01-01"
                      max="2023-12-31"
                      onChange={(e: any) => setStartDay(e.target.value)}
                    />
                  </section>
                  <section>
                    <label className="block">End date:</label>
                    <input
                      className="border-2 px-2 border-teal-500 rounded-lg w-1/2"
                      type="date"
                      id="end"
                      name="end"
                      value={endDate}
                      min="2022-01-01"
                      max="2023-12-31"
                      onChange={(e: any) => setEndDay(e.target.value)}
                    />
                  </section>
                  <section>
                    <label className="block">Wielkość pojedynczej dawki:</label>
                    <input
                      className="border-2 px-2 border-teal-500 rounded-lg w-1/2"
                      type="number"
                      id="doseSize"
                      name="doseSize"
                      onChange={(e: any) => setDoseSize(e.target.value)}
                    />
                  </section>
                  <section>
                    <label className="block">Liczba dawek na dzień:</label>
                    <input
                      className="border-2 px-2 border-teal-500 rounded-lg w-1/2"
                      type="number"
                      id="dailyDoseSize"
                      name="dailyDoseSize"
                      onChange={(e: any) => setDailyDoseSize(e.target.value)}
                    />
                  </section>
                  <div className="mt-4 ml-auto w-fit">
                    <button type="submit" className="btn">
                      Dodaj
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
