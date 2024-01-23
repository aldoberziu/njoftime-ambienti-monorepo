import { createStore } from "redux";
// import { createSlice } from "@reduxjs/toolkit";

// createSlice({
//     name: 'categoryChanger',
//     initialState: {category: ''},
//     reducers: {
//         changeCategory(state, action){ //this instead of if statement
//             state.category = action.category
//         }
//     }
// })
// see 18.18 video to see how to export this new way of writing a lot of states

const filterCategoriesReducer = (state = { category: '', searchValue: '' , filterString: ''}, action) => {
  if (action.type === "changeCategory") {
    return {
      category: action.category,
    };
  }
  if (action.type === "searchValue") {
    return {
      searchValue: action.searchValue,
    };
  }
  if (action.type === "filterString") {
    return {
      filterString: action.filterString,
    };
  }
  return state;
};

const store = createStore(filterCategoriesReducer);

export default store;
