// @flow
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { render, fireEvent } from '@dealersocket/ds-ui-react/test-utils';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { StudentTableRow } from './student-table-row.component';

const createMockStore = configureMockStore([]);

describe('student-table-row.component', () => {
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
  const student = {
    id: 1,
    first: 'Andrea',
    last: 'Wyss',
    ide: 'WebStorm',
    language: 'ES+',
    photo,
  };
  const removeStudentAction = jest.fn();
  const toggleStudentAction = jest.fn();

  it('renders sub components with expected props', () => {
    const wrapper = render(
      <Provider store={mockStore}>
        <Table>
          <TableBody>
            <StudentTableRow
              filterCriteria="a"
              isBulkProcessing={false}
              removingStudentIds={[]}
              student={student}
              selectedStudentIds={[]}
              removeStudentAction={removeStudentAction}
              toggleStudentAction={toggleStudentAction}
            />
          </TableBody>
        </Table>
      </Provider>
    );
    const studentRows = wrapper.queryAllByTestId(/student-row/g);
    expect(studentRows.length).toEqual(1);

    const checkbox = wrapper.getByTestId('student-checkbox');
    expect(checkbox.checked).toEqual(false);

    fireEvent.click(checkbox);
    expect(toggleStudentAction).toHaveBeenCalledTimes(1);

    const avatar = wrapper.queryByTestId('contactAvatar');
    expect(avatar).not.toBeNull();

    const button = wrapper.queryByTestId(`student_remove.${student.id}`);
    expect(button.disabled).toEqual(false);

    fireEvent.click(button);
    expect(removeStudentAction).toHaveBeenCalledTimes(1);
    expect(removeStudentAction).toHaveBeenCalledWith(student);
  });

  it('renders selected mode', () => {
    const wrapper = render(
      <Provider store={mockStore}>
        <Table>
          <TableBody>
            <StudentTableRow
              filterCriteria=""
              isBulkProcessing={false}
              removingStudentIds={[]}
              student={student}
              selectedStudentIds={[1]}
              removeStudentAction={removeStudentAction}
              toggleStudentAction={toggleStudentAction}
            />
          </TableBody>
        </Table>
      </Provider>
    );

    const checkbox = wrapper.getByTestId('student-checkbox');
    expect(checkbox.checked).toEqual(true);
  });

  it('renders removing mode', () => {
    const wrapper = render(
      <Provider store={mockStore}>
        <Table>
          <TableBody>
            <StudentTableRow
              filterCriteria=""
              isBulkProcessing={false}
              removingStudentIds={[1]}
              student={student}
              selectedStudentIds={[1]}
              removeStudentAction={removeStudentAction}
              toggleStudentAction={toggleStudentAction}
            />
          </TableBody>
        </Table>
      </Provider>
    );

    const button = wrapper.getByTestId(`student_remove.${student.id}`);
    expect(button.disabled).toEqual(true);
  });
});
