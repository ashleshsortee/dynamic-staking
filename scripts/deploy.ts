import { ethers, upgrades } from "hardhat";

async function main() {
  const {ADMIN_1, ADMIN_2} = process.env;
  const StakeToken = await ethers.getContractFactory("StakeToken");
  const stk = await StakeToken.deploy("100000000000000000000000000000");

  await stk.deployed();

  console.log("StakingToken deployed to:", stk.address);

  const Staking = await ethers.getContractFactory("Staking");
  const staking = await upgrades.deployProxy(
    Staking,
    [
      ADMIN_1,
      ADMIN_2,
      stk.address
    ],
    {
      initializer: "initialize",
      kind: "uups",
    }
  );

  console.log("Staking deployed to:", staking.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
