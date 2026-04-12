import { create } from "zustand";

type Store = {
  departments: string[];
  report: { sheet: number; row: number };
  setDepartaments: (departments: string[]) => void;
  setReport: (settings: { sheet: number; row: number }) => void;
};

const useSettings = create<Store>()((set) => ({
  departments: [],
  report: { sheet: 1, row: 1 },
  setDepartaments: (departments) => set({ departments }),
  setReport: (settings) => set({ report: settings }),
}));

export { useSettings };
