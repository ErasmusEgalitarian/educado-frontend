//Imports
import { Icon } from "@mdi/react";
import { Fragment } from "react";
import { mdiDelete } from "@mdi/js";

//Exporting UI content&structure of
export default function AcademicExperienceForm({
  index,
  educationformData,
  handleEducationInputChange,
  educationErrors,
  addNewEducationForm,
  handleEducationDelete,
}: {
  index: number;
  educationformData: any;
  handleEducationInputChange: Function;
  educationErrors: any;
  addNewEducationForm: Function;
  handleEducationDelete: Function;
}) {
  return (
    <Fragment>
      <div
        /* Styling based on conditions */
        className={`border border-[#166276] p-4 text-left bg-white shadow-xl ${
          (educationformData?.length === 1 && index === 0) ||
          (educationformData?.length > 1 &&
            index === educationformData?.length - 1)
            ? "rounded-b-lg"
            : ""
        }`}
      >
        {/* only display border on last form otherwise create distance */}
        <label className="text-[#A1ACB2] font-['Montserrat']">
          Experiências acadêmicas {index + 1}
        </label>{" "}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col ">
            <label htmlFor="Formacao" className="font-['Montserrat']">
              Formação:
              <span className="p-2 text-[#FF4949] text-sm font-normal font-['Montserrat']">
                *
              </span>
            </label>
            {/* Drop down list for educationLevel */}
            <select
              className="bg-[#E4F2F5] rounded-lg border-none"
              name="educationLevel"
              value={educationformData[index]?.educationLevel || ""}
              onChange={(value) => {
                handleEducationInputChange(value, index);
              }}
            >
              <option value="Basic">Básico</option>
              <option value="Medium">Médio</option>
              <option value="Superior">Superior</option>
            </select>
          </div>
          {/* Drop down list for status */}
          <div className="flex flex-col ">
            <label htmlFor="status" className="font-['Montserrat']">
              Status
              <span className="p-2 text-[#FF4949] text-sm font-normal font-['Montserrat']">
                *
              </span>
            </label>
            <select
              className="bg-[#E4F2F5] rounded-lg border-none"
              name="status"
              value={educationformData[index]?.status || ""}
              onChange={(value) => {
                handleEducationInputChange(value, index);
              }}
            >
              <option value="Progressing">Em andamento</option>
              <option value="Done">Concluída</option>
              <option value="Not Done">Não finalizado</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col ">
            <label htmlFor="firstName" className="font-['Montserrat']">
              Curso:
              <span className="p-2 text-[#FF4949] text-sm font-normal font-['Montserrat']">
                *
              </span>
            </label>
            <input
              className="bg-[#E4F2F5] rounded-lg border-none"
              placeholder="Curso"
              type="text"
              name="course"
              value={educationformData[index]?.course || ""}
              onChange={(value) => {
                handleEducationInputChange(value, index);
              }}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="email" className="font-['Montserrat']">
              instituição
              <span className="p-2 text-[#FF4949] text-sm font-normal font-['Montserrat']">
                *
              </span>
            </label>
            <input
              className="bg-[#E4F2F5] rounded-lg border-none"
              placeholder="Instituição"
              type="text"
              name="institution"
              value={educationformData[index]?.institution || ""}
              onChange={(value) => {
                handleEducationInputChange(value, index);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col ">
            <label htmlFor="firstName" className="font-['Montserrat']">
              início:
              <span className="p-2 text-[#FF4949] text-sm font-normal font-['Montserrat']">
                *
              </span>
            </label>
            <input
              className="bg-[#E4F2F5] rounded-lg border-none"
              placeholder="Mês/Ano"
              type="text"
              max={4}
              name="startDate"
              value={educationformData[index]?.startDate || ""}
              onChange={(value) => {
                handleEducationInputChange(value, index);
              }}
            />
            {/* display date input error */}
            {educationErrors[index]?.startDate != "" && (
              <span className="education-startDate p-3 mt-2">
                {educationErrors[index]?.startDate}
              </span>
            )}
          </div>
          <div className="flex flex-col ">
            <label htmlFor="endDate" className="font-['Montserrat']">
              Fim
              <span className="p-2 text-[#FF4949] text-sm font-normal font-['Montserrat']">
                *
              </span>
            </label>
            <input
              className="bg-[#E4F2F5] rounded-lg border-none"
              placeholder="Mês/Ano"
              type="text"
              max={4}
              name="endDate"
              value={educationformData[index]?.endDate || ""}
              onChange={(value) => {
                handleEducationInputChange(value, index);
              }}
            />
            {/* display date input error */}
            {educationErrors[index].endDate != "" && (
              <span className="education-endDate p-3 mt-2">
                {educationErrors[index].endDate}
              </span>
            )}
          </div>
        </div>
        {/* Delete button is displayed on all forms except the first one */}
        {index > 0 && (
          <div className="flex justify-end gap-1">
            <Icon
              path={mdiDelete}
              size={0.8}
              color="#CF6679"
              className="mt-3.5"
            />
            <button
              type="button"
              className=" text-[#CF6679] py-3"
              onClick={() => {
                handleEducationDelete(
                  index,
                  educationformData[index]?._id
                    ? educationformData[index]?._id
                    : null
                );
              }}
            >
              Remover formação
            </button>
          </div>
        )}
        {/* only display border on last form otherwise create distance */}
        <div
          className={
            index === educationformData?.length - 1
              ? "border-t border-[#A1ACB2] py-2 mt-4"
              : "py-30 mt-5"
          }
        />
        {/* Btn is only visible on last created form*/}
        {index === educationformData?.length - 1 ? (
          <>
            <div className="flex items-center justify-center">
              <button
                type="button"
                className="education_add_button w-full px-4 py-2 rounded-lg border-dotted border-2 border-[#A1ACB2]"
                onClick={() => {
                  addNewEducationForm(index);
                }}
              >
                Adicionar outra experiência
              </button>
            </div>
          </>
        ) : null}
      </div>
    </Fragment>
  );
}
