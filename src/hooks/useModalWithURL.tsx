import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useModalStore from '../store/useModalStore'; // 적절한 경로로 수정

const useModalWithURL = (modalName: string) => {
  const { modals, openModal, closeModal, openSubModal, openThirdModal } =
    useModalStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const openModalName = params.get('modal');
    const openSubModalName = params.get('submodal');
    const openThirdModalName = params.get('thirdmodal');

    // 모달 상태 동기화
    if (openModalName === modalName) {
      openModal(modalName);
    } else if (openSubModalName === modalName) {
      openSubModal(modalName);
    } else if (openThirdModalName === modalName) {
      openThirdModal(modalName);
    } else {
      closeModal(modalName);
    }
  }, [
    location.search,
    openModal,
    closeModal,
    openSubModal,
    openThirdModal,
    modalName,
  ]);

  // 모달 열기 함수
  const handleOpenModal = () => {
    if (modalName === '') return;
    openModal(modalName);
    const params = new URLSearchParams(location.search);
    params.set('modal', modalName);
    params.delete('submodal'); // 모달 열 때 서브모달 제거
    navigate({ search: params.toString() }, { replace: true });
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    const params = new URLSearchParams(location.search);
    const hasSubmodalParam = params.has('submodal');
    const hasThirdmodalParam = params.has('thirdmodal');
    if (hasThirdmodalParam) {
      closeModal(modalName);
      params.delete('thirdmodal');
      navigate({ search: params.toString() }, { replace: false });
    } else if (hasSubmodalParam) {
      closeModal(modalName);
      params.delete('submodal');
      navigate({ search: params.toString() }, { replace: false });
    } else if (!hasSubmodalParam) {
      closeModal(modalName);
      params.delete('modal');
      navigate({ search: params.toString() }, { replace: false });
    }
  };

  // 서브 모달 열기 함수
  const handleOpenSubModal = () => {
    const params = new URLSearchParams(location.search);
    params.set('submodal', modalName);
    navigate({ search: params.toString() }, { replace: true });
    openSubModal(modalName); // 서브모달 열기
  };

  // 서브 모달2 열기 함수
  const handleOpenThirdModal = () => {
    const params = new URLSearchParams(location.search);
    params.set('thirdmodal', modalName);
    navigate({ search: params.toString() }, { replace: true });
    openThirdModal(modalName); // 서브모달2 열기
  };

  return {
    isOpen: modals[modalName] || false,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
    openSubModal: handleOpenSubModal,
    openThirdModal: handleOpenThirdModal,
  };
};

export default useModalWithURL;
