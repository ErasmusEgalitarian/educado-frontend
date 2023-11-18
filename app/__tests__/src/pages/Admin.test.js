import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from '@jest/globals';
import useSWR from 'swr';
import EducadoAdmin from '../../../src/pages/EducadoAdmin'; 

//Mockdata used to test page
const mockData = {
  data: {
    data: [
      { _id: '1', firstName: 'Joergen', lastName: 'Skovlag', email: 'JoergenSkovlag@gmail.com', joinedAt: '2011-11-11T12:00:00.000Z' },
      { _id: '2', firstName: 'Mads', lastName: 'Ingstrid', email: 'M_Ingstrid@hotmail.com', joinedAt: '2020-02-20T12:00:00.000Z' },
      
    ],
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

describe('EducadoAdmin Component', () => {
  
  it('shows empty state when no content creators are found', async () => {
    //Set the data to null to show empty state
    useSWR.mockReturnValueOnce({ data: null });

    let component;
    await renderer.act(async () => {
        component = renderer.create(
          <MemoryRouter>
            <EducadoAdmin />
          </MemoryRouter>
        );
      });

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('fetches and displays application data correctly', async () => {
    //Set the data to the pre-defined mockData
    useSWR.mockReturnValueOnce({ data: mockData, error: null });

    let component;
    await renderer.act(async () => {
      component = renderer.create(
        <MemoryRouter>
          <EducadoAdmin />
        </MemoryRouter>
      );
    });

    //Define each aspect of the data to ensure everything renders correctly
    const JoergenName = component.root.findAllByProps({id: "name"})[0]
    const JoergenEmail = component.root.findAllByProps({id: "email"})[0]
    const JoergenDate = component.root.findAllByProps({id: "date"})[0]

    const MadsName = component.root.findAllByProps({id: "name"})[1]
    const MadsEmail = component.root.findAllByProps({id: "email"})[1]
    const MadsDate = component.root.findAllByProps({id: "date"})[1]

    //Make sure every aspect of the data is included, and in the correct way
    expect(JoergenName.props.children).toContain("Joergen", "Skovlag");
    expect(JoergenEmail.props.children).toContain("JoergenSkovlag@gmail.com");
    expect(JoergenDate.props.children).toContain("Fri Nov 11 2011 13:00:00 GMT+0100 (Central European Standard Time)");

    expect(MadsName.props.children).toContain("Mads", "Ingstrid");
    expect(MadsEmail.props.children).toContain("M_Ingstrid@hotmail.com");
    expect(MadsDate.props.children).toContain("Thu Feb 20 2020 13:00:00 GMT+0100 (Central European Standard Time)");
 
  });
});