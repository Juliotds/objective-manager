import ReactDOM from "react-dom";

const WarningModal = ({ isOpen, children }) => {
  let el = document.body;
  return ReactDOM.createPortal(children, el);
};

export default WarningModal;
