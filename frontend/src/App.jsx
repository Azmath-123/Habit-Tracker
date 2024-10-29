import React, { useState } from 'react';
import HabitList from './components/HabitList';
import StreakChart from './components/StreakChart';

function App() {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Journaling', completedDays: ['Yesterday', 'Last Sunday'] },
    { id: 2, name: 'Running', completedDays: ['Yesterday', 'Last Sunday'] },
    { id: 3, name: '8 hrs of sleep', completedDays: ['Yesterday', 'Last Sunday'] },
    { id: 4, name: 'Meditation', completedDays: ['Yesterday'] },
  ]);

  const [streakData, setStreakData] = useState([4, 2, 3, 4]); // Mock data for streak

  return (
    <div className="app-container">
      <header className="header">
        <h1>Habit Tracker</h1>
        <div className="date-filter">
          <select>
            <option>This week</option>
            <option>Last week</option>
          </select>
        </div>
      </header>
      
      <main className="main-content">
        <HabitList habits={habits} />
        <StreakChart streakData={streakData} />
      </main>
    </div>
  );
}

export default App;
