import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {BsArrowRight} from "react-icons/bs"

function UserModal({ show, setShow, user }) {

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between">
            <b>Name</b>
            <p><BsArrowRight/></p>
            {user?.name}
          </div>
          <div className="d-flex justify-content-between">
            <b>email</b>
            <p><BsArrowRight/></p>
            {user?.email}
          </div>
          <div className="d-flex justify-content-between">
            <b>city</b>
            <p><BsArrowRight/></p>
            {user?.city}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserModal;
