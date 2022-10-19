import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verificar a página Pokedex', () => {
  it('Verificar se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const textH2 = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(textH2).toBeInTheDocument();
  });

  it('Verificar se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    const namePok = screen.getByText(/Pikachu/i);
    expect(namePok).toBeInTheDocument();

    const buttonProx = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonProx).toBeInTheDocument();
    userEvent.click(buttonProx);

    const namePok1 = screen.queryByText(/Pikachu/i);
    expect(namePok1).not.toBeInTheDocument();
    const namePok2 = screen.getByText(/Charmander/i);
    expect(namePok2).toBeInTheDocument();
  });

  it('Verificar se existe um botão de filtragem para cada tipo de pokémon, sem repetição', () => {
    renderWithRouter(<App />);

    const buttonFilter = screen.getAllByTestId('pokemon-type-button');
    expect(buttonFilter).toHaveLength(7);
    const typeFire = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(typeFire);
    const quantityFire = screen.getAllByText('Fire');
    expect(quantityFire).toHaveLength(2);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });

  it('Verificar se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);

    const namePok = screen.getByText(/Pikachu/i);
    expect(namePok).toBeInTheDocument();
  });
});
