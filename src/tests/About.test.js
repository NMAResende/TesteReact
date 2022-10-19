import { screen } from '@testing-library/react';
import React from 'react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Verificar se a página contém informações sobre a Pokédex', () => {
  it('Verificar se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const textH2 = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(textH2).toBeInTheDocument();
  });

  it('Verificar se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const p1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');
    expect(p1).toBeInTheDocument();

    const p2 = screen.getByText('One can filter Pokémons by type, and see more details for each one of them');
    expect(p2).toBeInTheDocument();
  });

  it('Verificar se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    // referência: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    const imgPokedex = screen.getByRole('img');
    expect(imgPokedex).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
    expect(imgPokedex).toHaveAttribute('alt', 'Pokédex');
  });
});
