import ReactDOM from "react-dom";

const SignUpModal = ({ isOpen, children }) => {
  let el = document.body;
  return ReactDOM.createPortal(children, el);
};

export default SignUpModal;
