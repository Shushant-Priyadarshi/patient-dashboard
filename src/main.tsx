import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import Dashboard from './page/Dashboard.tsx'
import Analytics from './page/Analytics.tsx'
import Patients from './page/Patients.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import UpdatePatient from './page/UpdatePatient.tsx'
import AddPatient from './page/AddPatient.tsx'
// PrimeReact core + theme + icons
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // or choose another theme
import 'primereact/resources/primereact.min.css'; // core styles
import 'primeicons/primeicons.css'; // icon support
import NotFound from './components/NotFound.tsx'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route path="" element={<Dashboard/>}></Route>
        <Route path="analytics" element={<Analytics/>}></Route>
        <Route path="manage-patients" element={<Patients/>}></Route>
        <Route path="add-patient" element={<AddPatient/>}></Route>
        <Route path="update-patient/:patientId" element={<UpdatePatient/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
    </Route>
    
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
<Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
