import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import "./styles.css";
import Navigation from "./components/Navigation";
import AddContactPage from "./pages/AddContactPage";
import ContactsPage from "./pages/ContactsPage";
import ViewContactPage from "./pages/ViewContactPage";
import NotesPage from "./pages/NotesPage";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter>
    <Navigation className="bg-white sticky top-0" />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/contacts/new" element={<AddContactPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/contacts/:id" element={<ViewContactPage />} />
      <Route path="/notes" element={<NotesPage />} />
    </Routes>
  </BrowserRouter>
);
