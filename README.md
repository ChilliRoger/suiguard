# SuiGuard

## 🔐 A Secure Password Generator for Web3 Users

SuiGuard leverages Sui blockchain's Randomness service and cryptographic libraries to create a next-generation password management solution for Web3 users.

## 📋 Overview

SuiGuard is a web application that generates cryptographically secure passwords for Web3 users. It utilizes Sui Randomness for high-entropy generation and Fastcrypto to hash passwords for verification. The React-based GUI allows users to generate, verify, and retrieve their passwords seamlessly, while the application manages user sessions and authentication. A Move smart contract logs usage statistics to help improve the service.

## ✨ Features

- **High-Entropy Password Generation**: Uses Sui's Randomness service to create truly random, cryptographically secure passwords
- **Robust Password Verification**: Employs Fastcrypto for secure password hashing and verification
- **User-Friendly Interface**: Clean React GUI for password generation, verification, and retrieval
- **Secure Sessions**: Custom authentication for secure user sessions
- **Usage Analytics**: Move smart contract that logs anonymous usage statistics

## 🛠️ Technology Stack

- **Frontend**: React
- **Authentication**: Custom authentication system
- **Blockchain**: Sui Blockchain, Sui SDK
- **Cryptography**: Fastcrypto, Sui Randomness
- **Smart Contract**: Move

## 🏗️ Architecture

```
┌─────────────────┐     ┌───────────────────┐     ┌─────────────────┐
│                 │     │                   │     │                 │
│  React Frontend │────▶│  Custom Auth      │────▶│  Sui SDK        │
│                 │     │                   │     │                 │
└────────┬────────┘     └───────────────────┘     └────────┬────────┘
         │                                                  │
         │                                                  ▼
         │                                         ┌─────────────────┐
         │                                         │                 │
         │                                         │ Sui Randomness  │
         │                                         │                 │
         │                                         └────────┬────────┘
         │                                                  │
         ▼                                                  ▼
┌─────────────────┐                               ┌─────────────────┐
│                 │                               │                 │
│  Fastcrypto     │◀──────────────────────────────│  Move Contract  │
│                 │                               │                 │
└────────┬────────┘                               └────────┬────────┘
         │                                                  │
         ▼                                                  ▼
┌─────────────────┐                               ┌─────────────────┐
│  Local Storage  │                               │                 │
│  (Encrypted)    │                               │  Usage Stats    │
│                 │                               │                 │
└─────────────────┘                               └─────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- Sui CLI installed and configured

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/suiguard.git
cd suiguard
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your Sui configuration
```

4. Deploy the Move contract
```bash
sui move build
sui client publish --gas-budget 10000000
```

5. Start the development server
```bash
npm run dev
```

## 📝 Usage

1. **Generate Password**: Select desired password parameters (length, complexity) and click "Generate"
2. **Verify Password**: Input a password to check its strength and security
3. **Store Password**: Optionally store your generated password securely (encrypted in local storage)
4. **Retrieve Password**: Access your stored passwords using your Sui wallet

## 🧠 How It Works

1. **Password Generation**:
   - User requests a new password
   - App connects to Sui Randomness service via SDK
   - High-entropy random values are obtained
   - Values are transformed into user-friendly password

2. **Password Verification**:
   - Password is hashed using Fastcrypto
   - Hash is compared against stored value (if verifying existing password)
   - Strength metrics are calculated and displayed

3. **Password Storage**:
   - Password is encrypted client-side
   - Encrypted password is stored in browser's local storage
   - Move contract logs anonymous usage statistics

## 🔍 Why SuiGuard?

- **Superior Randomness**: Traditional password generators rely on pseudo-random algorithms. SuiGuard uses Sui's blockchain-based randomness for truly unpredictable passwords.
- **Cryptographic Verification**: Fastcrypto provides industrial-strength hashing and verification.
- **Web3 Native**: Built specifically for blockchain users who need enhanced security.

## 👩‍💻 Development Roadmap

### MVP (Current Scope)
- Generate secure passwords using Sui Randomness
- Hash and verify passwords with Fastcrypto
- Store encrypted passwords locally
- Basic GUI for password management
- Usage statistics logging via Move contract

### Future Plans
- Decentralized backup solutions
- Browser extension for auto-fill
- Mobile app version
- Multi-factor authentication
- Password health monitoring

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 For any issues

Feel free to connect with us at charlesms2006@gmail.com
