import useSWR from "swr";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

// Hooks
import { getUserToken } from "../../../helpers/userInfo";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// components
import { SectionArrowIcon } from "../../SectionArrowIcon";
import { ComponentList } from "../ComponentList";

import { Component } from "../../../interfaces/SectionInfo";

// icons
import {
  mdiChevronDown,
  mdiChevronUp,
  mdiDeleteCircle,
  mdiDotsVerticalCircle,
  mdiPlus,
} from "@mdi/js";
import { Icon } from "@mdi/react";
import { useState, useEffect, useRef } from "react";
import SectionServices from "../../../services/section.services";

//pop-ups
import { CreateLecture } from "../../CreateLecturePopUp";
import { CreateExercise } from "../../Exercise/CreateExercisePopUp";
import { set } from "cypress/types/lodash";

interface Props {
  sid: string;
  savedSID: string;
  addOnSubmitSubscriber: Function;
  setSavedSID: Function;
  handleSectionDeletion: Function;
}

export function SortableItem({
  sid,
  addOnSubmitSubscriber,
  savedSID,
  setSavedSID,
  handleSectionDeletion,
}: Props) {
  const [arrowDirection, setArrowDirection] = useState<any>(mdiChevronDown);
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [sectionData, setSectionData] = useState<any>();
  const [componentData, setComponentData] = useState<any>();
  const subRef = useRef<HTMLInputElement>(null);
  const openRef = useRef<HTMLInputElement>(null);

  const token = getUserToken();

  // Fetch the section data from the server.
  useEffect(() => {
    try {
      if (token) {
        SectionServices.getSectionDetail(sid, token).then((res) => {
          setSectionData(res);
          setComponentData(res.components);
        });
      }
    } catch (err) {
      toast.error("failed to fetch section data for section " + sid);
    }
  }, []);

  useEffect(() => {
  }, [componentData]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: sid });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  //Toggles the arrow direction between up and down
  function changeArrowDirection() {
    if (arrowDirection === mdiChevronDown) {
      setArrowDirection(mdiChevronUp);
    } else {
      setArrowDirection(mdiChevronDown);
    }
  }

  type SectionPartial = {
    title: string;
    description: string;
  };
  // Create Form Hooks
  const {
    register: registerSection,
    handleSubmit: handleSectionUpdate,
    formState: { errors: sectionErrors },
  } = useForm<SectionPartial>();

  /**
   * SubmitHandler: update section
   *
   * @param data  The data to be updated
   */

  const handleComponentCreation = (component: Component) => {
    setComponentData([...componentData, component]);
  };

  const onSubmit: SubmitHandler<SectionPartial> = (data) => {
    if (data === undefined) return;
    if (title === undefined && description === undefined) return;
    data.title = title ? title : sectionData.title;
    data.description = description ? description : sectionData.description;

    const changes: SectionPartial = {
      title: data.title,
      description: data.description,
    };

    SectionServices.saveSection(changes, sid, token)
      //  .then(res => toast.success('Seção atualizada'))
      .catch((err) => toast.error(err));
  };

  useEffect(() => {
    if (sectionData?.title === "Nova seção") {
      setArrowDirection(mdiChevronUp);
    }
    addOnSubmitSubscriber(() => {
      subRef.current?.click();
    });
  }, []);

  //If data is not found yet, show a loading message.
  if (sectionData === undefined) {
    return <p>Loading...</p>;
  }

  //Else show the sections.
  return (
    <div>
      <div className="collapse w-full rounded border bg-white shadow-lg rounded-lg my-4">
        <input
          type="checkbox"
          className="peer w-4/5 h-full"
          defaultChecked={sectionData.title === "Nova seção"}
          onChange={() => changeArrowDirection()}
          ref={openRef}
        />

        <div className="collapse-title flex flex-row-2 rounded-top text-primary normal-case peer-checked:bg-primary peer-checked:text-white ">
          <div className="flex w-5/6 ">
            <SectionArrowIcon
              setArrowDirection={setArrowDirection}
              arrowDirection={arrowDirection}
              Checkbox={openRef}
            />
            <p className="font-semibold">{title ?? sectionData.title}</p>
          </div>
          <div className="flex collapse">
            <div
              onClick={() => handleSectionDeletion(sid)}
              className="btn btn-ghost hover:bg-transparent hover:text-primary"
            >
              {/**delete and move buttons on the left side of the section headers */}
              <Icon path={mdiDeleteCircle} size={1.2}></Icon>
            </div>
            <div
              className="flex collapse"
              ref={setNodeRef}
              style={style}
              {...attributes}
              {...listeners}
            >
              <div className="btn btn-ghost hover:bg-transparent hover:text-primary">
                {/**delete and move buttons on the left side of the section headers */}
                <Icon path={mdiDotsVerticalCircle} size={1.2}></Icon>
              </div>
            </div>
          </div>
        </div>

        <div className="collapse-content flex flex-col rounded-lg h-50  w-full rounded space-2 px-128 space-y-5">
          <form onSubmit={handleSectionUpdate(onSubmit)}>
            <div className="pt-5">
              <label htmlFor="title">Nome </label> {/*Title of section*/}
              <input
                type="text"
                defaultValue={sectionData.title ?? ""}
                placeholder={sectionData.title ?? "Nome da seção"}
                className="text-gray-500 flex form-field bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                {...registerSection("title", { required: true })}
                onChange={(e) => setTitle(e.target.value)} //update the section title
              />
              {sectionErrors.title && <span>Este campo é obrigatório!</span>}
              {/** This field is required */}
            </div>

            <div className="pt-5">
              <label htmlFor="title">Descrição </label>{" "}
              {/*description of section*/}
              <textarea
                defaultValue={sectionData.description ?? ""}
                placeholder={sectionData.description ?? "Descrição da seção"}
                className="text-gray-500 form-field bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                {...registerSection("description", { required: true })}
                onChange={(e) => setDescription(e.target.value)} //update the section title
              />
              {sectionErrors.description && (
                <span>Este campo é obrigatório!</span>
              )}
              {/** This field is required */}
            </div>

            <div
              className="hidden"
              onClick={() => {
                onSubmit(sectionData);
              }}
            >
              <input type="submit" ref={subRef} />
            </div>
          </form>

          <ComponentList
            sid={sid}
            components={componentData}
            setComponents={setComponentData}
            addOnSubmitSubscriber={addOnSubmitSubscriber}
          />

          {/**ADD lecture and exercise to the section */}
          <div className="mt-5 flex  w-full h-12 border border-dashed border-gray-400 rounded-lg flex-col-3 justify-center space-x-2">
            {/* The button to open create lecture modal */}
            <label
              htmlFor={`lecture-create-${sid}`}
              onClick={() => setSavedSID(sid)}
              className="btn std-btn bg-inherit hover:bg-transparent border border-transparent rounded-lg flex justify-right space-x-2  mb-5"
            >
              <Icon
                path={mdiPlus}
                size={1}
                className="hover:text-gray-500 text-gray-500 "
              />
              <p className="hover:text-gray-500 text-gray-500 normal-case ">
                Criar nova aula
              </p>
            </label>
            {/* Put this part before </body> tag */}
            <input
              type="checkbox"
              id={`lecture-create-${sid}`}
              className="modal-toggle"
            />
            <CreateLecture
              savedSID={savedSID}
              handleLectureCreation={handleComponentCreation}
            />{" "}
            {/** Create new Lecture */}
            <p className="text-gray-500 flex items-center text:align-right ">
              ou
            </p>
            {/** The button to open create exercise modal */}
            <label
              htmlFor={`exercise-create-${sid}`}
              onClick={() => setSavedSID(sid)}
              className="btn std-btn bg-inherit hover:bg-transparent border border-transparent rounded-lg flex justify-right space-x-2  mb-5"
            >
              <Icon
                path={mdiPlus}
                size={1}
                className="hover:text-gray-500 text-gray-500 "
              />
              <p className="hover:text-gray-500 text-gray-500 normal-case">
                Criar novo exercício
              </p>{" "}
              {/** Create new Exercise */}
            </label>
            <input
              type="checkbox"
              id={`exercise-create-${sid}`}
              className="modal-toggle"
            />
            <CreateExercise
              savedSID={savedSID}
              data={undefined}
              handleExerciseCreation={handleComponentCreation}
            />{" "}
            {/** Create new Exercise */}
          </div>

          {/** PLACEHOLDER FOR NUMBER OF ITEMS IN SECTION*/}
          <div className="flex flex-row-reverse">
            <label htmlFor="description">{componentData.length}/10 items</label>
            {/** PLACEHOLDER TEXT */}
          </div>
        </div>
      </div>
    </div>
  );
}
