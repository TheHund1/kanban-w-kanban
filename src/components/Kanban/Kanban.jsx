import { useState } from 'react';
import { collection, orderBy, query, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../../config/firebase';
import Task from '../Task/Task';

export default function Kanban() {
  const tasksRef = collection(firestore, 'tasks');
  const tasksQuery = query(tasksRef, orderBy('createdAt'));
  const [tasks] = useCollection(tasksQuery);
  const [newTaskText, setNewTaskText] = useState('');

  const addTask = async(e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    await addDoc(tasksRef, {
      text: newTaskText,
      createdAt: serverTimestamp(),
      status: 'todo',
      createdBy: auth.currentUser.uid,
      userEmail: auth.currentUser.email
    });

    setNewTaskText('');
  }

  const moveTask = async(taskId, newStatus) => {
    const taskRef = doc(firestore, 'tasks', taskId);
    await updateDoc(taskRef, {
      status: newStatus
    });
  }

  const getTasksByStatus = (status) => {
    if (!tasks) return [];
    const tasksData = tasks.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    return tasksData.filter(task => task.status === status);
  }

  return (
    <div className="kanban">
      <form onSubmit={addTask}>
        <input
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add new task"
        />
        <button type="submit">Add</button>
      </form>

      <div className="board">
        <div className="column">
          <h2>To do</h2>
          {getTasksByStatus('todo').map(task => (
            <Task key={task.id} task={task} onMove={moveTask} />
          ))}
        </div>

        <div className="column">
          <h2>In Progress</h2>
          {getTasksByStatus('inProgress').map(task => (
            <Task key={task.id} task={task} onMove={moveTask} />
          ))}
        </div>

        <div className="column">
          <h2>Done</h2>
          {getTasksByStatus('done').map(task => (
            <Task key={task.id} task={task} onMove={moveTask} />
          ))}
        </div>
      </div>
    </div>
  );
}
