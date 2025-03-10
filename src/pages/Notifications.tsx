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
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          {/* Header */}
          <div className="border-black dark:border-gray-700 p-4  dark:bg-green-400 text-blue-500 text-center">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-green-950">
                Notifications
              </h1>
              <div className="flex items-center space-x-4">
                <select
                  value={filter}
                  onChange={(e) =>
                    setFilter(e.target.value as 'all' | 'unread')
                  }
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  <option value="all">All</option>
                  <option value="unread">Unread</option>
                </select>
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No notifications to display
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    !notification.read
                      ? 'bg-indigo-50 dark:bg-indigo-900/20'
                      : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div
                        className={`mt-1 ${
                          !notification.read
                            ? 'text-indigo-600 dark:text-indigo-400'
                            : 'text-gray-400 dark:text-gray-500'
                        }`}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {notification.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {notification.message}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                          {formatDistanceToNow(
                            new Date(notification.timestamp),
                            { addSuffix: true }
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
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
