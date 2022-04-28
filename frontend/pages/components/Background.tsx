import * as React from 'react';
import { RefreshIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { BgList, handleChangeBg } from '../../providers/ts/bg-gen';
import BG from '../../providers/ts/globalVar';

const Background = () => {

  const [click, setClick] = useState(false);
  
  const handleClickChangeBg = () => {
    setClick(!click);
    handleChangeBg();
  }

  return (
    <div>
      <div className={`-z-50 transition-all duration-300 absolute top-0 h-screen w-screen ${BgList[BG.color]}`}/>
      <button 
        className='rounded-full w-8 h-8 bg-white absolute top-4 left-4'
        onClick={handleClickChangeBg}>
        <RefreshIcon className='w-2/3 mx-auto text-blue-500'/>
      </button>
    </div>
  );
};

export default Background;