import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WalletKitProvider } from '@mysten/wallet-kit'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalletKitProvider
      features={['sui:signTransactionBlock']}
      enableUnsafeBurner={false}
      customMessages={{
        SIGN_TX_APPROVAL_MESSAGE: "This transaction will cost 0.001 SUI",
        CONNECT_WALLET_DESCRIPTION: "Connect your wallet to generate secure passwords"
      }}
    >
      <App />
    </WalletKitProvider>
  </React.StrictMode>,
)
