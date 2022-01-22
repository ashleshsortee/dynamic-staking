import { ethers, upgrades } from "hardhat";

async function main() {
  const {ADMIN_1, ADMIN_2} = process.env;
  const StakeToken = await ethers.getContractFactory("StakeToken");
  const stk = await StakeToken.deploy("100000000000000000000000000000");

  await stk.deployed();

  console.log('StakeToken deployed to:', stk.address);

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

  await staking.deployed();

  console.log("Staking deployed to:", staking.address);

  const approvalTx = await stk.approve(staking.address, ethers.utils.parseUnits('100'));
  console.log('approvalTx hash', approvalTx.hash);

  const setInitialRatioTx = await staking.functions.setInitialRatio(ethers.utils.parseUnits('100'));
  console.log('setInitialRatioTx hash', setInitialRatioTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
