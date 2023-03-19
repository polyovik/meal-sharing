import { Route, Routes } from "react-router-dom"
import  MealList  from "./components/MealList"
import  Home  from "./components/Home"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/meals" element={<MealList />} />
    </Routes>
  )
}