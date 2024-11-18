// import { useState } from "react";
// import GenericModalComponent from "@components/GenericModalComponent";
import { MdDelete } from "react-icons/md";

// import { useNotifications } from "@components/notification/NotificationContext";
// import { getUserToken } from "@helpers/userInfo";
// import { useApi } from "@hooks/useAPI";
// import { toast } from "react-toastify";
// import { institutionService } from "@services/Institution.services";

import { Course } from "@interfaces/Course";
import { KeyedMutator } from "swr";

export const CoursesDeleteButton = ({
  courseId,
  refreshFn,
}: {
  courseId: string;
  refreshFn: KeyedMutator<Course[]>;
}) => {
  // const [showModal, setShowModal] = useState(false);
  // const {
  //   call: deleteInstitution,
  //   isLoading,
  //   error,
  // } = useApi(institutionService.deleteInstitution);

  // const { addNotification } = useNotifications();

  // const handleConfirm = async () => {
  //   try {
  //     await deleteInstitution(institutionId, getUserToken());
  //     refreshFn();
  //     addNotification("Instituição deletada com sucesso !");
  //   } catch (err) {
  //     toast.error(err as string);
  //     console.error(err);
  //   }
  // };

  if (courseId === undefined) return null;
  if (refreshFn === undefined) return null;

  return (
    <>
      <button
        className="btn btn-circle bg-primary hover:bg-cyan-900 border-transparent"
        // onClick={() => setShowModal(true)}
      >
        <MdDelete />
      </button>
      {/* {showModal && (
        <GenericModalComponent
          onConfirm={handleConfirm}
          onClose={() => setShowModal(false)}
          isVisible={showModal}
          confirmBtnText="Deletar"
          loading={isLoading}
          title="Deletando usuário"
          contentText="Você tem certeza de que deseja excluir este Instituições?"
          width="w-[600px]"
        />
      )} */}
    </>
  );
};
