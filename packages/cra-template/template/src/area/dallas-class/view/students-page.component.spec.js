// @flow
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { render, fireEvent } from '@dealersocket/ds-ui-react/test-utils';
import { StudentsPageComp } from './students-page.component';

const createMockStore = configureMockStore([]);

describe('students-page.component', () => {
  const mockStore = createMockStore({
    dallasClassSlice: {
      filterCriteria: '',
      isBulkProcessing: false,
      isLoading: false,
      removingStudentIds: [],
      selectedStudentIds: [],
      students: null,
    },
    languageSlice: {
      locale: 'en',
    },
  });

  const photo =
    'https://dealersocket.atlassian.net/wiki/aa-avatar/7138eae229df444c38747b80445d27bb';
  const students = [
    {
      id: 1,
      first: 'Eric',
      last: 'Melton',
      ide: 'VS Code',
      language: 'ES+',
      photo,
    },
    {
      id: 2,
      first: 'Brian',
      last: 'George',
      ide: 'WebStorm',
      language: 'ES+',
      photo,
    },
  ];
  const loadStudentsAction = jest.fn();
  const clearStudentsAction = jest.fn();
  const removeSelectedStudentsAction = jest.fn();
  const setFilterCriteriaAction = jest.fn();

  it('renders sub components with expected props', () => {
    const wrapper = render(
      <Provider store={mockStore}>
        <StudentsPageComp
          filterCriteria="a"
          isBulkProcessing={false}
          isLoading={false}
          isOneSelected={false}
          students={students}
          loadStudentsAction={loadStudentsAction}
          clearStudentsAction={clearStudentsAction}
          removeSelectedStudentsAction={removeSelectedStudentsAction}
          setFilterCriteriaAction={setFilterCriteriaAction}
        />
      </Provider>
    );
    const filterInput = wrapper.getByTestId('FilterField');
    expect(filterInput.value).toEqual('a');

    const mockEvent = { target: { value: 'z' } };
    fireEvent.change(filterInput, mockEvent);
    expect(setFilterCriteriaAction).toHaveBeenCalledTimes(1);

    const clearButton = wrapper.getByTestId('student_clear');
    fireEvent.click(clearButton);
    expect(clearStudentsAction).toHaveBeenCalledTimes(1);

    const loadButton = wrapper.getByTestId('student_load');
    expect(loadButton).not.toBeDisabled();

    fireEvent.click(loadButton);
    expect(loadStudentsAction).toHaveBeenCalledTimes(2);
  });

  it('renders disabled loading button', () => {
    const wrapper = render(
      <Provider store={mockStore}>
        <StudentsPageComp
          filterCriteria="a"
          isBulkProcessing={false}
          isLoading
          isOneSelected={false}
          students={students}
          loadStudentsAction={loadStudentsAction}
          clearStudentsAction={clearStudentsAction}
          removeSelectedStudentsAction={removeSelectedStudentsAction}
          setFilterCriteriaAction={setFilterCriteriaAction}
        />
      </Provider>
    );

    const loadButton = wrapper.getByTestId('student_load');
    expect(loadButton).toBeDisabled();
    expect(loadButton).toHaveTextContent('Loading...');
  });

  it('Remove Selected button is enabled', () => {
    const wrapper = render(
      <Provider store={mockStore}>
        <StudentsPageComp
          filterCriteria="a"
          isBulkProcessing={false}
          isLoading={false}
          isOneSelected
          students={students}
          loadStudentsAction={loadStudentsAction}
          clearStudentsAction={clearStudentsAction}
          removeSelectedStudentsAction={removeSelectedStudentsAction}
          setFilterCriteriaAction={setFilterCriteriaAction}
        />
      </Provider>
    );

    const button = wrapper.getByTestId('student_remove_selected');
    expect(button).not.toBeDisabled();

    fireEvent.click(button);
    expect(removeSelectedStudentsAction).toHaveBeenCalledTimes(1);
  });

  it('Remove Selected button is disabled', () => {
    const wrapper = render(
      <Provider store={mockStore}>
        <StudentsPageComp
          filterCriteria="a"
          isBulkProcessing
          isLoading={false}
          isOneSelected
          students={students}
          loadStudentsAction={loadStudentsAction}
          clearStudentsAction={clearStudentsAction}
          removeSelectedStudentsAction={removeSelectedStudentsAction}
          setFilterCriteriaAction={setFilterCriteriaAction}
        />
      </Provider>
    );

    const button = wrapper.getByTestId('student_remove_selected');
    expect(button).toBeDisabled();
  });
});
