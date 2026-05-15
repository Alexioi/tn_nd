import { create } from "zustand";

type Item = {
  designation: string;
  name: string;
  approvingOrganization: string;
  approvingDate: string;
  startDate: string;
  endDate: string;
  dateAndNumber: string;
  state: string;
  status: string;
  informationAboutChanges: string;
  note: string;
  responsible: string;
  isEdible?: boolean;
};

type Store = {
  data: Item[];
  setData: (data: Item[]) => void;
};

const useData = create<Store>()((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));

export type { Item };
export { useData };
