/* eslint-disable no-unused-vars */
import { create } from 'zustand';

interface FilterState {
  regionId: string | null;
  subCategoryId: string | null;
  latitude: number | null;
  longitude: number | null;
  isActive: boolean;
  setRegionId: (id: string | null) => void;
  setSubCategoryId: (id: string | null) => void;
  setLatitude: (lat: number | null) => void;
  setLongitude: (long: number | null) => void;
  setIsActive: (active: boolean) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  regionId: null,
  subCategoryId: null,
  latitude: null,
  longitude: null,
  isActive: false,
  setRegionId: (id) => set({ regionId: id }),
  setSubCategoryId: (id) => set({ subCategoryId: id }),
  setLatitude: (lat) => set({ latitude: lat }),
  setLongitude: (long) => set({ longitude: long }),
  setIsActive: (active) => set({ isActive: active }),
}));
