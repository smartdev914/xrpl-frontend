# XRPL-Frontend

## Table of Contents

- [Introduction](#introduction)
- [Technology Stack](#technology-stack)
- [Setup and Installation](#setup-and-installation)
- [License](#license)

## Introduction

XRPL-Frontend is a web application that leverages XRPL's NFTs to provide a secure, decentralized, blockchain-based contract service.

## Technology Stack

- **Frontend:**

  - [React](https://reactjs.org/): A JavaScript library for building user interfaces.
  - [TypeScript](https://www.typescriptlang.org/): A statically typed superset of JavaScript that adds types and compiles to plain JavaScript.
  - [Vite](https://vitejs.dev/), [ESLint](https://eslint.org/), and [Prettier](https://prettier.io/): Tools for building the application, linting code, and formatting code.
  - [Tanstack Query](https://tanstack.com/query) and [Zustand](https://github.com/pmndrs/zustand): Libraries for managing application state.
  - [Tailwind](https://tailwindcss.com/) and [Shadcn/ui](https://ui.shadcn.com/): Libraries for styling the application and managing layout.

- **Backend:**
  - [Node.js](https://nodejs.org/): A JavaScript runtime for building server-side applications.
  - [Express](https://expressjs.com/): A web application framework for Node.js.
  - [TypeScript](https://www.typescriptlang.org/): A statically typed superset of JavaScript that adds types and compiles to plain JavaScript.
  - [XRPL](https://xrpl.org/): A library for interacting with the XRP Ledger.

## Setup and Installation

Follow these steps to set up and run this project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/smartdev914/xrp-frontend.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd xrp-frontend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

## Environment Variables

This project uses the following environment variables:

- `VITE_BACKEND_URL`: The URL of the backend server.
- `VITE_PLATFORM_ADDRESS`: The platform address for the XRP Ledger.
- `VITE_PLATFORM_SEED`: The seed for the platform address.
- `VITE_A_ADDRESS`: The address for User A.
- `VITE_A_SEED`: The seed for the User A address.
- `VITE_B_ADDRESS`: The address for User B.
- `VITE_B_SEED`: The seed for the User B address.

You can set these environment variables in a `.env` file in the root of your project. Remember to replace the example values with your actual values.

```properties
VITE_BACKEND_URL=""
VITE_PLATFORM_ADDRESS=""
VITE_PLATFORM_SEED=""
VITE_A_ADDRESS=""
VITE_A_SEED=""
VITE_B_ADDRESS=""
VITE_B_SEED=""
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
