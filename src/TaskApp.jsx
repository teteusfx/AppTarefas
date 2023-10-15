import './App.css'
import { useState } from 'react';

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [currentPage, setCurrentPage] = useState('pendentes');

  const adicionarTask = () => {
    if (taskText.trim() !== '') {
      setTasks([...tasks, { text: taskText, completed: false }]);
      setTaskText('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deletarTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const filterTasks = (type) => {
    setCurrentPage(type);
  };

  const filteredTasks = tasks.filter((task) => {
    if (currentPage === 'pendentes') {
      return !task.completed;
    } else if (currentPage === 'concluídos') {
      return task.completed;
    }
    return true;
  });

  return (
    <div className='container'>
      <h1>TASKS.IO</h1>
      <br></br>
      <div className='top'>
        <input
          type="text"
          placeholder="DIGITE SUA TAREFA..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button onClick={adicionarTask}>+</button>
      </div>
      <br></br>
      <div className='buttons'>
        <button className='btn1' onClick={() => filterTasks('pendentes')}>PENDENTES</button>
        <button className='btn2' onClick={() => filterTasks('concluídos')}>CONCLUIDAS</button>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deletarTask(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskApp;