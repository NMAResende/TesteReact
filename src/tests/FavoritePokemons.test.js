import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verificar a página de Pokémons favoritos', () => {
  it('Verificar se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha pokémons favoritos', () => {
    renderWithRouter(<App />);

    const favPok = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favPok).toBeInTheDocument();
    userEvent.click(favPok);
    const empty = screen.getByText('No favorite pokemon found');
    expect(empty).toBeInTheDocument();
  });

  it('Verificar se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const checkbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const namePok = screen.getByTestId('pokemon-name');
    expect(namePok).toBeInTheDocument();
    const typePok = screen.getByTestId('pokemon-type');
    expect(typePok).toBeInTheDocument();
    const AveragePok = screen.getByTestId('pokemon-weight');
    expect(AveragePok).toBeInTheDocument();
  });
});
