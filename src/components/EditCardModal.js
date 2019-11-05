import ReactDOM from "react-dom";

const EditCardModal = ({ isOpen, children }) => {
  let el = document.body;
  return ReactDOM.createPortal(children, el);
};

export default EditCardModal;
