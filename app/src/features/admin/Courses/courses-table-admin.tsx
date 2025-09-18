import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconContext } from "react-icons";
import { MdStar } from "react-icons/md";
import useSWR from "swr";

import { CoursesDeleteButton } from "@admin/Courses/Actions/courses-delete-button";
import { CoursesUpdateButton } from "@admin/Courses/Actions/courses-update-button";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  PaginationBottomBar,
} from "@common/components/Table";
import { usePagination } from "@common/hooks/use-pagination";
import { SearchBar } from "@common/layout/SearchBar";
import { getAllCourses } from "@courses/api/course-queries";
import { CreatorPopulatedCourse } from "@courses/types/Course";

export const CoursesTableAdmin = () => {
  const { t } = useTranslation();
  const [filteredCourses, setFilteredCourses] = useState<
    CreatorPopulatedCourse[]
  >([]);

  const { data: coursesResponse, mutate } = useSWR("api/courses", () =>
    getAllCourses()
  );

  useEffect(() => {
    if (coursesResponse !== undefined) setFilteredCourses(coursesResponse);
  }, [coursesResponse]);

  //this should be generalized more and turned into a hook
  const searchFunction = (searchString: string) => {
    if (!coursesResponse) return;

    const filteredItems = coursesResponse.filter((course): boolean => {
      if (searchString === "") return true;

      // this will be typed in a better way when a hook is made
      const fieldsToCheck = [
        "title",
        "creator",
        "category",
        "numOfSubscriptions",
        "rating",
      ] as const;

      // TODO: This logic is broken. The user is always defined and it will return early?
      // Thus the fieldsToCheck.some will never be executed.
      const user = course.creator.baseUser;
      //if (user) {
      const nameString = `${user.firstName} ${user.lastName}`;
      return nameString.toLowerCase().includes(searchString.toLowerCase());
      //}
      /*
      return fieldsToCheck.some((field) => {
        const valueToSearch = course[field];

        if (valueToSearch == null || valueToSearch == undefined) return false;

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
      });*/
    });
    handleResetPagination();
    setFilteredCourses(filteredItems);
  };

  const {
    isPaginated,
    paginatedItems: paginatedCourses,
    currentPage,
    itemsPerPage,
    handleChangePage,
    handleChangeItemsPerPage,
    handleResetPagination,
  } = usePagination(filteredCourses, 10);

  const rows = paginatedCourses.map((course, key) => {
    const fullName = `${course.creator.baseUser.firstName} ${course.creator.baseUser.lastName}`;

    return (
      //find a nice way to handle react keys
      <TableRow
        key={`${course.title}-${String(key)}`}
        cells={[
          <TableCell key={`title-${course._id}`}>
            <p className="whitespace-normal">{course.title}</p>
          </TableCell>,
          <TableCell key={`creator-${course._id}`}>
            {fullName && <p className="whitespace-normal">{fullName}</p>}
          </TableCell>,
          <TableCell key={`category-${course._id}`}>
            {course.category && (
              <p className="whitespace-normal">
                {course.category.charAt(0).toLocaleUpperCase() +
                  course.category.slice(1)}
              </p>
            )}
          </TableCell>,
          <TableCell key={`subscriptions-${course._id}`}>
            {course.numOfSubscriptions && (
              <p className="whitespace-normal">{`${course.numOfSubscriptions} ${t("courses.students")}`}</p>
            )}
          </TableCell>,
          <TableCell key={`rating-${course._id}`}>
            <div className="flex space-x-1">
              <MdStar className="text-yellow-400 self-center" />
              <p className="text-yellow-400 text-lg font-bold">
                {course.rating?.toFixed(1)}
              </p>
            </div>
          </TableCell>,
          <TableCell key={`actions-${course._id}`}>
            <div className="flex flex-wrap justify-end gap-2">
              <div>
                <CoursesUpdateButton course={course} refreshFn={mutate} />
              </div>
              <div>
                <CoursesDeleteButton courseId={course._id} refreshFn={mutate} />
              </div>
            </div>
          </TableCell>,
        ]}
      />
    );
  });

  return (
    <TableContainer>
      <SearchBar
        sortingOptions={[
          { displayName: "Mais recentes", htmlValue: "most-recent" },
        ]}
        placeholderText="Buscar Cursos"
        searchFn={searchFunction}
      />
      <Table>
        <TableHead>
          <TableRow
            isHeaderRow
            cells={[
              <TableCell key="name">
                <p>{t("courses.title")}</p>
              </TableCell>,
              <TableCell key="creator">
                <p>{t("courses.instructor")}</p>
              </TableCell>,
              <TableCell key="category">
                <p>{t("courses.category")}</p>
              </TableCell>,
              <TableCell key="subscribers">
                <p>{t("courses.subscriptions")}</p>
              </TableCell>,
              <TableCell key="rating">
                <p>{t("courses.rating")}</p>
              </TableCell>,
              <TableCell key="actions">
                {/* Empty col for actions */}
              </TableCell>,
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
      {coursesResponse && isPaginated && (
        <PaginationBottomBar
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          unpaginatedItemsAmount={filteredCourses.length}
          onChangePage={handleChangePage}
          onChangeItemsPerPage={handleChangeItemsPerPage}
        />
      )}
    </TableContainer>
  );
};
