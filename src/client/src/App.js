import { Route, Routes } from "react-router-dom"
import  MealList  from "./components/MealList"
import  Home  from "./components/Home"
import MealPage from "./components/MealPage"
import NotFoundPage from "./components/NotFoundPage"

export function App() {
  return (
    <Routes>
      <Route path='*' element={<NotFoundPage />} />
      <Route path="/" element={<Home/>} />
      <Route path="/meals" element={<MealList />} />
      <Route path="/meals/:id" element={<MealPage/>} />
    </Routes>
  )
}