import React from 'react'
import {
  BrowserRouter as Router, Route, Routes 
} from 'react-router-dom'
import './App.css'
import Navbar from './component/navbar/Navbar'
import ViewA from './view/ViewA'
import ViewB from './view/ViewB'
import EatCake from './view/cssAnimateView/eatCake'
import Dog from './view/cssAnimateView/dog'
import City from './view/cssAnimateView/city'
import BigBen from './view/cssAnimateView/bigBen'
import StringHandle from './view/jsView/stringHandle'
import MonsterLoading from './view/jsView/monsterLoading'
 
const RouterPage = () => {
  return (
    <Routes>
      <Route exact path="/" element={<ViewA/>} />
      <Route exact path="viewA" element={<ViewA/>} />
      <Route exact path="viewB" element={<ViewB/>} />
      <Route exact path="eatCake" element={<EatCake/>} />
      <Route exact path="dog" element={<Dog/>} />
      <Route exact path="city" element={<City/>} />
      <Route exact path="bigBen" element={<BigBen/>} />
      <Route exact path="stringHandle" element={<StringHandle/>} />
      <Route exact path="monsterLoading" element={<MonsterLoading/>} />
      <Route path="*" element={<ViewA/>} />
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