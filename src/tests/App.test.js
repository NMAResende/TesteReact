import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verificar se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('Verificar se o topo da aplicação tem o link de navegação Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verificar se o topo da aplicação tem o link de navegação About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verificar se o topo da aplicação tem o link de navegação Favorite Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const favLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favLink).toBeInTheDocument();
    userEvent.click(favLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Verificar se o topo da aplicação tem o link de navegação NotFound', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pagina/que-nao-existe/');
    });

    const noFoundPage = screen.getByRole(
      'heading',
      { name: /Page requested not found/i },
    );
    expect(noFoundPage).toBeInTheDocument();
  });
});
