import { create } from 'zustand';

type StepState = {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
  setStep: (step: number) => void;
};

export const useStepStore = create<StepState>((set) => ({
  step: 1,
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  resetStep: () => set({ step: 1 }),
  setStep: (step: number) => set({ step }),
}));
