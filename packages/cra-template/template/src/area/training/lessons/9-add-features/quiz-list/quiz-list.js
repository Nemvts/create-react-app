// @flow
import React from 'react';
import { QuizRowContainer } from './quiz-row';

type QuizListProps = {
  quizzes: any[],
  selectQuizAction: (quizId: number) => void,
  selectedQuizId: ?string,
};

export const QuizList = (props: QuizListProps) => {
  const { quizzes, selectedQuizId = null, selectQuizAction } = props;

  return (
    <div>
      {quizzes.map(quiz => (
        <QuizRowContainer
          key={quiz.id}
          quiz={quiz}
          isSelected={quiz.id === selectedQuizId}
          onSelect={() => selectQuizAction(quiz.id)}
        />
      ))}
    </div>
  );
};
