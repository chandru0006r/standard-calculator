import { render, screen } from '@testing-library/react';
import App from '../App';

it('renders login page', () => {
  render(<App />);
  expect(screen.getByText(/Trust-Ed-Chain/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
});
