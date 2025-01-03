import { Route, Routes } from "react-router-dom";
import "./App.css";
import Compiler from "./pages/Compiler/Compiler";
import CompilerPageLayout from "./components/organism/CompilerPageLayout/CompilerPageLayout";
import NotFound from "./components/molecule/NotFound/NotFound";
import { CreateProjectContainer } from "./pages/CreateProject/CreateProjectContainer";


function App() {

  return (
    <Routes>
      <Route path="/" element={<CreateProjectContainer />} />
      <Route path="/project" element={<CompilerPageLayout />}>
        <Route path="/project/:folderId" element={<Compiler />} />
        <Route path="/project/notfound" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
