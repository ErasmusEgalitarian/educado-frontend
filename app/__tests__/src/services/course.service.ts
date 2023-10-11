
import CourseServices from '../../../src/services/course.services';

const token = "test token"

describe('createCourse', () => {
  it('should get a response from the server', async () => {
    const course = {
        title: "Unit Test Course",
        category: "",
        level: "",
        time: 0,
        description: ""
    };
    const response = await CourseServices.createCourse(course, token);
    expect(response.status).toBe(200);
  });
});