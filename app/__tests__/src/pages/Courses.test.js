import renderer from 'react-test-renderer';
import { describe, it, expect } from '@jest/globals'
import { generateTestCourse } from '../../../__testUtils__/courses/courseTestUtils';

// Components
import Courses from '../../../src/pages/Courses';
import { MemoryRouter } from "react-router-dom"

let mockedCourses = [];

// TODO: This can possible be moved to __mocks__ folder, needs to be somewhat dynamic though
jest.mock('../../../src/services/course.services', () => ({
  getAllCourses: jest.fn(async () => {
    return mockedCourses;
  }),
}));

jest.mock('../../../src/helpers/userInfo', () => ({
  getUserInfo: jest.fn(() => {
    return {
      id: 1,
      name: 'Test User',
      email: '',
    }
  })
}));

jest.mock('../../../src/helpers/environment', () => ({
  BACKEND_URL: 'http://localhost:8888',
  REFRESH_TOKEN_URL: 'http://localhost:8888/auth/refresh/jwt'
}));

// Mock course cards to avoid having to update snapshots if they change
jest.mock('../../../src/components/Courses/CourseListCard', () => ({
  CourseListCard: () => <div>CourseListCard</div>,
}));

// TODO: I'd rather these tests didn't use snapshots
describe('courses page', () => {
  it('shows empty state when no courses are found', async () => {
    mockedCourses = [];

    let component;
    await renderer.act(async () => {
      component = renderer.create(
        <MemoryRouter>
          <Courses />
        </MemoryRouter>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('does not show empty state when at least one course is found', async () => {
    mockedCourses = [
      generateTestCourse(),
    ];

    let component;
    await renderer.act(async () => {
      component = renderer.create(
        <MemoryRouter>
          <Courses />
        </MemoryRouter>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
