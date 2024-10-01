import React from "react";
import { PopupProps } from "../../interfaces/Popup";
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

import "./index.css";

//Figure out the classNames later or whatever
const Popup: React.FC<PopupProps> = ({ onConfirm, onClose, dialogText }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <span>
            <b>Cancelar alterações</b>
          </span>
          <button className="close-button" onClick={() => onClose()}>
            <Icon path={mdiClose} color="#A1ACB2" size={1} />
          </button>
        </div>  
        <div className="popup-dialogue">
          <p>{dialogText}</p>
        </div>
        <div className="popup-actions">
          <button className="cancel-button" onClick={() => onClose()}>
            Cancelar
          </button>
          <button
            className="confirm-button"
            onClick={async () => {
              await onConfirm();
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
