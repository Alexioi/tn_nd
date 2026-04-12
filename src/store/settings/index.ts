import { create } from "zustand";

type Store = {
  departments: string[];
  organizations: { name: string; description: string }[];
  states: string[];
  statuses: string[];
  reports: { sheet: number; row: number };
  setDepartaments: (departments: string[]) => void;
  setReports: (settings: { sheet: number; row: number }) => void;
  setStates: (states: string[]) => void;
  setStatuses: (statuses: string[]) => void;
  setOrganizations: (
    departments: { name: string; description: string }[],
  ) => void;
};

const useSettings = create<Store>()((set) => ({
  departments: [],
  organizations: [],
  states: [],
  statuses: [],
  reports: { sheet: 1, row: 1 },
  setDepartaments: (departments) => set({ departments }),
  setReports: (reports) => set({ reports }),
  setStates: (states) => set({ states }),
  setStatuses: (statuses) => set({ statuses }),
  setOrganizations: (organizations) => set({ organizations }),
}));

export { useSettings };
