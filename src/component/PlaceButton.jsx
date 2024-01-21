import React from 'react'
import useWagerContract from '../contractFunctions/useWagerContract';
import { memo } from 'react';

function PlaceButton({side,status}) {
    
        const contract = useWagerContract({side});
        console.log(contract)


    const handleClick = async () => {
        if (status === 'WAIT') {
            contract.write(side);
        } else {
            
        }
    }
      
       
  return (
    <div className='flex flex-col gap-1 w-full'>
   
    <button onClick={handleClick} className={`btn btn-primary w-full text-white font-bold text-lg ${
        contract.writeLoading ? 'opacity-50 cursor-not-allowed ' : ''
    }
    ${
        status === 'WAIT' ? ' ' : 'opacity-50 cursor-not-allowed'
    }
    `}>{
        status === 'WAIT' ?
        contract.writeLoading ? 'Placing your bet...' : `Place Bet on side ${side} `
        : 'Place Bet on next round'
    }</button>     <p className='text-center text-gray-400 text-sm font-semibold'>You will be asked to confirm the transaction on your wallet</p>

{
    contract.writeError && <p className='text-center text-red-500 text-sm font-semibold'>{contract.writeError}</p>

}
{
    contract.writeData?.hash && <div className='w-full flex flex-col items-start'>
        <p className='text-center text-white text-sm font-semibold'>Transaction hash:</p>
        <p className=' text-gray-400 text-xs font-semibold'> {contract.writeData?.hash}</p>
    </div>
}

    </div>
  )
}

export default memo(PlaceButton)