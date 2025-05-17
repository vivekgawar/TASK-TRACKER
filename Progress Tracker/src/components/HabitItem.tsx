import React, { useState } from 'react';
import { useHabits } from '../context/HabitContext';
import { CheckCircle2, Circle, Pencil, Trash2, X, Check } from 'lucide-react';

interface HabitItemProps {
  habit: {
    id: string;
    title: string;
    completed: boolean;
  };
  style?: React.CSSProperties;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit, style }) => {
  const { toggleHabit, editHabit, deleteHabit } = useHabits();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(habit.title);

  const handleToggle = () => {
    toggleHabit(habit.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      editHabit(habit.id, editedTitle);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(habit.title);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteHabit(habit.id);
  };

  return (
    <div 
      className={`habit-item glass-effect rounded-lg p-4 flex items-center justify-between shadow-sm transition-all fade-in ${
        habit.completed ? 'bg-white/20' : ''
      }`}
      style={style}
    >
      <div className="flex items-center">
        <div 
          className="checkbox-container mr-3 cursor-pointer"
          onClick={handleToggle}
        >
          {habit.completed ? (
            <CheckCircle2 className="text-green-500" size={24} />
          ) : (
            <Circle className="text-gray-400" size={24} />
          )}
        </div>
        
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="bg-black/30 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span className={`text-lg ${habit.completed ? 'line-through text-gray-400' : 'text-white'}`}>
            {habit.title}
          </span>
        )}
      </div>
      
      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <button 
              onClick={handleSave}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              title="Save"
            >
              <Check size={18} className="text-green-500" />
            </button>
            <button 
              onClick={handleCancel}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              title="Cancel"
            >
              <X size={18} className="text-red-500" />
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={handleEdit}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              title="Edit"
            >
              <Pencil size={18} className="text-gray-300" />
            </button>
            <button 
              onClick={handleDelete}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              title="Delete"
            >
              <Trash2 size={18} className="text-gray-300" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HabitItem