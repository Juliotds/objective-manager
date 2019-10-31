import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import EditCard from "./EditCard";

const EditCardModal = props => {
  let el = document.createElement("div");
  el.className = "modal";
  el.id = "card_modal";
  useEffect(() => {
    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, []);
  return ReactDOM.createPortal(EditCard, el);
};

export default EditCardModal;
