/* eslint-disable no-unused-vars */
import React from 'react'
import Header from './components/Header.jsx';
import Cards from './components/Cards.jsx';


const App = () => {
  return (
    <>
      <Header/>
      <Cards is_reverse setBgColor = 'bg-gradient-to-tl from-additional from-[-100%] to-primary to-60%'/>
      <Cards setBgColor = 'bg-radial-[at_100%_-50%] from-emerald-800 to-zappify/70 to-60%'/>
      <Cards is_reverse/>
    </>
  )
}

export default App
