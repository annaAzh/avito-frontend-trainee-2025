import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from './Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header Component', () => {
  it('should render header', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Объявления/i)).toBeInTheDocument();
    expect(screen.getByText(/Разместить объявление/i)).toBeInTheDocument();
  });
});
