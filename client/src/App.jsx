import React from "react";
import CategorySubscriptions from "./components/CategorySubscriptions";
import NewsFeed from "./components/NewsFeed";
import TrendingNews from "./components/TrendingNews";
import Navbar from "./components/Navbar";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <NewsFeed />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <CategorySubscriptions />
            <TrendingNews />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
