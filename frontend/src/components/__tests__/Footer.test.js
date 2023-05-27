import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  test('renders the footer correctly', () => {
    render(<Footer />);

    // Assert that the component renders the footer text
    expect(screen.getByText('SCEVC - WMS')).toBeInTheDocument();
    expect(screen.getByText(/Copyright Team 12/)).toBeInTheDocument();

    // Assert that the component renders the current year
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(currentYear.toString())).toBeInTheDocument();
  });
});
