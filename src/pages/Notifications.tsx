import React, { useState } from 'react';
import {
  Bell,
  Check,
  X,
  Calendar,
  MessageSquare,
  Heart,
  Star,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: string;
  type: 'comment' | 'like' | 'mention' | 'follow' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link: string;
}

// Dummy notifications data with different types
const dummyNotifications: Notification[] = [
  {
    id: '1',
    type: 'comment',
    title: 'New Comment',
    message:
      'John Doe commented on your post "Best practices for React performance optimization"',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
    link: '/discussions/1',
  },
  {
    id: '2',
    type: 'like',
    title: 'Post Liked',
    message: 'Your post received 10 likes',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
    link: '/blog/1',
  },
  {
    id: '3',
    type: 'mention',
    title: 'Mentioned in Discussion',
    message: 'Alice mentioned you in "Docker networking issues"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: true,
    link: '/discussions/2',
  },
  {
    id: '4',
    type: 'system',
    title: 'System Update',
    message: 'New features have been added to the platform',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: true,
    link: '/announcements',
  },
  {
    id: '5',
    type: 'follow',
    title: 'New Follower',
    message: 'Sarah started following you',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    read: false,
    link: '/profile/sarah',
  },
];

export function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState<Notification[]>(dummyNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter(
    (n) => filter === 'all' || !n.read
  );

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'comment':
        return <MessageSquare className="w-5 h-5" />;
      case 'like':
        return <Heart className="w-5 h-5" />;
      case 'mention':
        return <Star className="w-5 h-5" />;
      case 'follow':
        return <Bell className="w-5 h-5" />;
      case 'system':
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-sm text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
      </div>
      <div className="max-w-4xl mx-auto ">
        <div className=" bg-[var(--card-bg)] rounded-lg shadow-sm ">
          {/* Header */}
          <div className="border-b dark:border-gray-700 p-4 text-[var(--accent)] ">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-[var(--text-primary)] ">
                Notifications
              </h1>
              <div className="flex items-center space-x-2 bg-[var(--card-bg)] ">
                <select
                  value={filter}
                  onChange={(e) =>
                    setFilter(e.target.value as 'all' | 'unread')
                  }
                  className="rounded-md ml-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-[var(--border-color)] bg-[var(--card-bg)] "
                >
                  <option value="all">All</option>
                  <option value="unread">Unread</option>
                </select>
                <button
                  onClick={markAllAsRead}
                  className="text-sm hover:text-[var(--text-secondary)] text-[var(--accent)]"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="divide-y  divide-gray-200 dark:divide-gray-700">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center  ">
                No notifications to display
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-[var(--bg-primary)]   transition-colors ${
                    !notification.read ? 'bg-[var(--card-bg)]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between ">
                    <div className="flex items-start space-x-3">
                      <div
                        className={`mt-1 ${
                          !notification.read
                            ? 'text-[var(--accent)]'
                            : 'text-[var(--text-hover)]'
                        }`}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-[var(--accent)] focus:text-[var(--primary)]">
                          {notification.title}
                        </h3>
                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                          {notification.message}
                        </p>
                        <p className="mt-1 text-xs text-[var(--text-secondary)]">
                          {formatDistanceToNow(
                            new Date(notification.timestamp),
                            { addSuffix: true }
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-[var(--text-secondary)]">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                        title="Delete notification"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
