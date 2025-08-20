import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './components/home/Home'
import ResumeTemplate from './components/home/ResumeTemplate'
import ExperienceLevel from './components/home/ExperienceLevel'
import ResumeForm from './components/home/ResumeForm'
import RenderTemplate from './components/home/RenderTemplate'
import ATSScore from './components/atsScore/atsScore'


function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path="/resume-builder" element={<ResumeTemplate/>}/>
       <Route path="/experience" element={<ExperienceLevel/>}/>
      {/* <Route path="/template" element={<Templates/>}/> */}
      <Route path="/render-template" element ={<RenderTemplate/>}/>
       <Route path="/resumeForm" element={<ResumeForm/>}/>
        <Route path="/atsScorePdf" element={<ATSScore/>}/>
      </Route>

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
