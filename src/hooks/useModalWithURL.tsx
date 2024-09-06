import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useModalStore from '../store/useModalStore';

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

  const handleOpenModal = () => {
    if (modalName === '') return;

    openModal(modalName);

    const params = new URLSearchParams(location.search);

    params.set('modal', modalName);
    params.delete('submodal');

    navigate({ search: params.toString() }, { replace: true });
  };

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

  const handleOpenSubModal = () => {
    const params = new URLSearchParams(location.search);

    params.set('submodal', modalName);
    navigate({ search: params.toString() }, { replace: true });
    openSubModal(modalName);
  };

  const handleOpenThirdModal = () => {
    const params = new URLSearchParams(location.search);

    params.set('thirdmodal', modalName);
    navigate({ search: params.toString() }, { replace: true });
    openThirdModal(modalName);
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
