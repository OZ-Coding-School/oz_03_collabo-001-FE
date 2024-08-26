import { create } from 'zustand';

interface ModalState {
  modals: { [key: string]: boolean }; // 각 모달의 상태를 키-값 쌍으로 관리
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
}

const useModalStore = create<ModalState>((set) => ({
  modals: {}, // 초기 상태는 빈 객체로 설정

  openModal: (modalName) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: true }, // 특정 모달을 열기
    })),

  closeModal: (modalName) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: false }, // 특정 모달을 닫기
    })),
}));

export default useModalStore;
