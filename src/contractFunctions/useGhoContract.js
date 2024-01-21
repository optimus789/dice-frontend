import React from 'react'
import { usePrepareContractWrite, useContractRead, useContract, erc20ABI,useAccount, useContractWrite  } from 'wagmi';
 import { utils } from 'ethers';

const wagerAddress = '0x7a3535FA14960baf66DcBAf0e668922C8e74d034';
const ghoAddress = '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60';

function useGhoContract({address}) {
     // Prepare the transaction
  const { config, error: contractWriteError } = usePrepareContractWrite({
    addressOrName: ghoAddress,
    contractInterface: erc20ABI,
    functionName: 'approve',
    args: [wagerAddress, utils.parseEther('1000')],
  });
// Read values from the smart contract
const { data: readData, isLoading: readLoading } = useContractRead({
  addressOrName: ghoAddress,
  contractInterface: erc20ABI,
  functionName: 'allowance',
  args: [address,wagerAddress],
}); 
const { data: writeData, isLoading: writeLoading, write } = useContractWrite(config);
  return { readData, readLoading, writeData, writeLoading, write, contractWriteError }

}
export default useGhoContract