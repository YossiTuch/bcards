import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../store/store";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { ModalActions } from "../store/modalSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const LogoutModal = () => {
  const isModalOpen = useSelector(
    (state: TRootState) => state.modalSlice.isOpen,
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "user/logout" });
    dispatch(ModalActions.closeModal());
  };

  return (
    <Modal
      show={isModalOpen}
      size="md"
      onClose={() => dispatch(ModalActions.closeModal())}
      popup
    >
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to log out?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="alternative" onClick={handleLogout}>
              {"Yes, I'm sure"}
            </Button>
            <Button
              color="gray"
              onClick={() => dispatch(ModalActions.closeModal())}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default LogoutModal;
