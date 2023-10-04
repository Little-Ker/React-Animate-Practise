import React from 'react'
import {
  HashRouter as Router, Route, Routes 
} from 'react-router-dom'
import './App.css'
import Navbar from 'component/navbar/Navbar'
import EatCake from 'view/cssAnimateView/eatCake'
import Dog from 'view/cssAnimateView/dog'
import City from 'view/cssAnimateView/city'
import BigBen from 'view/cssAnimateView/bigBen'
import StringHandle from 'view/jsView/stringHandle'
import MonsterLoading from 'view/jsView/monsterLoading'
import MorseCode from 'view/jsView/morseCode'
import WebSocketChat from 'view/jsView/webSocketChat'
import ShoppingOrder from 'view/jsView/shoppingOrder'
import CastleAnim from 'view/canvas/castleAnim'
import Coordinate from 'view/canvas/coordinate'
import Ball from 'view/canvas/ball'
import Snake from 'view/canvas/snake'
 
const RouterPage = () => {
  return (
    <Routes>
      <Route exact path="/" element={<EatCake/>} />
      <Route exact path="eatCake" element={<EatCake/>} />
      <Route exact path="dog" element={<Dog/>} />
      <Route exact path="city" element={<City/>} />
      <Route exact path="bigBen" element={<BigBen/>} />
      <Route exact path="stringHandle" element={<StringHandle/>} />
      <Route exact path="monsterLoading" element={<MonsterLoading/>} />
      <Route exact path="morseCode" element={<MorseCode/>} />
      <Route exact path="webSocketChat" element={<WebSocketChat/>} />
      <Route exact path="shoppingOrder" element={<ShoppingOrder/>} />
      <Route exact path="castleAnim" element={<CastleAnim/>} />
      <Route exact path="coordinate" element={<Coordinate/>} />
      <Route exact path="ball" element={<Ball/>} />
      <Route exact path="snake" element={<Snake/>} />
      <Route path="*" element={<EatCake/>} />
    </Routes>
  )
}
 
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <RouterPage />
      </Router>
    </div>
  )
}
 
export default App