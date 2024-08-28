import { Routes, Route } from "react-router-dom"
import Hack_org from "./pages/Hack_org"
import ProjectSubmissionForm from "./pages/project_submission_form";
import Org_form_completion from "./components/Org_form_completion";
import Hack_disp from "./pages/Hack_disp";

function App() {
  
  
  return(
    <>
      <Routes>
        <Route path="/createHackathon" element={<Hack_org />}/>
        <Route path="/project_form" element={<ProjectSubmissionForm />}/>
        <Route path="/completeHackathonCreation/:id" element={<Org_form_completion />}/>
        <Route path="/hackathons" element={<Hack_disp />}/>
      </Routes>
    </>
  );
}

export default App