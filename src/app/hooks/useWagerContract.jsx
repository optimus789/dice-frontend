import { useWriteContract } from 'wagmi';
import wagerabi from '../../abi.json';
import { parseEther } from 'ethers';
import { erc20Abi } from 'viem';

const wagerAddress = '0x4dCd09E2D6369aC473E59DeD597014944e12Bd27';
const diceToken = '0x3464303Bfee8522a4e0B98Ba3D575f731a088360';

function useWagerContract({ side }) {
  // Prepare the transaction
  // const { config, error: contractWriteError } = usePrepareContractWrite({
  //   addressOrName: wagerAddress,
  //   contractInterface: wagerabi,
  //   functionName: 'placeBet',
  //   args: [side, utils.parseEther('1')],
  // });
  // Read values from the smart contract
  // const { data: readData, isLoading: readLoading } = useReadContract({
  // addressOrName: ghoAddress,
  // contractInterface: erc20ABI,
  // functionName: 'allowance',
  // args: [address,wagerAddress],
  // });
  const {
    data: hash,
    error: wagerError,
    isPending,
    writeContract,
  } = useWriteContract();
  async function write() {
    writeContract({
      address: wagerAddress,
      abi: wagerabi,
      functionName: 'placeBet',
      args: [side, parseEther('10')],
    });
  }
  return { hash, wagerError, isPending, write };
}

export default useWagerContract;
