import React, { useState } from 'react';
import { useHabits } from '../context/HabitContext';
import { PlusCircle } from 'lucide-react';

const HabitForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const { addHabit } = useHabits();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addHabit({ title: title.trim() });
      setTitle('');
    }
  };

  return (
    <div className="glass-effect rounded-lg p-6 shadow-lg h-full">
      <div className="flex items-center mb-4">
        <PlusCircle className="mr-2 text-blue-500" size={24} />
        <h2 className="text-xl font-semibold">Add New Habit</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="habit-title" className="block text-sm font-medium text-gray-300 mb-2">
            Habit Title
          </label>
          <input
            id="habit-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="E.g., Drink 8 glasses of water"
            className="w-full bg-black/30 border border-white/10 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={!title.trim()}
          className={`w-full py-3 px-4 rounded-md font-medium transition-all ${
            title.trim()
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          Add Habit
        </button>
      </form>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-300 mb-2">Tips</h3>
        <ul className="text-sm text-gray-400 space-y-2">
          <li>• Keep habits simple and specific</li>
          <li>• Focus on consistency, not perfection</li>
          <li>• Habits reset daily at midnight</li>
          <li>• Check off habits as you complete them</li>
        </ul>
      </div>
    </div>
  );
};

export default HabitForm