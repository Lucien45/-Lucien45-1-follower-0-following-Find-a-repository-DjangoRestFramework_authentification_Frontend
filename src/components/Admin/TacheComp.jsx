import React, { useState, useRef } from 'react';

const initialTasks = {
  todo: [
    { id: '1', content: '[FO] Setup CI/CD and Workflow for Github Action', code: 'FO-5' },
    { id: '2', content: '[FO] Install and setup dev environment', code: 'FO-6' },
    { id: '3', content: '[FO] Install and setup prod environment', code: 'FO-7' },
  ],
  inProgress: [{ id: '4', content: '[FO] Design UI', code: 'FO-13' }],
  done: [{ id: '5', content: '[FO] Add aprofile user', code: 'FO-14' }],
};

export const ListTache = () => {
  const [columns, setColumns] = useState(initialTasks);
  const dragTask = useRef({ colId: '', taskIndex: -1 });
  const draggedOverTask = useRef({ colId: '', taskIndex: -1 });

  const handleSort = () => {
    const { colId: dragColId, taskIndex: dragIndex } = dragTask.current;
    const { colId: dragOverColId, taskIndex: dragOverIndex } = draggedOverTask.current;

    if (dragColId === dragOverColId && dragIndex === dragOverIndex) return;

    const columnsClone = { ...columns };
    const draggedItem = columnsClone[dragColId][dragIndex];
    
    // Remove dragged item from source column
    columnsClone[dragColId].splice(dragIndex, 1);
    
    // Insert dragged item into target column
    columnsClone[dragOverColId].splice(dragOverIndex, 0, draggedItem);

    setColumns(columnsClone);
  };

  const renderTasks = (tasks, colId) => {
    return tasks.map((task, index) => (
      <div
        key={task.id}
        className="relative flex space-x-3 border rounded p-2 bg-gray-100"
        draggable
        onDragStart={() => {
          dragTask.current = { colId, taskIndex: index };
        }}
        onDragEnter={() => {
          draggedOverTask.current = { colId, taskIndex: index };
        }}
        onDragEnd={handleSort}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="tache-item">
            <div className="tache-content">
                <span>{task.content}</span>
            </div>
            <div className="tache-footer">
                <span className="tache-code">{task.code}</span>
                <img
                src="../../../public/media/userdefault.png"
                alt="User Avatar"
                className="user-avatar"
                />
            </div>
            </div>
        </div>
    ));
  };

  return (
    <div className="tache-board">
      <div className="tache-column todo">
        <h3>À FAIRE</h3>
        <ul className="tache-liste">{renderTasks(columns.todo, 'todo')}</ul>
        <li className="create-ticket">
          <button>+ Créer un ticket</button>
        </li>
      </div>

      <div className="tache-column in-progress">
        <h3>EN COURS</h3>
        <ul className="tache-liste">{renderTasks(columns.inProgress, 'inProgress')}</ul>
      </div>

      <div className="tache-column done">
        <h3>FINI</h3>
        <ul className="tache-liste">{renderTasks(columns.done, 'done')}</ul>
        <li className="tache-sousliste">
          <button className="view-all-tickets">Afficher tous les tickets terminés</button>
        </li>
      </div>
    </div>
  );
};

export const AddEditTache = () => {
  return <div>AddTache</div>;
};
