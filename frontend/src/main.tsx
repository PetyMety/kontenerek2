import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Kezdolap from './components/Trains/Kezdolap';
import KeresLapozRendez from './components/Trains/KeresLapozRendez'
import AddRecord from './components/Trains/AddRecord';


const router = createBrowserRouter([
  { 
    path: "/",
    element: < Kezdolap/>,
  },
  {
    path: "/kezdolap",
    element: < Kezdolap/>,
  },
  {
    path: "/keres-lapoz-rendez",
    element: < KeresLapozRendez/>,
  },
  {
    path: "/hozzaadas",
    element: <AddRecord path = "http://localhost:3000/train"/>
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
