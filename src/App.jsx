import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
// import { SkillCard } from './components/SkillCard'
import './App.css'

function App() {

  return (
    <>
      <Navbar />
      <main className='bg-yellow-200/20 min-h-screen'>
        <div className="header mt-16 text-gray-700  font-serif text-center pt-12 text-5xl" >Micro-Skill Coach</div>
        <div className="card bg-white h-fit w-11/12 md:w-3/5 lg:w-2/5 mx-auto mt-10 p-6 rounded-lg shadow-lg">
        <div className="skill h-fit bg-green-300/20 w-full rounded-lg p-4">
            <h2 className='font-(Rubik) font-bold text-gray-700'>Skill of the day</h2>

           {/* <SkillCard /> */}
          </div>
        </div>
      </main>
    </>
  )
}

export default App
