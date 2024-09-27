import { CourseComponent } from "../components/Courses/CourseComponent";
import { SectionCreation } from "../components/SectionCreation";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getUserToken } from '../helpers/userInfo';
import { BACKEND_URL } from '../helpers/environment';
import Checklist from "../components/Checklist";
import Layout from "../components/Layout";
import CourseServices from '../services/course.services';
import useSWR from 'swr';
import Loading from '../components/general/Loading';
import NotFound from '../pages/NotFound';

const CourseManager = () => {
    const token = getUserToken();
    let { id, tick } = useParams();
    const [tickChange, setTickChange] = useState<number>(parseInt(tick ?? "0"));
    const [highestTick, setHighestTick] = useState<number>(0);
    const [courseData, setCourseData] = useState<any>(null);

    const getData = async (url: string, token: string) => {
        const res: any = await CourseServices.getCourseDetail(url, token);
        return res;
    };

    const { data, error } = useSWR(
        token && id !== "0" ? [`${BACKEND_URL}/api/courses/${id}`, token] : null,
        getData
    );

    useEffect(() => {
        if (id === "0") {
            setCourseData({ title: "", description: "", category: "", difficulty: "", status: "draft", sections: [] });
        } else if (data) {
            setCourseData(data);
            let maxTick = 0;
            if (data.title && data.description && data.category && data.difficulty && data.status) {
                maxTick = 1;
            }
            if (data.sections && data.sections.length > 0 && data.isReviewed) {
                maxTick = 2;
            }
            setHighestTick(maxTick);
        }
    }, [data, id]);

    function handleTickChange(newTick: number) {
        setTickChange(newTick);
        if(newTick > highestTick) {
            setHighestTick(newTick);
        }
    }

    function setId(idInput: string) {
        id = idInput;
    }

    function updateHighestTick(newHighestTick: number) {
        setHighestTick(newHighestTick);
    }

    if (!data && id !== "0") return <Layout meta='course overview'><Loading /></Layout>;
    if (error) return <NotFound />;

    return (
        <Layout meta="Course Manager">
            <div className="flex flex-row">
                <Checklist tickChange={tickChange} highestTick={highestTick} id={id ?? ""} setTickChange={handleTickChange} />
                <div className='flex-none w-2/3 mr-20'>
                    {tickChange === 0 && <CourseComponent token={token} id={id} setTickChange={handleTickChange} setId={setId} courseData={courseData} updateHighestTick={updateHighestTick} />}
                    {tickChange === 1 && <SectionCreation id={id ?? ""} token={token} setTickChange={handleTickChange} />}
                </div>
            </div>
        </Layout>
    );
};

export default CourseManager;