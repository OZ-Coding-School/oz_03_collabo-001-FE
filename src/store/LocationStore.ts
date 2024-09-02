/* eslint-disable no-unused-vars */
import { create } from 'zustand';

// 인터페이스 수정
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

// Zustand 스토어 생성
const useLocationStore = create<LocationState>((set) => ({
  address: null,
  latitude: null,
  longitude: null,

  setAddress: (address) => set({ address }),

  // setCoordinates 함수 수정
  setCoordinates: ({ latitude, longitude }) => set({ latitude, longitude }),
}));

export default useLocationStore;
