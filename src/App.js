import "./App.css";
import DeleteModal from "./Components/DeleteModal";
import Details from "./Components/Details";
import NewPage from "./Components/NewPage";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Details />} />
          <Route path="/delete" element={<DeleteModal />} />
          <Route path="/newpage" element={<NewPage />} />
          <Route path="/editPage/:id" element={<NewPage />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
