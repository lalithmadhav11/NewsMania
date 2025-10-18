import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { fetchSubscribedNews, subscribeToCategory, unsubscribeFromCategory } from "../redux/actions";

const socket = io("https://news-repo-backend.onrender.com", { transports: ["websocket"] });

const categories = [
  "Business", "Tech", "Sports",
  "Entertainment", "Health", "Science", "Politics", "Education",
  "Environment", "Travel", "Food", "Lifestyle", "Gaming",
  "Economy", "Finance"
];

const CategorySubscriptions = () => {
  const dispatch = useDispatch();
  const subscribedCategories = useSelector((state) => state.subscribedCategories);

  const [loadingCategory, setLoadingCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Disable all buttons

  useEffect(() => {
    // Subscribe to default categories via WebSocket
    subscribedCategories.forEach(category => {
      socket.emit("subscribeToCategory", category);
    });
    
    // Fetch news for default categories
    dispatch(fetchSubscribedNews());
  }, []);

  const handleToggleSubscription = async (category) => {
    if (isLoading) return; // Prevent multiple requests

    setIsLoading(true);
    setLoadingCategory(category);

    try {
      if (subscribedCategories.includes(category)) {
        dispatch(unsubscribeFromCategory(category));
        socket.emit("unsubscribeFromCategory", category);
      } else {
        dispatch(subscribeToCategory(category));
        socket.emit("subscribeToCategory", category);
      }

      // Simulate API delay
      setTimeout(() => {
        dispatch(fetchSubscribedNews());
        setLoadingCategory(null);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Subscription failed:", error);
      setLoadingCategory(null);
      setIsLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (isLoading || subscribedCategories.length === 0) return;

    setIsLoading(true);
    try {
      // Unsubscribe from all categories
      subscribedCategories.forEach(category => {
        dispatch(unsubscribeFromCategory(category));
        socket.emit("unsubscribeFromCategory", category);
      });

      // Simulate API delay
      setTimeout(() => {
        dispatch(fetchSubscribedNews());
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Clear all failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold text-gray-900">
          Recommended topics
        </h2>
        <button
          onClick={handleClearAll}
          disabled={isLoading || subscribedCategories.length === 0}
          className={`px-3 py-1 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors
            ${(isLoading || subscribedCategories.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleToggleSubscription(category)}
            disabled={isLoading}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${subscribedCategories.includes(category)
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {loadingCategory === category ? (
              <div className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin"></div>
            ) : (
              <span>{category}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySubscriptions;
