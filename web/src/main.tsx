import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { StarknetConfig, argent, braavos, publicProvider } from '@starknet-react/core';
import { mainnet, goerli } from '@starknet-react/chains';

const chains = [mainnet, goerli];
const connectors = [argent(), braavos()];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StarknetConfig
      chains={chains}
      connectors={connectors}
      provider={publicProvider()}
      autoConnect
    >
      <App />
    </StarknetConfig>
  </React.StrictMode>,
);