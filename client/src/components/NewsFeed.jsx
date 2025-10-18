import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { fetchSubscribedNews } from "../redux/actions";

const socket = io("https://newsmania-jccp.onrender.com", { transports: ["websocket"] });

const NewsFeed = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => Array.isArray(state.news) ? state.news : []);
  const subscribedCategories = useSelector((state) => state.subscribedCategories);
  const searchResults = useSelector((state) => state.searchResults);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchSubscribedNews()).finally(() => {
      setTimeout(() => setIsLoading(false), 500); // Adds a 500ms delay
    });

    subscribedCategories.forEach((category) => {
      socket.emit("subscribeToCategory", category);
      socket.on("newsUpdate", () => {
        setIsLoading(true);
        dispatch(fetchSubscribedNews()).finally(() => {
          setTimeout(() => setIsLoading(false), 500);
        });
      });
    });

    return () => {
      subscribedCategories.forEach(() => {
        socket.off("newsUpdate");
      });
    };
  }, [dispatch, subscribedCategories]);

  return (
    <div className="space-y-8">

      {isLoading ? (
        <div className="flex justify-center items-center mt-8">
          <div className="w-8 h-8 border-2 border-t-transparent border-gray-200 rounded-full animate-spin"></div>
        </div>
      ) : searchResults?.message === "No articles found" ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No articles found</p>
        </div>
      ) : searchResults ? (
        <div className="space-y-8">
          {searchResults.map((article) => (
            <article key={article._id} className="border-b border-gray-200 pb-8 last:border-b-0">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">{article.author?.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{article.author || 'Anonymous'}</p>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <time>{new Date(article.timestamp).toLocaleDateString()}</time>
                    <span>·</span>
                    <span>{article.readTime || 3} min read</span>
                  </div>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-gray-700 cursor-pointer">
                {article.title}
              </h2>
              <p className="text-gray-600 line-clamp-3 mb-4">{article.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200 cursor-pointer">
                    {article.category}
                  </span>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>👁 {article.views}</span>
                    <span>🖤 {article.likes}</span>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No stories available. Subscribe to categories to get started!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {news.map((article) => (
            <article key={article._id} className="border-b border-gray-200 pb-8 last:border-b-0">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">{article.author?.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{article.author || 'Anonymous'}</p>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <time>{new Date(article.timestamp).toLocaleDateString()}</time>
                    <span>·</span>
                    <span>{article.readTime || 3} min read</span>
                  </div>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-gray-700 cursor-pointer">
                {article.title}
              </h2>
              <p className="text-gray-600 line-clamp-3 mb-4">{article.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200 cursor-pointer">
                    {article.category}
                  </span>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>👁 {article.views}</span>
                    <span>🖤 {article.likes}</span>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
