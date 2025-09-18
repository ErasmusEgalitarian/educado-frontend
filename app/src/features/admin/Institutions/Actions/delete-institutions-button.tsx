import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";

import { useNotifications } from "@common/context/NotificationContext";
import { useApi } from "@common/hooks/use-api";
import { Institution } from "@admin/types/institution-types";
import { deleteInstitution as apiDeleteInstitution } from "@admin/api/institution-mutations";
import GenericModalComponent from "@common/components/generic-modal-component";
import { getUserToken } from "@user/utilities/get-local-user";

export const DeleteInstitutionButton = ({
  institutionId,
  refreshFn,
  disabled = false,
}: {
  institutionId: string;
  refreshFn: KeyedMutator<Institution[]>;
  disabled?: boolean;
}) => {
  const [showModal, setShowModal] = useState(false);
  const { call: deleteInstitution, isLoading } = useApi(apiDeleteInstitution);

  const { addNotification } = useNotifications();

  const handleConfirm = async () => {
    try {
      await deleteInstitution(institutionId, getUserToken());
      await refreshFn();
      addNotification("Instituição deletada com sucesso !");
    } catch (err) {
      toast.error(err as string);
      console.error(err);
    }
  };

  return (
    <>
      <button
        className="btn btn-circle bg-primary hover:bg-cyan-900 border-transparent"
        onClick={() => {
          setShowModal(true);
        }}
        disabled={disabled}
      >
        <MdDelete />
      </button>
      {showModal && (
        <GenericModalComponent
          onConfirm={() => handleConfirm}
          onClose={() => {
            setShowModal(false);
          }}
          isVisible={showModal}
          confirmBtnText="Deletar"
          loading={isLoading}
          title="Deletando Instituições"
          contentText="Você tem certeza de que deseja excluir este Instituições?"
          width="w-[600px]"
        />
      )}
    </>
  );
};
