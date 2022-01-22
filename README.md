# Dynamic Staking on Ethereum

For most common staking applications, the admin has to provide the estimated APY for the program for a certain period of time beforehand. With the dynamic staking approach, it calculates the APY dynamically for a particular stakeholder based on the number of stakeholders, their staked amount and the rewards which were added to the Staking contract address till that point of time. There is no lock-in time for the stakeholder's stake in this approach. Stakeholders can remove their stake at any point in time and can claim the rewards. Here the staking program is done for a dummy StakeToken(STK) which is an ERC20 token deployed on the Goerli network.

The financial logic of the staking smart contract is to assign shares to each stakeholder and rewards are in proportion to the shares. Just like Mutual Funds derives the NAV(Net Asset Value) and it increases or decreases based on the shares and its asset value inside of it, the similar way the NAV in this case will be STK per share price which will increase as and when rewards are added to the staking program.

By default the initial ratio will be set at 1:1, so 1 STK is equal to 1 share. Each user who stake at this ratio will receive an equal amount of shares for the number of STK she/he staked. During the month a reward will be sent to the Staking smart contract, which will alter the number of STK on the contract and by default alter the STK per share ratio.

#### Example flow -

1. Initially the STK/share ratio will be 1.
2. `StakeholderA` stakes 1000 STK token at this point, so `StakeholderA` will receive 1000 shares.
3. Reward of 100 STK is deposited on the Staking contract address.
4. Now, the STK/share ratio gets increase to 1.1 (total STK / number of shares = 1100/1000)
5. `StakeholderB` stakes 1000 STK token at this point, so `StakeholderB` will receive 1000/1.1 ~ 909 shares
6. `StakeholderA` remove stake of 1000 STK at this point, so `StakeholderA` will receive 1000\*1.1 = 1100 STK. So, reward of `StakeholderA` is 1100-1000 = 100 STK

> More detailed scenarios covering all the edge cases can be found here -
> https://docs.google.com/spreadsheets/d/11yU9c4G4PJ50dzmtILRMYd5w_qO-qCa2cM0ZOWJXfsA/edit#gid=0

#### Smart contract features

1. Upgradable smart contract
2. Role based acces control (RBAC)
3. Pausable smart contract
4. Refund STK to the stakeholders by admin in case of some issue

### Deployment

##### To deploy your own instance of StakeToken and Staking contract

1. Rename `.env.example` to `.env` and replace all the required values there
2. Run `npm run deploy` to deploy both the contracts. This will deploy the conract on the Goerli network. To change the network, you need to update the RPC url in `.env` and also in the `package.json` script. Also, make sure you have funds to pay for transaction fee on the wallet you mentioned in the `.env`.

> The STK token and Staking contract is deployed on Goerli network at `0xD154805B317C83f61aB1744A0A0C931Bd318e50a` and `0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0` address respectively.
> StakeToken - https://goerli.etherscan.io/address/0xD154805B317C83f61aB1744A0A0C931Bd318e50a
> Staking - https://goerli.etherscan.io/address/0xB767f1030d239FF3d84d3369A37312C714740cC8

### Test

1. To run the unit test, use the below command

```sh
   npx hardhat test
```
