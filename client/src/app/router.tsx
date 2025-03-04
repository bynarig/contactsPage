import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Contacts from '#/pages/ContactsPage';
import ProjectsPage from '#/pages/ProjectsPage';

export default function Router(){
  return (
  <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  )
}