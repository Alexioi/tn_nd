import { create } from "zustand";

type Store = {
  departments: string[];
  setDepartaments: (departments: string[]) => void;
};

const useSettings = create<Store>()((set) => ({
  departments: [],
  setDepartaments: (departments) => set({ departments }),
}));

export { useSettings };
