import React, { useState } from 'react';
import PlaceButton from './PlaceButton';
import { useEffect } from 'react';
import { formatEther } from 'ethers';
import { useAccount } from 'wagmi';
import useDiceContract from '../hooks/useDiceContract';
 

function WagerGame() {
  const { address } = useAccount();
  const {
    readData,
    errorContract,
    readLoading,
    hash,
    readError,
    isPending,
    write,
  } = useDiceContract({ address });

  const [side, setSide] = useState(1);

  const [data, setData]: any = useState({});
  const [result, setResult]: any = useState({});
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('data', data);
      if (data) {
        setData(data?.data);
        if (data?.data?.result) {
          if (data?.data?.result?.winningSide) {
            setResult(data?.data?.result?.winningSide);
          } else {
            setResult(false);
          }
        }
      }
    };
  }, []);

  useEffect(() => {
    const allowance = readData;
    console.log('allowance', allowance);
    if (Number(allowance) < 1000 && !isPending) {
      console.log('allowance', allowance);
      if (write) {
        write();
      }
    }
  }, [readLoading]);

  // useEffect(() => {
  //   console.log('Error contract: ', errorContract),
  //     console.log('Read Error: ', readError);
  // }, [errorContract, readError]);
  return (
    <>
      <div className='flex flex-col items-start justify-start gap-2 min-h-screen text-center bg-gray-900 text-white p-4'>
        <div className='flex items-center justify-between w-full'>
          <h1 className='text-xl font-bold text-white'>CryptoWager</h1>
          {/* <ConnectKitButton /> */}
        </div>
        <div className='bg-gray-800 rounded-lg p-1 w-full h-64 relative'>
          <span className='w-full text-2xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>{(data?.gameState==='RESULT' && result)? `Winning Side is ${result}`: data?.gameState }</span>
          <div className='flex items-center justify-between w-full'>
          <span className='text-white font-semibold text-3xl absolute top-1 right-2'><span className='text-base text-white/50'>Timer:</span> {data?.seconds}</span>
        </div>
        </div>
        {/*Write a seconds left timer which will be in the right top corner using className of Tailwinds css  */}
        
        <div className='w-full flex flex-col gap-2 justify-start items-start'>
          <h2 className='text-lg font-bold text-white mx-2'>
            Select a side between 1 to 6
          </h2>
          <div className='flex  gap-2 justify-between w-full'>
            {[1, 2, 3, 4, 5, 6].map((x) => (
              <button
                onClick={() => {
                  setSide(x);
                }}
                key={x}
                className={`btn btn-ghost flex-grow ${
                  side === x ? 'btn-active' : ''
                }`}
              >
                {x}
              </button>
            ))}
          </div>
        </div>
        <PlaceButton side={side} status={data?.gameState} />

        {/* <div className='flex flex-col gap-1 w-full'>
          {data?.betData?.map((x: any, i: number) => (
            <div key={i} className='flex flex-col gap-1'>
              <div className='flex w-full justify-between'>
                <span className='text-white'>{x?.side}</span>
                <span className='text-white'>{x?.amount / 10 ** 18}</span>
              </div>

              <span className='text-white'>{x?.player}</span>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
}

export default WagerGame;
