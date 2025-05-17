import React from 'react';
import { useHabits } from '../context/HabitContext';
import { Trophy } from 'lucide-react';

const ProgressBar: React.FC = () => {
  const { progress, habits } = useHabits();
  const completedCount = habits.filter(habit => habit.completed).length;
  const totalCount = habits.length;

  return (
    <div className="glass-effect rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-white">Today's Progress</h2>
        <div className="flex items-center">
          <span className="text-2xl font-bold text-white">{progress}%</span>
          {progress === 100 && (
            <Trophy className="ml-2 text-yellow-400 bounce" size={24} />
          )}
        </div>
      </div>
      
      <div className="bg-black/30 rounded-full h-4 overflow-hidden">
        <div 
          className="progress-bar-gradient h-full rounded-full"
          style={{ 
            width: `${progress}%`,
            transition: 'width 0.5s ease-in-out'
          }}
        />
      </div>
      
      <div className="mt-3 text-sm text-gray-300 flex justify-between">
        <span>{completedCount} of {totalCount} completed</span>
        {habits.length > 0 && (
          <span>
            {totalCount - completedCount} remaining
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar