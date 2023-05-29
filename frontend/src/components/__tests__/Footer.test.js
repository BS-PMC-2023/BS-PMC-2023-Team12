import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

test('renders the Footer component with the correct content', () => {
    render(<Footer />);
  
    // Assert that the component renders correctly
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  
    // Assert that the component contains the correct text
    const footerText = screen.getByText('SCEVC - WMS');
    expect(footerText).toBeInTheDocument();
  });
