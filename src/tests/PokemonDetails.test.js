import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const details = 'More details';

describe('Verificar o componente PokemonDetails', () => {
  it('Verificar se as informações detalhadas do pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: details });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const title = screen.getByText('Pikachu Details');
    expect(title).toBeInTheDocument();

    expect(detailsLink).not.toBeInTheDocument();

    const textH2 = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(textH2).toBeInTheDocument();

    const p = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    expect(p).toBeInTheDocument();
  });

  it('Verificar se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: details });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const textH2 = screen.getByRole('heading', { name: /Game Locations of Pikachu/i, level: 2 });
    expect(textH2).toBeInTheDocument();

    const imgLocation = screen.getAllByRole('img');
    // graças ao Vitu
    expect(imgLocation[1]).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(imgLocation[1]).toHaveAttribute('alt', 'Pikachu location');

    expect(imgLocation[2]).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
    expect(imgLocation[2]).toHaveAttribute('alt', 'Pikachu location');
  });

  it('Verificar se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: details });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const checkFav = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkFav).toBeInTheDocument();
    userEvent.click(checkFav);

    expect(checkFav.checked).toEqual(true);
    userEvent.click(checkFav);
    expect(checkFav.checked).toEqual(false);
  });
});
