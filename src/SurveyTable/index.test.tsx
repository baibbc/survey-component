import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import SurveyTable from './index';

describe('<SurveyTable />', () => {
  it('render SurveyTable with dumi', () => {
    const msg = 'dumi';

    render(<SurveyTable title={msg} />);
    expect(screen.queryByText(msg)).toBeInTheDocument();
  });
});
