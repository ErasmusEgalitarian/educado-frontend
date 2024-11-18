import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@components/Table";
import { CoursesUpdateButton } from "@components/Admin/Courses/Actions/CoursesUpdateButton";
import { CoursesDeleteButton } from "@components/Admin/Courses/Actions/CoursesDeleteButton";
import { SearchBar } from "@components/SearchBar/SearchBar";
import { IconContext } from "react-icons";
import { MdStar } from "react-icons/md";
import { getUserToken } from "@helpers/userInfo";
import { Course } from "@interfaces/Course";
import courseService from "@services/course.services";
import useSWR from "swr";

export const CoursesTableAdmin = () => {
  const [filteredCourseData, setFilteredCourseData] = useState<Course[] | null>(
    null
  );

  const userToken = getUserToken();
  const { data: coursesResponse, mutate } = useSWR("api/courses", () =>
    courseService.getAllCourses(userToken)
  );

  useEffect(() => {
    if (coursesResponse !== undefined) {
      setFilteredCourseData(coursesResponse);
    }
  }, [coursesResponse]);

  //this should be generalized more and turned into a hook
  const searchFunction = (searchString: string) => {
    if (!coursesResponse) return coursesResponse;

    const filteredData = coursesResponse.filter((course) => {
      if (searchString === "") return course;
      //what should be searchable?
      const fieldsToCheck = [
        "title",
        "creator",
        "category",
        "numOfSubscriptions",
        "rating",
      ] as Array<Partial<keyof typeof course>>;

      return fieldsToCheck.some((field) => {
        const valueToSearch = course[field];

        switch (typeof valueToSearch) {
          case "string":
            return valueToSearch
              .toLowerCase()
              .includes(searchString.toLowerCase());
          case "number":
            return valueToSearch === Number(searchString);
          default:
            return false;
        }
      });
    });

    setFilteredCourseData(filteredData);
  };

  const rows = filteredCourseData?.map((course, key) => {
    return (
      <tr key={`${course.title}-${key}`} className="border-b-2">
        <td>
          <p>{course.title}</p>
        </td>
        <td>
          <p>{course.creator}</p>
        </td>
        <td>
          <p>{course.category}</p>
        </td>
        <td>
          <p>{`${course.numOfSubscriptions} alunos`}</p>
        </td>
        <td className="flex align-middle items-center border-transparent">
          <p className="text-yellow-400 font-bold align-middle">
            <MdStar className="text-yellow-400" />
            {course.rating?.toFixed(1)}
          </p>
        </td>
        <td>
          <div className="flex flex-wrap justify-end gap-2">
            <div>
              <CoursesUpdateButton course={course} refreshFn={mutate} />
            </div>
            <div>
              <CoursesDeleteButton courseId={course._id!} refreshFn={mutate} />
            </div>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <TableContainer>
      <SearchBar
        sortingOptions={[
          { displayName: "Mais recentes", htmlValue: "most-recent" },
        ]}
        searchFn={searchFunction}
      />
      <Table>
        <TableHead>
          <TableRow
            isHeaderRow
            //figure way to handle react keys in a nice way
            cells={[
              <TableCell>
                <p>Nome</p>
              </TableCell>,
              <TableCell>
                <p>Criador de Conteúdo</p>
              </TableCell>,
              <TableCell>
                <p>Categoria</p>
              </TableCell>,
              <TableCell>
                <p>Inscritos</p>
              </TableCell>,
              <TableCell>
                <p>Nota</p>
              </TableCell>,
              <TableCell>{/* Empty col for actions */}</TableCell>,
            ]}
          />
        </TableHead>
        <TableBody>
          {/* Icon context to give all the react-icons in the rows the same options */}
          <IconContext.Provider value={{ size: "20" }}>
            {rows}
          </IconContext.Provider>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
