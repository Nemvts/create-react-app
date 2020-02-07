// @flow
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const getAuthorNameByIdSelector = (authors, authorId) => {
  if (authors && authorId) {
    const found = authors.find(author => author.id === authorId);
    return found ? `${found.firstName} ${found.lastName}` : '';
  }
  return '';
};

type CourseListRowProps = {
  authors: any[],
  course: any,
};

export const CourseListRow = ({ authors = [], course }: CourseListRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <a href={course.watchHref} target="_blank" rel="noopener noreferrer">
          Watch
        </a>
      </TableCell>
      <TableCell>
        <Link to={`/course/${course.id}`}>{course.title}</Link>
      </TableCell>
      <TableCell>
        {getAuthorNameByIdSelector(authors, course.authorId)}
      </TableCell>
      <TableCell>{course.category}</TableCell>
      <TableCell>{course.length}</TableCell>
    </TableRow>
  );
};
