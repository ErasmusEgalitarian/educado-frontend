import { Exercise } from '../interfaces/Exercise'
// import ExerciseDetail from "../pages/ExerciseDetail";

export const ExerciseArea = ({ exercises }: { exercises: Array<Exercise> }) => {
  console.log(exercises);
  return (
    <div className="flex-start flex-col space-y-4">
      {exercises.map((exercise, key) => {
        return (
          <div className="collapse flex-inherit rounded" key={key}>
            <input type="checkbox" className="peer w-full" />
            <div className="collapse-title flex-start bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              <p className="font-semibold">{`# ${key+1} - ${exercise.title}`}</p>
            </div>
            <div className="collapse-content">
              <ExerciseDetail exercise={exercise} eid={exercise._id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
