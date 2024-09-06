/* eslint-disable no-unused-vars */
import { create } from 'zustand';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  setAddress: (address: string | null) => void;
  setCoordinates: (coords: {
    latitude: number | null;
    longitude: number | null;
  }) => void;
}

const useLocationStore = create<LocationState>((set) => ({
  address: null,
  latitude: null,
  longitude: null,

  setAddress: (address) => set({ address }),

  setCoordinates: ({ latitude, longitude }) => set({ latitude, longitude }),
}));

export default useLocationStore;
