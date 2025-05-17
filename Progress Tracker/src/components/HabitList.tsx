import React from 'react';
import { useHabits } from '../context/HabitContext';
import HabitItem from './HabitItem';
import { ListChecks } from 'lucide-react';

const HabitList: React.FC = () => {
  const { habits } = useHabits();

  return (
    <div className="glass-effect rounded-lg p-6 shadow-lg h-full">
      <div className="flex items-center mb-4">
        <ListChecks className="mr-2 text-blue-500" size={24} />
        <h2 className="text-xl font-semibold">Your Habits</h2>
      </div>
      
      {habits.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>No habits added yet. Add your first habit to get started!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {habits.map((habit, index) => (
            <HabitItem 
              key={habit.id} 
              habit={habit} 
              style={{ animationDelay: `${0.1 * index}s` }} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitList