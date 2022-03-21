import { useState } from 'react';
import './App.css';
import TasksList from './components/tasksList';

function App() {
  return (
    <div className="App" className="allPage">
      {/* <Route></Route> */}

      <TasksList></TasksList>
    </div>

  );
}

export default App;
