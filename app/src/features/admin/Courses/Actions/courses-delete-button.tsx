import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";

import { useNotifications } from "@common/context/NotificationContext";
import { useApi } from "@common/hooks/use-api";
import { CreatorPopulatedCourse } from "@courses/types/Course";
import { deleteCourse as apiDeleteCourse } from "@courses/api/course-mutations";
import { getUserToken } from "@user/utilities/get-local-user";
import GenericModalComponent from "@common/components/generic-modal-component";

export const CoursesDeleteButton = ({
  courseId,
  refreshFn,
}: {
  courseId: string;
  refreshFn: KeyedMutator<CreatorPopulatedCourse[]>;
}) => {
  const [showModal, setShowModal] = useState(false);
  const { call: deleteCourse, isLoading } = useApi(apiDeleteCourse);

  const { addNotification } = useNotifications();

  const handleConfirm = async () => {
    try {
      await deleteCourse(courseId, getUserToken());

      await refreshFn();
      addNotification("Curso deletada com sucesso !");
      setShowModal(false);
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
      >
        <MdDelete />
      </button>
      {showModal && (
        <GenericModalComponent
          onConfirm={() => void handleConfirm()}
          onClose={() => {
            setShowModal(false);
          }}
          isVisible={showModal}
          confirmBtnText="Deletar"
          loading={isLoading}
          title="Deletando curso"
          contentText="Você tem certeza de que deseja excluir este Curso?"
          width="w-[600px]"
        />
      )}
    </>
  );
};
