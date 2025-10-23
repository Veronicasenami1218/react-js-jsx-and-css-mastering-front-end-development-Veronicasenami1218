import { useEffect, useMemo, useState } from 'react';
import Button from './Button';
import Card from './Card';
import { useLocalStorage } from '../hooks/useLocalStorage';

const filters = {
  all: () => true,
  active: (t) => !t.completed,
  completed: (t) => t.completed,
};

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');

  // Load saved tasks (handled by useLocalStorage initialization)
  useEffect(() => {
    // side-effects could go here if needed
  }, []);

  const filtered = useMemo(() => tasks.filter(filters[filter]), [tasks, filter]);

  function addTask(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const newTask = { id: crypto.randomUUID(), text: text.trim(), completed: false };
    setTasks((prev) => [newTask, ...prev]);
    setText('');
  }

  function toggleTask(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.completed));
  }

  return (
    <div className="space-y-6">
      <Card title="Add a task">
        <form onSubmit={addTask} className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. Learn useContext"
            className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Button type="submit" variant="primary">Add</Button>
        </form>
      </Card>

      <Card title="Tasks" footer={
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button size="sm" variant={filter === 'all' ? 'primary' : 'secondary'} onClick={() => setFilter('all')}>All</Button>
            <Button size="sm" variant={filter === 'active' ? 'primary' : 'secondary'} onClick={() => setFilter('active')}>Active</Button>
            <Button size="sm" variant={filter === 'completed' ? 'primary' : 'secondary'} onClick={() => setFilter('completed')}>Completed</Button>
          </div>
          <Button size="sm" variant="danger" onClick={clearCompleted}>Clear completed</Button>
        </div>
      }>
        {filtered.length === 0 ? (
          <p className="text-slate-600">No tasks.</p>
        ) : (
          <ul className="divide-y divide-slate-200">
            {filtered.map((t) => (
              <li key={t.id} className="flex items-center justify-between py-2">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTask(t.id)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-400"
                  />
                  <span className={t.completed ? 'line-through text-slate-400' : 'text-slate-800'}>{t.text}</span>
                </label>
                <Button size="sm" variant="danger" onClick={() => deleteTask(t.id)}>Delete</Button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
