import React, { createContext, useState, useEffect, useContext } from 'react';
import { Habit } from '../types/types';

interface HabitContextType {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'completed'>) => void;
  toggleHabit: (id: string) => void;
  editHabit: (id: string, title: string) => void;
  deleteHabit: (id: string) => void;
  progress: number;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const useHabits = (): HabitContextType => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const savedHabits = localStorage.getItem('habits');
    const initialHabits = savedHabits ? JSON.parse(savedHabits) : [];
    
    // Check if we need to reset habits for a new day
    const lastUpdate = localStorage.getItem('lastUpdate');
    const today = new Date().toDateString();
    
    if (lastUpdate !== today && initialHabits.length > 0) {
      // Reset all habits to uncompleted for the new day
      return initialHabits.map((habit: Habit) => ({ ...habit, completed: false }));
    }
    
    return initialHabits;
  });
  
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
    localStorage.setItem('lastUpdate', new Date().toDateString());
    
    // Calculate progress
    if (habits.length === 0) {
      setProgress(0);
    } else {
      const completedCount = habits.filter(habit => habit.completed).length;
      setProgress(Math.round((completedCount / habits.length) * 100));
    }
  }, [habits]);

  const addHabit = (habit: Omit<Habit, 'id' | 'completed'>) => {
    const newHabit: Habit = {
      ...habit,
      id: crypto.randomUUID(),
      completed: false
    };
    setHabits(prevHabits => [...prevHabits, newHabit]);
  };

  const toggleHabit = (id: string) => {
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const editHabit = (id: string, title: string) => {
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit.id === id ? { ...habit, title } : habit
      )
    );
  };

  const deleteHabit = (id: string) => {
    setHabits(prevHabits => prevHabits.filter(habit => habit.id !== id));
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        toggleHabit,
        editHabit,
        deleteHabit,
        progress
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};