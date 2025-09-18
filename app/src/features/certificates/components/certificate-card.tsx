import { mdiAccount, mdiChevronDown, mdiDownload, mdiFileEye } from "@mdi/js";
import { Icon } from "@mdi/react";
import axios from "axios";
import { useEffect, useState } from "react";

import StarRating from "../../../common/components/StarRating";
import { CERT_URL } from "../../../common/constants/environment";
import { Certificate } from "../../../common/unknown/interfaces/Certificate";
import categories from "../../courses/utilities/course-categories";

import ActionButton from "./action-button";
import CertificateField from "./certificate-field";

const CertificateCard = (props: { certificate: Certificate; num: number }) => {
  const { certificate } = props;
  const { course } = certificate;
  const maxTitleLength = 20;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [pdfPath, setPdfPath] = useState<string>("");

  function toggleModal() {
    setPreviewVisible(!previewVisible);
  }

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const url =
      CERT_URL +
      "/api/student-certificates/download?courseId=" +
      certificate.course._id +
      "&studentId=" +
      certificate.creator._id;

    axios
      .post(url)
      .then((res) => {
        setPdfPath(res.data as string);
      })
      .catch((err: unknown) => {
        console.error("Error fetching certificate PDF path:", err);
      });
  }, [certificate.course._id, certificate.creator._id]);

  function download() {
    window.open(CERT_URL + pdfPath, "_blank");
  }

  return (
    <div className="overflow-hidden w-full m-auto duration-200 shadow-md rounded-xl hover:shadow-lg group">
      <div className="bg-white w-full">
        <div className="mt-5 grid grid-cols-[50fr,1fr] rounded-xl border">
          {/* Card info */}
          <div className="px-5 py-6 grid grid-cols-4 justify-space-between -mr-20">
            {/* Course title */}
            <h3
              className="text-xl font-semibold"
              id={"card-" + String(props.num) + "-title"}
            >
              {course.title.length <= maxTitleLength
                ? course.title
                : course.title.slice(0, maxTitleLength - 2) + "..."}
            </h3>
            {/* Course category */}
            <CertificateField
              className="hidden xl:inline-block"
              icon={categories[course.category].icon}
            >
              <p>{categories[course.category].br ?? course.category}</p>
            </CertificateField>
            {/* Course rating */}
            <div className="">
              <StarRating rating={course.rating ?? 0} starSize="w-6" />
            </div>
            {/* Subsriber count */}
            <CertificateField icon={mdiAccount} className="">
              <p className="text-grayMedium">{course.numOfSubscriptions}</p>
              <p className="text-grayMedium hidden sm:inline-block ml-1">
                alunos
              </p>
            </CertificateField>
          </div>
          <button id={"dropdown-" + String(props.num)} onClick={toggleDropdown}>
            <Icon
              path={mdiChevronDown}
              className="w-8 h-8 text-grayMedium hover:text-primary mr-5 float-right cursor-pointer"
            />
          </button>
          {isOpen && <div className="col-span-2 bg-grayLight h-[1px]" />}
          {isOpen && (
            <div className="w-full col-span-2 px-5 py-4 rounded-b-xl bg-[rgb(250,_250,_250)] grid grid-cols-2">
              {/** Export certificate */}
              <p className="text-xl translate-y-2 text-grayDark">
                Exportar certificado:{" "}
              </p>
              <div className="gap-20 flex flex-row-reverse ">
                <ActionButton
                  id={"download-button-" + String(props.num)}
                  icon={mdiDownload}
                  onClick={download}
                >
                  <p>Baixar</p> {/** Download */}
                </ActionButton>
                <ActionButton
                  id={"preview-button-" + String(props.num)}
                  icon={mdiFileEye}
                  onClick={toggleModal}
                >
                  <p> Previa </p> {/** Preview */}
                </ActionButton>
              </div>
              {previewVisible && (
                <object
                  id={"preview-window-" + String(props.num)}
                  className="rounded-xl justify-self-center col-span-2 mt-4"
                  data={CERT_URL + pdfPath}
                  type="application/pdf"
                  width="600"
                  height="482"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
