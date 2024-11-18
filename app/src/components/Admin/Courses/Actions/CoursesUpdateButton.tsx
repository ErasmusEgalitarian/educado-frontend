// import { useState, useEffect } from "react";
// import GenericModalComponent from "@components/GenericModalComponent";
import { MdCreate } from "react-icons/md";

// import { useNotifications } from "@components/notification/NotificationContext";
// import { useApi } from "@hooks/useAPI";
// import { getUserToken } from "@helpers/userInfo";
// import { toast } from "react-toastify";
// import courseService from "@services/course.services";

import { Course } from "@interfaces/Course";
import { KeyedMutator } from "swr";

export const CoursesUpdateButton = ({
  course,
  refreshFn,
}: {
  course: Course;
  refreshFn: KeyedMutator<Course[]>;
}) => {
  // const [showModal, setShowModal] = useState(false);

  // const [nameInput, setNameInput] = useState(course.courseName);
  // const [domainInput, setDomainInput] = useState(course.domain);
  // const [secondaryDomainInput, setSecondaryDomainInput] = useState(
  //   course.secondaryDomain
  // );

  // const {
  //   call: updateCourse,
  //   isLoading,
  //   error,
  // } = useApi(courseService.updateCourse);

  // useEffect(() => {
  //   setNameInput(course.courseName);
  //   setDomainInput(course.domain);
  //   setSecondaryDomainInput(course.secondaryDomain);
  // }, [showModal]);

  // const { addNotification } = useNotifications();

  // const handleSumbit = async (e?: FormEvent<HTMLFormElement>) => {
  //   try {
  //     if (e) {
  //       e.preventDefault();
  //       e.currentTarget.reportValidity();
  //       if (!e.currentTarget.checkValidity()) {
  //         e.currentTarget.reportValidity();
  //         return;
  //       }
  //     }
  //     await updateCourse(course._id!, getUserToken(), {
  //       courseName: nameInput,
  //       domain: domainInput,
  //       secondaryDomain: secondaryDomainInput,
  //     });

  //     refreshFn();
  //     setShowModal(false);
  //     addNotification("Instituição atualizada com sucesso !");
  //   } catch (err) {
  //     toast.error(String(err));
  //     console.error(err);
  //   }
  // };

  // const handleClose = () => {
  //   setNameInput("");
  //   setDomainInput("");
  //   setSecondaryDomainInput("");

  //   setShowModal(false);
  // };

  if (course === undefined) return null;
  if (refreshFn === undefined) return null;

  return (
    <>
      <button
        className="btn btn-circle bg-primary hover:bg-cyan-900 border-transparent"
        // onClick={() => setShowModal(true)}
      >
        <MdCreate />
      </button>

      {/* {showModal && (
        <GenericModalComponent
          onConfirm={(e) => handleSumbit(e)}
          onClose={handleClose}
          isVisible={showModal}
          title="Update Instituições"
          confirmBtnText="Atualizar"
          loading={isLoading}
          children={
            <form className="form-control flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <label>
                  <span>Nome da Instituição</span>
                </label>
                <input
                  type="text"
                  name="course-name"
                  required
                  placeholder="Instituição"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="input"
                />

                <label>
                  <span>Domínio</span>
                </label>
                <input
                  type="text"
                  name="domain"
                  required
                  pattern="@([\w\-]+\.)+[\w\-]{2,4}"
                  title="@domain.com"
                  placeholder="@domain.com"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  className="input"
                />

                <label>
                  <span>Segundo Domínio</span>
                </label>
                <input
                  type="text"
                  name="secondary-domain"
                  placeholder="@domain.com (opcional)"
                  title="@domain.com (opcional)"
                  pattern="@([\w\-]+\.)+[\w\-]{2,4}$"
                  value={secondaryDomainInput}
                  onChange={(e) => setSecondaryDomainInput(e.target.value)}
                  className="input"
                />
              </div>
            </form>
          }
        />
      )} */}
    </>
  );
};
