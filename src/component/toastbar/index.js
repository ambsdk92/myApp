import { DANGER } from "constants/variant";
import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const TYPE = {
  [DANGER]: "Error",
};

function ToastBar({ varient, message }) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <ToastContainer className="p-3" position="bottom-end" style={{ zIndex: 1 }}>
      <Toast
        onClose={handleClose}
        show={show}
        delay={4000}
        bg={varient}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{TYPE[varient]}</strong>
          {/* <small>11 mins ago</small> */}
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastBar;
