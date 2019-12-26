import ReactDOM from "react-dom";

const EditBoardModal = ({ isOpen, children }) => {
  let el = document.body;
  return ReactDOM.createPortal(children, el);
};

export default EditBoardModal;
