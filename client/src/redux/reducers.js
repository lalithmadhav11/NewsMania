const initialState = { news: [], trending: [], subscribedCategories: ['Business', 'Tech', 'Sports'], searchResults: null };

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_NEWS":
      return { ...state, news: Array.isArray(action.payload) ? action.payload : [] };

    case "FETCH_TRENDING_NEWS":
      return { ...state, trending: Array.isArray(action.payload) ? action.payload : [] };

    case "SUBSCRIBE_CATEGORY":
      return {
        ...state,
        subscribedCategories: [...new Set([...state.subscribedCategories, action.payload])], // Avoid duplicates
      };

    case "UNSUBSCRIBE_CATEGORY": {
      const newSubscribedCategories = state.subscribedCategories.filter(
        (category) => category !== action.payload
      );

      return {
        ...state,
        subscribedCategories: newSubscribedCategories,
        news: state.news.filter((article) => article.category !== action.payload), // Remove news from unsubscribed category
      };
    }

    case "CLEAR_NEWS":
      return { ...state, news: [] };

    case "SET_SEARCH_RESULTS":
      return { ...state, searchResults: action.payload };

    case "CLEAR_SEARCH_RESULTS":
      return { ...state, searchResults: null };

    default:
      return state;
  }
};
