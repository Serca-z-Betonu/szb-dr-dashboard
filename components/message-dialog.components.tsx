import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { postAlert } from "../utils/fetchers.util";
import { DrugAllType } from "../utils/types.util";
import ListBox from "./list-box.component";

type Props = {
  patientId: string;
  isOpen: boolean;
  setIsOpen: any;
};

export default function MessageDialog({ patientId, isOpen, setIsOpen }: Props) {
  const [message, setMessage] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function handleSubmit(e: any, patientId: string) {
    e.preventDefault();
    const body = {
      message,
    };
    await postAlert(patientId, body);
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
              <Dialog.Panel className="top-64 bottom-128 m-auto w-[400px] absolute max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h2"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Alert
                </Dialog.Title>
                <form
                  onSubmit={(e) => handleSubmit(e, patientId)}
                  className="flex flex-col gap-4"
                >
                  <textarea
                    id="message"
                    rows={4}
                    onChange={(e) => setMessage(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teil-500"
                    placeholder="Wiadomość do pancjenta..."
                  />

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
