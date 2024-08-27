/* eslint-disable no-unused-vars */
import { create } from 'zustand';

interface LocationState {
  address: string | null;
  setAddress: (address: string | null) => void;
}

const useLocationStore = create<LocationState>((set) => ({
  address: null,
  setAddress: (address) => set({ address }),
}));

export default useLocationStore;
