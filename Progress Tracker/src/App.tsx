import React from 'react';
import { HabitProvider } from './context/HabitContext';
import HabitDashboard from './components/HabitDashboard';
import './App.css';

function App() {
  return (
    <HabitProvider>
      <div className="min-h-screen bg-gradient-radial from-[#000000] via-[#1a1a1a] to-[#000000] text-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
        <HabitDashboard />
      </div>
    </HabitProvider>
  );
}

export default App;