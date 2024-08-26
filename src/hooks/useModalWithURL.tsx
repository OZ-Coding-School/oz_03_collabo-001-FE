import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useModalStore from '../store/useModalStore'; // 적절한 경로로 수정

const useModalWithURL = (modalName: string) => {
  const { modals, openModal, closeModal } = useModalStore();
  const navigate = useNavigate();
  const location = useLocation();

  // URL 파라미터에 따라 모달 상태 동기화
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const openModalName = params.get('modal');
    if (openModalName === modalName) {
      openModal(modalName);
    } else {
      closeModal(modalName);
    }
  }, [location.search, openModal, closeModal, modalName]);

  // 모달 열기 함수
  const handleOpenModal = () => {
    openModal(modalName);
    const params = new URLSearchParams(location.search);
    params.set('modal', modalName);
    navigate({ search: params.toString() }, { replace: true });
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    closeModal(modalName);
    const params = new URLSearchParams(location.search);
    params.delete('modal');
    navigate({ search: params.toString() }, { replace: true });
  };

  return {
    isOpen: modals[modalName] || false,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
  };
};

export default useModalWithURL;
