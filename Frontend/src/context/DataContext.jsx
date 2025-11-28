import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [universities, setUniversities] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API Base URL - Points to your running Node server
  const API_BASE = "http://localhost:5000/api";

  // --- 1. FETCH DATA FROM DATABASE ---
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [uniRes, progRes] = await Promise.all([
        axios.get(`${API_BASE}/public/universities`),
        axios.get(`${API_BASE}/public/programs`)
      ]);
      
      setUniversities(uniRes.data);
      setPrograms(progRes.data);
    } catch (error) {
      console.error("Error fetching data from Backend:", error);
      setError("Failed to load data. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- 2. ADMIN ACTIONS (Connects to Backend) ---

  // Add University
  const addUniversity = async (uniData) => {
    try {
      const res = await axios.post(`${API_BASE}/admin/universities`, uniData);
      
      // Handle different response structures
      const newUniversity = res.data.university || res.data;
      setUniversities(prev => [...prev, newUniversity]);
      
      return newUniversity; // Return for form handling
    } catch (error) {
      console.error("Failed to add university:", error);
      throw error; // Re-throw so form can handle it
    }
  };

  // Update University
  const updateUniversity = async (id, uniData) => {
    try {
      const res = await axios.put(`${API_BASE}/admin/universities/${id}`, uniData);
      const updatedUni = res.data.university || res.data;
      
      setUniversities(prev => 
        prev.map(u => u._id === id ? updatedUni : u)
      );
      
      return updatedUni;
    } catch (error) {
      console.error("Failed to update university:", error);
      throw error;
    }
  };

  // Delete University
  const deleteUniversity = async (id) => {
    if (!window.confirm("Are you sure you want to delete this university? This will also delete all associated programs.")) {
      return false;
    }
    
    try {
      await axios.delete(`${API_BASE}/admin/universities/${id}`);
      setUniversities(prev => prev.filter(u => u._id !== id));
      
      // Also remove programs associated with this university
      setPrograms(prev => prev.filter(p => p.universityId !== id));
      
      return true;
    } catch (error) {
      console.error("Failed to delete university:", error);
      throw error;
    }
  };

  // Add Program
  const addProgram = async (progData) => {
    try {
      const res = await axios.post(`${API_BASE}/admin/programs`, progData);
      const newProgram = res.data.program || res.data;
      
      setPrograms(prev => [...prev, newProgram]);
      return newProgram;
    } catch (error) {
      console.error("Failed to add program:", error);
      throw error;
    }
  };

  // Update Program
  const updateProgram = async (id, progData) => {
    try {
      const res = await axios.put(`${API_BASE}/admin/programs/${id}`, progData);
      const updatedProg = res.data.program || res.data;
      
      setPrograms(prev => 
        prev.map(p => p._id === id ? updatedProg : p)
      );
      
      return updatedProg;
    } catch (error) {
      console.error("Failed to update program:", error);
      throw error;
    }
  };

  // Delete Program
  const deleteProgram = async (id) => {
    if (!window.confirm("Are you sure you want to delete this program?")) {
      return false;
    }
    
    try {
      await axios.delete(`${API_BASE}/admin/programs/${id}`);
      setPrograms(prev => prev.filter(p => p._id !== id));
      return true;
    } catch (error) {
      console.error("Failed to delete program:", error);
      throw error;
    }
  };

  // --- 3. HELPER FUNCTIONS ---

  // Get university by ID
  const getUniversityById = (id) => {
    return universities.find(u => u._id === id);
  };

  // Get university by slug
  const getUniversityBySlug = (slug) => {
    return universities.find(u => u.slug === slug);
  };

  // Get programs by university ID
  const getProgramsByUniversity = (universityId) => {
    return programs.filter(p => p.universityId === universityId);
  };

  // Get featured universities
  const getFeaturedUniversities = () => {
    return universities.filter(u => u.featured && u.isActive);
  };

  // Get active universities only
  const getActiveUniversities = () => {
    return universities.filter(u => u.isActive);
  };

  return (
    <DataContext.Provider value={{ 
      // Data
      universities, 
      programs, 
      loading,
      error,
      
      // University CRUD
      addUniversity, 
      updateUniversity,
      deleteUniversity,
      
      // Program CRUD
      addProgram, 
      updateProgram,
      deleteProgram,
      
      // Helpers
      getUniversityById,
      getUniversityBySlug,
      getProgramsByUniversity,
      getFeaturedUniversities,
      getActiveUniversities,
      
      // Refresh
      refreshData: fetchData
    }}>
      {children}
    </DataContext.Provider>
  );
};