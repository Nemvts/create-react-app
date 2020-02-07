// @flow
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { render, fireEvent } from '@dealersocket/ds-ui-react/test-utils';
import { StudentTable } from './student-table.component';

const createMockStore = configureMockStore([]);

describe('student-table.component', () => {
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
  const removeStudentAction = jest.fn();
  const toggleStudentAction = jest.fn();
  const toggleStudentsAction = jest.fn();

  it('renders the component with no children', () => {
    const wrapper = render(
      <Provider store={mockStore}>
        <StudentTable
          areAllSelected={false}
          filterCriteria="a"
          isBulkProcessing={false}
          removingStudentIds={[]}
          students={null}
          selectedStudentIds={[]}
          removeStudentAction={removeStudentAction}
          toggleStudentAction={toggleStudentAction}
          toggleStudentsAction={toggleStudentsAction}
        />
      </Provider>
    );
    // This will check inside the tablebody for content
    expect(wrapper.getByTestId('studentRows')).toBeEmpty();
  });

  it('renders sub components', () => {
    const wrapper = render(
      <Provider store={mockStore}>
        <StudentTable
          areAllSelected={false}
          filterCriteria="a"
          isBulkProcessing={false}
          removingStudentIds={[2, 3]}
          students={students}
          selectedStudentIds={[4]}
          removeStudentAction={removeStudentAction}
          toggleStudentAction={toggleStudentAction}
          toggleStudentsAction={toggleStudentsAction}
        />
      </Provider>
    );

    // this is searching by regular expression for tablerows by data-e2e prop
    const studentRows = wrapper.queryAllByTestId(/student-row/g);
    expect(studentRows.length).toEqual(2);
  });

  it('triggers an action when checkbox is selected', () => {
    const wrapper = render(
      <Provider store={mockStore}>
        <StudentTable
          areAllSelected={false}
          filterCriteria="a"
          isBulkProcessing={false}
          removingStudentIds={[2, 3]}
          students={students}
          selectedStudentIds={[4]}
          removeStudentAction={removeStudentAction}
          toggleStudentAction={toggleStudentAction}
          toggleStudentsAction={toggleStudentsAction}
        />
      </Provider>
    );

    const checkbox = wrapper.queryByTestId('all-checkbox');
    expect(checkbox).not.toBeNull();
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(toggleStudentsAction).toHaveBeenCalledTimes(1);
  });
});
