import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verificar o componente Pokemon', () => {
  it('Verificar se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const title = screen.getByText('Pikachu Details');
    expect(title).toBeInTheDocument();

    const namePok = screen.getByTestId('pokemon-name');
    expect(namePok).toHaveTextContent(/Pikachu/i);
    const typePok = screen.getByTestId('pokemon-type');
    expect(typePok).toHaveTextContent(/electric/i);
    const AveragePok = screen.getByTestId('pokemon-weight');
    expect(AveragePok).toHaveTextContent(/Average weight: 6.0 kg/i);
    const imgPok = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(imgPok).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
    expect(imgPok).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Verificar se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const checkFav = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkFav).toBeInTheDocument();
    userEvent.click(checkFav);

    const imgPok1 = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(imgPok1).toBeInTheDocument();
    expect(imgPok1).toHaveAttribute(
      'src',
      '/star-icon.svg',
    );
    expect(imgPok1).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
