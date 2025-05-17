import React from 'react';
import HabitList from './HabitList';
import ProgressBar from './ProgressBar';
import HabitForm from './HabitForm';
import { CheckCircle } from 'lucide-react';

const HabitDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-8 fade-in">
        <div className="flex items-center justify-center mb-2">
          <CheckCircle className="mr-2 text-gradient text-blue-500" size={28} />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            Daily Habit Checklist
          </h1>
        </div>
        <p className="text-gray-300 text-lg">
          Track your daily habits and build consistency
        </p>
      </div>

      <div className="mb-8 fade-in" style={{ animationDelay: '0.1s' }}>
        <ProgressBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 fade-in" style={{ animationDelay: '0.2s' }}>
          <HabitList />
        </div>
        <div className="fade-in" style={{ animationDelay: '0.3s' }}>
          <HabitForm />
        </div>
      </div>
    </div>
  );
};

export default HabitDashboard;