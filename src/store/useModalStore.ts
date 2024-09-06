/* eslint-disable no-unused-vars */
import { create } from 'zustand';

interface ModalState {
  modals: { [key: string]: boolean };
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
  openSubModal: (subModalName: string) => void;
  openThirdModal: (thirdModalName: string) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modals: {},

  openModal: (modalName) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: true },
    })),

  closeModal: (modalName) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: false },
    })),

  openSubModal: (subModalName) =>
    set((state) => ({
      modals: { ...state.modals, [subModalName]: true },
    })),

  openThirdModal: (thirdModalName) =>
    set((state) => ({
      modals: { ...state.modals, [thirdModalName]: true },
    })),
}));
