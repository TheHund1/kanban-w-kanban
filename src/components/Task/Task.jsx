export default function Task({ task, onMove, onDelete }) {
  return (
    <div className="task">
      <p>{task.text}</p>
     
      <small>By: {task.userEmail}</small>
      <div>
      {task.status === 'todo' && (
        <button onClick={() => onMove(task.id, 'inProgress')}>→</button>
      )}
      {task.status === 'inProgress' && (
        <>
          <button onClick={() => onMove(task.id, 'todo')}>←</button>
          <button onClick={() => onMove(task.id, 'done')}>→</button>
        </>
      )}
      {task.status === 'done' && (
        <button onClick={() => onMove(task.id, 'inProgress')}>←</button>
      )}
      <button onClick={() => onDelete(task.id)} className="delete-task-button"> DELETE </button>
      </div>
    </div>

  
  );
}
