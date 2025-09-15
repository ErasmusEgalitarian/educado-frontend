import { mdiPlus } from "@mdi/js";
import { Icon } from "@mdi/react";
import { useForm, SubmitHandler } from "react-hook-form";

// Hooks
import { useParams } from "react-router-dom";

import { getUserToken } from "../../helpers/userInfo";

// Services
import SectionServices from "../../services/section.services";

// Icons

interface Inputs {
  title: string;
}

interface Props {
  setSections: (updateFn: (prevSections: any[]) => any[]) => void;
}

export const SectionForm = ({ setSections }: Props) => {
  const token = getUserToken();
  const { id } = useParams();

  // React useForm setup
  const { handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.title = "Nova seção";
    SectionServices.createSection(data, id, token)
      .then((res) => {
        console.log(res.data._id);
        setSections((prevSections) => [...prevSections, res.data._id]); // Add new section to the list and cause a rerender
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button className="mt-5 flex bg-transparent hover:bg-transparent h-10 w-full float-right space-y-4 btn std-btn border border-dashed border-gray-400">
        <p className="hover:text-gray text-gray-500 normal-case font-semibold flex items-center text-align:center">
          <Icon path={mdiPlus} size={1} className="" />
          Nova seção
        </p>
      </button>
    </form>
  );
};
