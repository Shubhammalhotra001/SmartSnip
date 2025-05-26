import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import axios from 'axios';
import './dashboard.css';

// Sortable Item Component for Bookmarks
function SortableBookmark({ bookmark, handleViewSummary, handleDelete, theme }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: bookmark._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li className={`bookmark-item ${theme}`} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="bookmark-info">
        <img
          src={bookmark.favicon || `https://www.google.com/s2/favicons?domain=${bookmark.url}`}
          alt="Favicon"
          className="favicon"
          width={20}
          height={20}
          onError={(e) => (e.target.src = 'https://via.placeholder.com/16')}
        />
        <span className="bookmark-title">{bookmark.title || 'Untitled'}</span>
      </div>
      <div className="bookmark-actions">
        <button className={`view-summary-button ${theme}`} onClick={() => handleViewSummary(bookmark.summary)}>
          View Summary
        </button>
        <button className={`delete-button ${theme}`} onClick={() => handleDelete(bookmark._id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default function Dashboard() {
  const [url, setUrl] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [currentSummary, setCurrentSummary] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [error, setError] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Extract fetchBookmarks so it can be called anywhere
  const fetchBookmarks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in.');
        return;
      }
      const res = await axios.get('http://localhost:5000/api/bookmarks', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Clear any previous errors on success
      setError('');

      // Update bookmarks state with a new array to trigger re-render
      setBookmarks(Array.isArray(res.data.bookmarks) ? [...res.data.bookmarks] : []);
    } catch (err) {
      setError('Failed to fetch bookmarks.');
      console.error('Fetch error:', err.response?.data || err.message);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in.');
        setIsLoading(false);
        return;
      }

      await axios.post(
        'http://localhost:5000/api/bookmarks',
        { url },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Re-fetch bookmarks from backend to update UI
      await fetchBookmarks();

      setUrl('');
    } catch (err) {
      setError('Error saving bookmark.');
      console.error('Save error:', err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in.');
        return;
      }
      const res = await axios.delete(`http://localhost:5000/api/bookmarks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        // Re-fetch bookmarks after successful delete
        await fetchBookmarks();
      } else {
        setError('Failed to delete bookmark.');
      }
    } catch (err) {
      setError('Error deleting bookmark.');
      console.error('Delete error:', err.response?.data || err.message);
    }
  };

  const handleViewSummary = (summaryText) => {
    setCurrentSummary(summaryText);
    setShowSummary(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = bookmarks.findIndex((bookmark) => bookmark._id === active.id);
      const newIndex = bookmarks.findIndex((bookmark) => bookmark._id === over.id);

      const reordered = [...bookmarks];
      const [moved] = reordered.splice(oldIndex, 1);
      reordered.splice(newIndex, 0, moved);
      setBookmarks(reordered);
    }
  };

  return (
    <div className={`dashboard-container ${theme}`}>
      <header className={`dashboard-header ${theme}`}>
        <h1 className="logo">SmartSnip</h1>
        <div className="header-actions">
          <button className={`toggle-button ${theme}`} onClick={handleToggleTheme}>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button className={`logout-button ${theme}`} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <p className={`welcome-text ${theme}`}>
          Welcome to SmartSnip! Paste your link below to bookmark/save and get a summary.
        </p>

        <form className="url-form" onSubmit={handleSubmit}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className={`url-input ${theme}`}
            placeholder="Paste your URL here (e.g., https://example.com)"
          />
          <button type="submit" className={`get-summary-button ${theme}`} disabled={isLoading || !url.trim()}>
            {isLoading ? 'Processing...' : 'Get Summary'}
          </button>
        </form>

        {error && <p className={`error-message ${theme}`}>{error}</p>}

        <section className="bookmarks-section">
          <h2 className={`bookmarks-header ${theme}`}>Your Bookmarks</h2>
          {bookmarks.length === 0 ? (
            <p className={`no-bookmarks ${theme}`}>No bookmarks yet. Add a URL above to get started!</p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={bookmarks.map((bookmark) => bookmark._id)} strategy={verticalListSortingStrategy}>
                <ul className="bookmarks-list">
                  {bookmarks.map((bookmark) => (
                    <SortableBookmark
                      key={bookmark._id}
                      bookmark={bookmark}
                      handleViewSummary={handleViewSummary}
                      handleDelete={handleDelete}
                      theme={theme}
                    />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          )}
        </section>
      </main>

      {showSummary && (
        <div className={`summary-overlay ${theme}`}>
          <div className={`summary-modal ${theme}`}>
            <h3 className={`summary-title ${theme}`}>Summary</h3>
            <p className={`summary-content ${theme}`}>{currentSummary || 'No summary available'}</p>
            <button className={`close-button ${theme}`} onClick={() => setShowSummary(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
