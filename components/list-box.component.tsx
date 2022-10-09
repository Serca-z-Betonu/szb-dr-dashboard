import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { fetchDrugsAll } from "../utils/fetchers.util";
import { useQuery } from "@tanstack/react-query";
import { DrugAllType } from "../utils/types.util";

type Props = {
  selected: DrugAllType;
  setSelected: any;
};

export default function ListBox({ selected, setSelected }: Props) {
  const { data: drugs, isLoading } = useQuery(["listBox"], async () => {
    const result = await fetchDrugsAll();
    return result;
  });

  if (isLoading) return <div></div>;
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {drugs!.map((drug, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={drug}
              >
                {drug.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
