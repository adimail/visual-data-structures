import React from "react";
import { Modal, Button } from "react-bootstrap";

interface ReloadConfirmationModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ReloadConfirmationModal: React.FC<ReloadConfirmationModalProps> = ({
  show,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to reload the page? Any unsaved changes will be
        lost.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="btn btn-primary active" onClick={onConfirm} active>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReloadConfirmationModal;
