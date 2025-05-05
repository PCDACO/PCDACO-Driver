import { create } from 'zustand';

type LicenseMethod = 'camera' | 'library' | null;

type LicenseMethodState = {
  method: LicenseMethod;
  setMethod: (method: LicenseMethod) => void;
  resetMethod: () => void;
};

export const useLicenseMethodStore = create<LicenseMethodState>((set) => ({
  method: null,
  setMethod: (method) => set({ method }),
  resetMethod: () => set({ method: null }),
}));
