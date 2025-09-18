// scripts/show-constructor.js
const hre = require("hardhat");

async function main() {
  const name = process.env.CONTRACT_NAME;
  if (!name) throw new Error('Set CONTRACT_NAME env var. Ej: export CONTRACT_NAME=MockERC20');

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
}
main().catch((e) => { console.error(e); process.exit(1); });
