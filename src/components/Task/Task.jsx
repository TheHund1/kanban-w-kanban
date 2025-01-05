export default function Task({ task, onMove }) {
  return (
    <div className="task">
      <p>{task.text}</p>
      <small>By: {task.userEmail}</small>
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
    </div>
  );
}
