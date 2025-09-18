import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  mdiDeleteCircle,
  mdiDotsVerticalCircle,
  mdiDraw,
  mdiPencilCircle,
  mdiTextBox,
  mdiVideo,
} from "@mdi/js";
import { Icon } from "@mdi/react";
import { set } from "cypress/types/lodash";
import { useState, useEffect } from "react";
import useSWR from "swr";

import { EditLecture } from "../../../../components/EditLecturePopUp";
import { EditExercise } from "../../../../features/exercises/components/EditExercisePopUp";
import { getUserToken } from "../../../../features/user/utilities/get-local-user";
import LectureService from "../../../../services/lecture.services";
import { BACKEND_URL } from "../../../constants/environment";

// Hooks

// icons

import ExerciseServices from "../../../services/exercise.services";
import { Component } from "../../../types/SectionInfo";

//pop-ups

interface Props {
  component: Component;
  setComponents: Function;
}

export const SortableComponentItem = ({ component, setComponents }: Props) => {
  const token = getUserToken();
  const [data, setData] = useState<any>();
  const [newTitle, setNewTitle] = useState("");
  // Fetch the section data from the server.
  //  const { data, error } = useSWR(
  //     token ? [cid, map.get(cid), token] : null,
  //     ComponentService.getComponentDetail
  //   );

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      const url = `${BACKEND_URL}/api/${component.compType}s/${component.compId}`;
      const fetcher =
        component.compType === "lecture"
          ? LectureService.getLectureDetail
          : ExerciseServices.getExerciseDetail;

      try {
        const res = await fetcher(url, token);
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: component.compId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function handleEdit(newTitle: string) {
    setData((prevData: any) => {
      return { ...prevData, title: newTitle };
    });
  }

  useEffect(() => {
    if (data) {
      setNewTitle(data.title);
    }
  }, [data]);

  async function handleDelete() {
    if (confirm("Tem certeza de que deseja excluir esse componente?")) {
      if (component.compType === "lecture") {
        await LectureService.deleteLecture(component.compId, token);
      } else {
        await ExerciseServices.deleteExercise(component.compId, token);
      }
      setComponents((prevComponents: Component[]) =>
        prevComponents.filter((comp) => comp.compId !== component.compId)
      );
    }
  }

  //If data is not found yet, show a loading message.
  if (data === undefined) {
    return <p>Loading...</p>;
  }

  //Else show the sections.
  return (
    <div>
      <div className="w-full rounded border bg-white shadow-lg rounded-lg mb-4">
        <div className="flex flex-row-2 space-y-2 bg-secondary">
          <div className="flex flex-row-2 space-x-2 text-primary items-center ml-5 flex w-5/6 text-right">
            {component.compType === "exercise" ? (
              <Icon path={mdiDraw} size={1} />
            ) : data.contentType === "video" ? (
              <Icon path={mdiVideo} size={1} />
            ) : (
              <Icon path={mdiTextBox} size={1} />
            )}
            <p className="font-semibold">{newTitle}</p>
          </div>

          <div className="flex -space-x-6 text-primary ">
            {/**edit a lecture or exercise and pencil icon*/}
            <label
              htmlFor={component.compType + "-edit-" + data._id}
              className="btn btn-ghost hover:bg-transparent hover:text-primaryHover"
            >
              <Icon path={mdiPencilCircle} size={1.2} />
            </label>

            <input
              type="checkbox"
              id={component.compType + "-edit-" + data._id}
              className="modal-toggle"
            />
            {component.compType === "lecture" ? (
              <EditLecture data={data} handleEdit={handleEdit} />
            ) : (
              <EditExercise data={data} handleEdit={handleEdit} />
            )}

            {/**delete a lecture or exercise and trash icon*/}
            <div
              className="btn btn-ghost hover:bg-transparent hover:text-primaryHover"
              onClick={() => handleDelete()}
            >
              <Icon path={mdiDeleteCircle} size={1.2} />
            </div>

            <div
              className=""
              ref={setNodeRef}
              style={style}
              {...attributes}
              {...listeners}
            >
              {/**Move a lecture or exercise and "move" icon*/}
              <div className="btn btn-ghost hover:bg-transparent hover:text-primaryHover">
                <Icon path={mdiDotsVerticalCircle} size={1.2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
