import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Homepage from '../src/pages/Homepage';


test('renders the Start Planning link', () => {
  render(
    <BrowserRouter>
      <Homepage />
    </BrowserRouter>
  );
  const linkElement = screen.getByRole('link', { name: /Start Planning/i });
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute('href', '/login');
});
