import renderer from 'react-test-renderer';
import { describe, it, expect } from '@jest/globals'
import { generateTestCourse } from '../../../../__testUtils__/courses/courseTestUtils';

// Components
import PersonalInsights from '../../../../src/components/Courses/PersonalInsights';

// mocks
jest.mock('../../../../src/helpers/userInfo', () => ({
  getUserInfo: jest.fn(() => {
    return {
      id: 1,
      name: 'Test User',
      email: '',
    }
  })
}));


describe('personal insights', () => {
  let courseList = [];
  let component = null;

  beforeAll(async () => {
    // Generate two fake courses
    const course = generateTestCourse();
    course.numOfSubscriptions = 100;
    course.rating = 3;
    const course1 = generateTestCourse();
    course1.numOfSubscriptions = 200;
    course1.rating = 4;

    // Added courses to an array
    courseList[0] = course;
    courseList[1] = course1;

    // Create a test component
    await renderer.act(async () => {
      component = renderer.create(
        <PersonalInsights courses={courseList} />
      );
    });

    
  });

  it('renders correctly', () => {
    // Verify that the component is rendered with snapshot
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('gets total subscriber count from all courses', () => {
    // Verify that the displayed subscriber count is equal to the total of courses
    const totalSubscribers = courseList[0].numOfSubscriptions + courseList[1].numOfSubscriptions;
    expect(component.root.findByProps({ id: 'subscribers' }).children[0]).toBe(totalSubscribers.toString());
  });

  it('correctly displays the amount of courses, when there are no courses', () => {
    // Verify that the displayed subscriber count is equal to the total of courses
    const componentNoCourses = renderer.create(<PersonalInsights courses={[]} />);
    expect(componentNoCourses.root.findByProps({ id: 'noCourses' }).children[0]).toBe("Não há dados suficiente")
  });

  it('gets total amount of courses', () => {
    // Verify that the displayed course amount is equal to the total amount of courses
    expect(component.root.findByProps({ id: 'courseAmount' }).children[0]).toBe(courseList.length.toString());
  });

  it('gets average rating from all courses', () => {
    // Verify that the displayed average rating is equal to the average of courses
    const averageRating = (courseList[0].rating + courseList[1].rating) / courseList.length;
    // expect(component.root.findByProps({ testId: 'averageRating' }).children[0]).toBe(averageRating.toString());
    const starRatingElement = component.root.findByProps({ testId: 'averageRating' });
    // Extract the rating value from the StarRating component
    const displayedRating = parseFloat(starRatingElement.props.rating);
    // Verify that the displayed rating matches the expected average rating
    expect(displayedRating).toBe(averageRating);
  });

});