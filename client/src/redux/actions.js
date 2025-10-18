import axios from 'axios';

// Action to search news
export const searchNews = (query) => async (dispatch) => {
  try {
    if (!query.trim()) {
      dispatch({ type: 'CLEAR_SEARCH_RESULTS' });
      return;
    }
    const res = await axios.get(`https://newsmania-jccp.onrender.com/api/news/search?q=${encodeURIComponent(query)}`);
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: res.data });
  } catch (error) {
    console.error("Error searching news:", error);
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
  }
};

export const fetchNews = (category) => async (dispatch) => {
  try {
    const res = await axios.get(`https://newsmania-jccp.onrender.com/api/news/${category}`);
    console.warn("Fetched News Data from API:", res.data); // Debugging Log
    dispatch({ type: 'FETCH_NEWS', payload: res.data });
  } catch (error) {
    console.error("Error fetching news:", error.response ? error.response.data : error.message);
    dispatch({ type: 'FETCH_NEWS', payload: [] }); // Ensure empty array if error
  }
};

export const fetchTrendingNews = () => async (dispatch) => {
  try {
    const res = await axios.get(`https://newsmania-jccp.onrender.com/api/news/trending`);
    console.warn("Fetched Trending News:", res.data);
    dispatch({ type: 'FETCH_TRENDING_NEWS', payload: res.data });
  } catch (error) {
    console.error("Error fetching trending news:", error.response ? error.response.data : error.message);
    dispatch({ type: 'FETCH_TRENDING_NEWS', payload: [] });
  }
};

// Action to subscribe to a category
export const subscribeToCategory = (category) => (dispatch) => {
  dispatch({ type: "SUBSCRIBE_CATEGORY", payload: category });
};

export const fetchSubscribedNews = () => async (dispatch, getState) => {
  const { subscribedCategories } = getState();

  if (subscribedCategories.length === 0) {
    dispatch({ type: "CLEAR_NEWS" }); // Clear news if no categories are subscribed
    return;
  }

  try {
    const responses = await Promise.all(
      subscribedCategories.map((category) =>
        axios.get(`https://newsmania-jccp.onrender.com/api/news/${category}`)
      )
    );

    // Combine news from all categories
    const allNews = responses.flatMap((res) => res.data);
    dispatch({ type: "FETCH_NEWS", payload: allNews });
  } catch (error) {
    console.error("Error fetching subscribed news:", error);
    dispatch({ type: "FETCH_NEWS", payload: [] });
  }
};


export const unsubscribeFromCategory = (category) => ({
  type: "UNSUBSCRIBE_CATEGORY",
  payload: category,
});