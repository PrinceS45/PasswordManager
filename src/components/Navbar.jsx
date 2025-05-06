import React from 'react'

function Navbar() {
  return (
    <nav className='bg-slate-900 text-white w-full '>
      <div className="mycontainer flex justify-between items-center h-13 py-5">
        <div className="logo font-bold text-2xl">

          <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'>OP/&gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-4">
            <a className='hover:scale-110' href="#">Home</a>
            <a className='hover:scale-110' href="#">About</a>
            <a className='hover:scale-110' href="#">Contact</a>
          </li>
        </ul> */}
        <button className=' flex gap-2 border-1 border-green-900 rounded-2xl justify-between items-center hover:bg-slate-950 transition-all duration-400'>
          <img className='invert' width={38}   src="./icon/github.png" alt="" />
          <div className='py-1 px-1.5 font-bold text-shadow-blue-300 hover:text-lime-200'>GitHub</div>
        </button>
      </div>
    </nav>
  )
}

export default Navbar





