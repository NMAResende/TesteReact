import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from '../renderWithRouter';

describe('Verificar a página Pokedex', () => {
  it('Verificar se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<Pokedex />);

    const textH2 = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(textH2).toBeInTheDocument();

    const buttonProx = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonProx).toBeInTheDocument();
    userEvent.click(buttonProx);
  });
});
