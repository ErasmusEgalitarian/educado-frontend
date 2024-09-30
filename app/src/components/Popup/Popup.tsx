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
          <button className="cancel-button" onClick={onClose}>Cancelar</button>
          <button className="confirm-button" onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
