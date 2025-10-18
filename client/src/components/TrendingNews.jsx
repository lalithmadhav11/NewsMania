import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingNews } from "../redux/actions";
import { motion } from "framer-motion";

const TrendingNews = () => {
  const dispatch = useDispatch();
  const trending = useSelector((state) => Array.isArray(state.trending) ? state.trending : []);

  useEffect(() => {
    dispatch(fetchTrendingNews());
  }, [dispatch]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Staff Picks</h2>
      {trending.length === 0 ? (
        <p className="text-gray-500 text-sm">No trending stories available</p>
      ) : (
        <div className="space-y-4">
          {trending.map((article) => (
            <motion.div
              key={article._id}
              className="group cursor-pointer"
              whileHover={{ x: 2 }}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                    {article.title}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {article.content}
                  </p>
                  <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500">
                    <span>{article.likes} likes</span>
                    <span>·</span>
                    <span>{article.views} views</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingNews;
