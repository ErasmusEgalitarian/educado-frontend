import React from "react";
import { PopupProps } from "../../interfaces/Popup";
import "./index.css";
//Figure out the classNames later or whatever
const Popup: React.FC<PopupProps> = ({ onConfirm, onClose, dialogText }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{dialogText}</p>
        <div className="popup-actions">
          <button
            onClick={() => {
              console.log("confirm pls");
              onConfirm;
            }}
          >
            Confirmar
          </button>
          <button onClick={() => onClose()}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
