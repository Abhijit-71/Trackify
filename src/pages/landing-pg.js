import React from 'react'
import { NavbarOut } from '../components/navbar';

function LandingPage() {
  return (
    <div>
      <NavbarOut />
      <div className='h-lvh w-lvw  bg-slate-400'>
        <div className='p-8 flex justify-center items-center flex-col gap-8'>
            <h1 className='font-degular text-[max(3vw,4vh)]'>This is the pre alpha build of Trackify webapp</h1>
            <p className='font-jetsbrain text-[max(1vw,2vh)]'>Only frontend specific pages has been made with no backend support as of now , so authentications doesnot work. </p>
            <div className='font-jetsbrain flex flex-col items-start text-[max(1vw,2vh)]'>
              <p>For main fuction of this webapp visit these urls -</p>
              <p>Main pomodoro timer : <a className='underline text-white text-[max(1vw,2vh)]' href='https://trackify-olive.vercel.app/pomo'>https://trackify-olive.vercel.app/pomo</a></p>
              <p>Dashboard : <a className='underline text-white text-[max(1vw,2vh)]' href='https://trackify-olive.vercel.app/dashboard'>https://trackify-olive.vercel.app/dashboard</a></p>
            </div>
            <p className='font-jetsbrain text-[max(1vw,2vh)]'>Stay tuned for futher deployments... regards from Abhijit</p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
