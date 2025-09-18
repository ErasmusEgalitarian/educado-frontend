import { Lecture } from "../interfaces/Lecture";

import LectureDetail from "./LectureDetail";

/**
 * A component that displays a list of lectures
 * @param lectures: Array of lectures
 * @returns A list of lectures
 */
export const LectureArea = ({ lectures }: { lectures: Lecture[] }) => {
  return (
    <div className="flex-start flex-col space-y-4">
      {lectures.map((lecture, key) => {
        return (
          <div className="collapse flex-inherit rounded" key={key}>
            <input type="checkbox" className="peer w-full" />
            <div className="collapse-title flex-start bg-primary text-primary-content peer-checked:bg-primaryLight peer-checked:text-secondary-content">
              <p className="font-semibold">{`# ${key + 1} - ${lecture.title}`}</p>
            </div>

            <div className="collapse-content">
              <LectureDetail lecture={lecture} lid={lecture._id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
