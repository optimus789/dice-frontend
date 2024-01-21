import React from 'react';
import { ConnectKitButton } from 'connectkit';
import './index.css';
import { usePrepareContractWrite, useContractRead, useContract, erc20ABI,useAccount, useContractWrite  } from 'wagmi';
import wagerabi from './abi.json';
import { utils } from 'ethers';
import { useEffect } from 'react';
import useGhoContract from './contractFunctions/useGhoContract';
import { useCallback } from 'react';
import useWagerContract from './contractFunctions/useWagerContract';
import PlaceButton from './component/PlaceButton';
import { useState } from 'react';
import { json } from 'stream/consumers';
 

 
 

function App() {
  const { address, isConnecting, isDisconnected } = useAccount();   
  const {readData, readLoading, writeData, writeLoading, write, contractWriteError}=useGhoContract({address});


  const [side, setSide] = useState(1)

  const [data, setData]:any =   useState({}) 
  const [result, setResult]:any = useState({})
useEffect(() => {
  const socket =new WebSocket("ws://192.168.1.217:3001");

 
 socket.onmessage =  (event) => {
   const data = JSON.parse(event.data)
    console.log('data', data)
    if(data ) {
    setData(data?.data)
    if(data?.data?.result){
      setResult(data?.data?.result)
    }
    
    }
    
 };
 
}
, [])


  
  
useEffect(() => {
  const allowance =  utils.formatEther(readData?.toString() || '0')
  console.log('allowance', allowance)
 if(Number(allowance) < 1000 && !writeLoading ) {
  console.log('allowance', allowance)
  if (write) {
    write(); 
  }
 }
  }, [write])

 
  
 
  return (
    <div
      className='flex flex-col items-start justify-start gap-2 min-h-screen text-center bg-gray-900 text-white p-4'
    > 
    <div className='flex items-center justify-between w-full'>
  <h1 className="text-xl font-bold text-white">
      CryptoWager
    </h1>
      <ConnectKitButton />
    </div>
    <div className='bg-gray-800 rounded-lg p-1 w-full h-64'>
         <span className='w-full text-lg font-bold'>
            {data?.gameState}
         </span>
    </div>
    <div className='w-full flex flex-col gap-2 justify-start items-start'>
      <h2 className="text-lg font-bold text-white mx-2">
   Select a side between 1 to 6
      </h2>
      <div className="flex  gap-2 justify-between w-full">
        {
          [1,2,3,4,5,6].map(x => (
            <button onClick={()=>{
              setSide(x)
            }} key={x} className={`btn btn-ghost flex-grow ${
              side === x ? 'btn-active' : ''
            }`}>{x}</button>
          ))
        }
       
      </div>
      
    </div>
     <PlaceButton side={side} status={data?.gameState}/>
   

     <div className='flex flex-col gap-1 w-full'>
        {
          data?.betData?.map((x:any, i:number) => (
            <div key={i} className='flex flex-col gap-1'>
              <div className='flex w-full justify-between'>
                 <span className='text-white'>
                {x?.side}
              </span>
              <span className='text-white'>
                {x?.amount/10**18}
              </span>
              </div>
             
              <span className='text-white'>
                {x?.player}
              </span>
            </div>
          ))

        }  
     </div><div>
      {
        JSON.stringify(result)
      }
     </div>
    </div>
  );
}

export default App;
