import React from 'react'
import FoodsList from '../Components/HomePage/foods'
import Slider from '../Components/HomePage/slider'
import TopNav from '../Components/NavBar/TopNav'

const HomePage = () => {
  return (
    <>
        <TopNav/>
        <Slider/>
        <FoodsList/>
    </>
    
  )
}

export default HomePage