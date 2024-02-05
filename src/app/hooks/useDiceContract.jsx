import { useReadContract, useWriteContract } from 'wagmi';
import { erc20Abi } from 'viem';
import { parseEther } from 'ethers';
const wagerAddress = '0x4dCd09E2D6369aC473E59DeD597014944e12Bd27';
const diceAddress = '0x3464303Bfee8522a4e0B98Ba3D575f731a088360';
const wagmiDiceContract = {
  address: diceAddress,
  abi: erc20Abi,
};

function useDiceContract({ address }) {
  // Prepare the transaction
  // Read values from the smart contract
  const {
    data: hash,
    error: errorContract,
    isPending,
    writeContract,
  } = useWriteContract();

  const {
    data: readData,
    error: readError,
    isPending: readLoading,
  } = useReadContract({
    ...wagmiDiceContract,
    functionName: 'allowance',
    args: [address, wagerAddress],
    // address: diceAddress,
    // abi: erc20Abi,
    // functionName: 'allowance',
    // args: [address, wagerAddress],
  });
  async function write() {
    writeContract({
      address: diceAddress,
      abi: erc20Abi,
      functionName: 'approve',
      args: [wagerAddress, parseEther('1000')],
    });
  }
  // async function readAllowance() {
  //   const provider = new JsonRpcProvider(
  //     'https://replicator.pegasus.lightlink.io/rpc/v1'
  //   );
  //   const contract = new Contract(address, erc20Abi, provider);

  //   try {
  //     let response = await contract.allowance(address, wagerAddress);
  //     console.log(response.toString());
  //     return response;
  //   } catch (error) {
  //     console.error('Error reading allowance: ', error.message);
  //     // Handle the error appropriately in your application context
  //     // For example, you might want to return a default value or re-throw the error
  //     throw error;
  //   }
  // }
  return {
    readData,
    errorContract,
    readLoading,
    hash,
    readError,
    isPending,
    write,
  };
}
export default useDiceContract;
