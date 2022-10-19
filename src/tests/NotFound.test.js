import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Verificar a página NotFound', () => {
  it('Verificar se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const textH2 = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });
    expect(textH2).toBeInTheDocument();
  });

  it('Verificar se a página contém uma imagem', () => {
    renderWithRouter(<NotFound />);

    // referência: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
    expect(img).toHaveAttribute('alt', 'Pikachu crying because the page requested was not found');
  });
});
