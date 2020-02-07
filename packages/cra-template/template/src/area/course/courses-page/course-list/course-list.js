// @flow
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { CourseListRow } from '../course-list-row/course-list-row';

type CourseListProps = {
  authors: ?(any[]),
  courses: ?(any[]),
};

export const CourseList = ({ authors, courses }: CourseListProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Title</TableCell>
          <TableCell>Author</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Length</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {courses &&
          courses.map(course => (
            <CourseListRow
              key={course.id}
              course={course}
              authors={authors || []}
            />
          ))}
      </TableBody>
    </Table>
  );
};
