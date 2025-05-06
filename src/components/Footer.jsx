import React from 'react'

function Footer() {
    return (
        <div className='bg-slate-900 text-white w-full flex flex-col justify-center items-center h-20 gap-2'>
            
            <div className="logo font-bold text-2xl">

                <span className='text-green-700'>&lt;</span>
                Pass
                <span className='text-green-700'>OP/&gt;</span>
            </div>
              <div className='flex justify-center items-center gap-2'>
            <div className='flex font-semibold'>Created with <img className='w-6 mx-2' src="/icon/heart.png" alt="" /> by Prince Singh</div>
              </div>

            
        </div>
    )
}

export default Footer
