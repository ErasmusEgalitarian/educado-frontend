import Checklist from "../components/Checklist";
import Layout from "../components/Layout";
import { CourseComponent } from "../components/Courses/CourseComponent";
import { SectionCreation } from "../components/SectionCreation";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserToken } from '../helpers/userInfo';

const CourseManager = () => {
  const token = getUserToken();
  const { id: paramId, tick: paramTick } = useParams();

  // Ensure id and tick are valid integers or default to 0
  const id = parseInt(paramId ?? "0");
  const tick = parseInt(paramTick ?? "0");

  const [tickChange, setTickChange] = useState<number>(tick);
  const [formComponents, setFormComponents] = useState<JSX.Element[]>([]);

  useEffect(() => {
    // Update formComponents based on tickChange
    const components: JSX.Element[] = [
      <CourseComponent token={token} id={id} setTickChange={setTickChange} setId={setId} />,
      <SectionCreation id={id.toString()} token={token} setTickChange={setTickChange} />
    ];
    setFormComponents(components);
  }, [id, token]);

  function setId(idInput: string) {
    // Implement setId logic if needed
  }

  return (
    <Layout meta="Course Manager">
      <div className="flex flex-row">
        <Checklist tickChange={tickChange} />

        {/* Component renderer */}
        <div className='flex-none w-2/3  mr-20'>
          {formComponents[tickChange] || <p>Component not found</p>}
        </div>
      </div>
    </Layout>
  );
};

export default CourseManager;
