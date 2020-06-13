import React, { FunctionComponent } from 'react';
import Game from './components/Game';
import { createGlobalStyle } from 'styled-components';
import gameBackgroundImage from './resources/game_bg.jpg';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, Helvetica, sans-serif;
    background-image: url(${gameBackgroundImage});
    text-align: center;
    color: #fff;
    font-size: 16px;
    overflow: hidden;
  }
`;

const App: FunctionComponent = () => (
  <div>
    <GlobalStyle />
    <Game />
  </div>
)

export default App;
