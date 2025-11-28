import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Pages
import Home from './pages/Home';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Universities from './pages/Universities';
import UniversityDetail from './pages/UniversityDetail';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin Pages
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import AddUniversity from './pages/Admin/AddUniversity';
import EditUniversity from './pages/Admin/EditUniversity';
import AddProgram from './pages/Admin/AddProgram';
import EditProgram from './pages/Admin/EditProgram';

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/programs/:slug" element={<ProgramDetail />} />
                <Route path="/universities" element={<Universities />} />
                <Route path="/universities/:slug" element={<UniversityDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<Login />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/universities/add" element={<AddUniversity />} />
                <Route path="/admin/universities/edit/:id" element={<EditUniversity />} />
                <Route path="/admin/programs/add" element={<AddProgram />} />
                <Route path="/admin/programs/edit/:id" element={<EditProgram />} />
            </Routes>
        </Router>
    );
}

export default App;