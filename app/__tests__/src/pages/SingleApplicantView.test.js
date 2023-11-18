import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from '@jest/globals';
import useSWR from 'swr';
import SingleApplicantView from '../../../src/pages/SingleApplicantView'; 

//Mockdata used to test page
const mockData = {
  data: {
      applicator: 
        { _id: '1', firstName: 'Joergen', lastName: 'Skovlag', email: 'JoergenSkovlag@gmail.com', joinedAt: '2023-11-16T14:26:01.458+00:00' },
      application:
        { _id: '01', baseUser: "1", academicLevel: "Superior", academicStatus: "Concluída", company: "CompanyName", educationEndDate: "06/24",
        educationStartDate: "08/21", institution: "ITU", major: "Computer Science", motivation: "I like the thing", position: "Web Designer",
        workActivities: "I make the thing", workEndDate: "Current", workStartDate: "05/22" },
    },
};

//Mock swr and jwt, of which the ladder is used to avoid errors
jest.mock('swr');
jest.mock('jwt-decode', () => jest.fn());

//Mock localStorage to avoid errors in the tests
class LocalStorageMock {
    constructor() {
      this.store = {};
    }
    getItem(key) {
      return this.store[key] || null;
    }
  }
  global.localStorage = new LocalStorageMock;

//Mock meta variables to avoid meta import errors
jest.mock('../../../src/helpers/environment', () => ({
  BACKEND_URL: 'http://localhost:8888',
  REFRESH_TOKEN_URL: 'http://localhost:8888/auth/refresh/jwt'
}));

describe('SingleApplicant Component', () => {
  
  it('shows empty state when no content creators are found', async () => {
    //Set the data to null to show empty state
    useSWR.mockReturnValueOnce({ data: null });

    let component;
    await renderer.act(async () => {
        component = renderer.create(
          <MemoryRouter>
            <SingleApplicantView />
          </MemoryRouter>
        );
      });

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('fetches and displays application data correctly', async () => {
    //Set the data to the pre-defined mockData
    useSWR.mockReturnValueOnce({ data: mockData });

    let component;
    await renderer.act(async () => {
      component = renderer.create(
        <MemoryRouter>
          <SingleApplicantView />
        </MemoryRouter>
      );
    });

    //Define each aspect of the data, and ensure everything renders correctly
    const name = component.root.findByProps({id: "name"})
    expect(name.props.children).toContain("Joergen", "Skovl");

    const email = component.root.findByProps({id: "email"})
    expect(email.props.children).toContain("JoergenSkovlag@gmail.com");

    const date = component.root.findByProps({id: "date"})
    expect(date.props.children).toContain("Thu Nov 16 2023 14:26:01 GMT+0000 (Coordinated Universal Time)");

    const academicLevel = component.root.findByProps({id: "academicLevel"})
    expect(academicLevel.props.children).toContain("Superior");

    const academicStatus = component.root.findByProps({id: "academicStatus"})
    expect(academicStatus.props.children).toContain("Concluída");

    const company = component.root.findByProps({id: "company"})
    expect(company.props.children).toContain("CompanyName");

    const educationEndDate = component.root.findByProps({id: "educationEndDate"})
    expect(educationEndDate.props.children).toContain("06/24");

    const educationStartDate = component.root.findByProps({id: "educationStartDate"})
    expect(educationStartDate.props.children).toContain("08/21");

    const major = component.root.findByProps({id: "major"})
    expect(major.props.children).toContain("Computer Science");

    const motivation = component.root.findByProps({id: "motivation"})
    expect(motivation.props.children).toContain("I like the thing");

    const position = component.root.findByProps({id: "position"})
    expect(position.props.children).toContain("Web Designer");

    const institution = component.root.findByProps({id: "institution"})
    expect(institution.props.children).toContain("ITU");
    
    const workActivities = component.root.findByProps({id: "workActivities"})
    expect(workActivities.props.children).toContain("I make the thing");

    const workEndDate = component.root.findByProps({id: "workEndDate"})
    expect(workEndDate.props.children).toContain("Current");

    const workStartDate = component.root.findByProps({id: "workStartDate"})
    expect(workStartDate.props.children).toContain("5/22");
 
  });
});