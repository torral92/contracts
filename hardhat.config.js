// ----------------------
// hardhat.config.js
// ----------------------

// 1) Carga de variables de entorno (.env)
require("dotenv").config();

// 2) Plugins que ya usabas
require("@nomiclabs/hardhat-waffle");
require("hardhat-contract-sizer");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("@nomicfoundation/hardhat-verify");
require("@nomiclabs/hardhat-vyper");

// 3) Task de ejemplo (la dejo tal cual la tenías)
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});


// Opción 3 — tarea `ctor` para ver el constructor de cualquier contrato (artifact)
task("ctor", "Muestra el constructor de un contrato (por nombre de artifact)")
  .addParam("name", "Nombre del contrato, p.ej. MockERC20")
  .setAction(async ({ name }, hre) => {
    const artifact = await hre.artifacts.readArtifact(name);
    const ctor = artifact.abi.find((x) => x.type === "constructor");
    if (!ctor || !ctor.inputs?.length) {
      console.log(`Constructor de ${name}: sin argumentos`);
    } else {
      console.log(`Constructor de ${name}:`);
      for (const inp of ctor.inputs) {
        console.log(`- ${inp.name || "(sin nombre)"}: ${inp.type}`);
      }
    }
  });
  
// ----------------------
// Normalización de env
// ----------------------

// Si tu PRIVATE_KEY ya viene con 0x, perfecto.
// Si viniera sin 0x, la función add0x se lo añade.
const add0x = (k) => (k ? (k.startsWith("0x") ? k : `0x${k}`) : "");

// Variables de entorno esperadas en tu .env:
// PRIVATE_KEY=0xabc... (hex de 64 bytes con 0x)
// SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/XXX  (o Infura)
// ETHERSCAN_API_KEY=xxxxx                  (opcional, para verify)
// COINMARKETCAP_API_KEY=xxxxx             (opcional, para gas-reporter)
// NETWORK_RPC_URL=https://...             (opcional, fallback genérico)
const PRIVATE_KEY = add0x(process.env.PRIVATE_KEY || "");
const NETWORK_RPC_URL = process.env.NETWORK_RPC_URL || "";
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || NETWORK_RPC_URL;

// ----------------------
// Config principal
// ----------------------

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.12",
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
      {
        version: "0.8.26",
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
    ],
    overrides: {},
  },

  vyper: {
    compilers: [
      { version: "0.3.1" },
      { version: "0.2.15" },
      { version: "0.2.7" },
      { version: "0.2.4" },
    ],
  },

  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      // forking: {
      //   url: process.env.ALCHEMY_URL,
      //   blockNumber: 12545000,
      // },
      gasPrice: 1000000000,
    },

    // ---- Redes EVM (mantengo tu lista, usando PRIVATE_KEY normalizado) ----
    mainnet: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    ropsten: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    rinkeby: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    goerli: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    mumbai: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    moonbase: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    polygon: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    polygonedge: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    bsc: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    energyweb: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    moonriver: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    gaiaxtestnet: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    alfajores: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    celo: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    filecointestnet: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    oasis_saphire: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    oasis_saphire_testnet: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    optimism_sepolia: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    optimism: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },

    // ---- Sepolia con URL específica y chainId ----
    sepolia: {
      url: SEPOLIA_RPC_URL,                  // prioriza SEPOLIA_RPC_URL
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 11155111,
    },

    base: {
      url: NETWORK_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },

  // Sourcify on (como lo tenías)
  sourcify: {
    enabled: true,
  },

  // Etherscan (mantenido, leyendo API key del .env)
  etherscan: {
    apiKey: {
      oasis_saphire_testnet: process.env.ETHERSCAN_API_KEY,
      oasis_saphire: process.env.ETHERSCAN_API_KEY,
      optimism_sepolia: process.env.ETHERSCAN_API_KEY,
      optimism: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
      mainnet: process.env.ETHERSCAN_API_KEY,
      polygon: process.env.ETHERSCAN_API_KEY,
      base: process.env.ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        network: "alfajores",
        chainId: 44787,
        urls: {
          apiURL: "https://api-alfajores.celoscan.io/api",
          browserURL: "https://alfajores.celoscan.io",
        },
      },
      {
        network: "celo",
        chainId: 42220,
        urls: {
          apiURL: "https://api.celoscan.io/api",
          browserURL: "https://celoscan.io/",
        },
      },
      {
        network: "oasis_saphire",
        chainId: 23294,
        urls: {
          apiURL: "https://explorer.sapphire.oasis.io/api",
          browserURL: "https://explorer.sapphire.oasis.io/",
        },
      },
      {
        network: "oasis_saphire_testnet",
        chainId: 23295,
        urls: {
          apiURL: "https://testnet.explorer.sapphire.oasis.dev/api",
          browserURL: "https://testnet.explorer.sapphire.oasis.dev/",
        },
      },
      {
        network: "optimism_sepolia",
        chainId: 11155420,
        urls: {
          apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
          browserURL: "https://sepolia-optimism.etherscan.io/",
        },
      },
      {
        network: "optimism",
        chainId: 10,
        urls: {
          apiURL: "https://api-optimistic.etherscan.io/api",
          browserURL: "https://optimism.etherscan.io/",
        },
      },
    ],
  },

  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },

  gasReporter: {
    currency: "USD",
    gasPrice: 60,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
};
