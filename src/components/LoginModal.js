import ReactDOM from "react-dom";

const LoginModal = ({ isOpen, children }) => {
  let el = document.body;
  return ReactDOM.createPortal(children, el);
};

export default LoginModal;
