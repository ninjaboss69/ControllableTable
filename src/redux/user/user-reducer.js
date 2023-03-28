export const USERS_ACTIONS_TYPES = {
  SET_USERS: "SET_USERS",
  SET_EXPAND_USER_DATA: "SET_EXPAND_USER_DATA",
  ADD_CLOSE_KEY: "ADD_CLOSE_KEY",
  REMOVE_CLOSE_KEY: "REMOVE_CLOSE_KEY",
  SORT_USERS_BY_KEY: "SORT_USERS_BY_KEY",
  SET_ORDER_KEYS: "SET_ORDER_KEYS",
};

const INITIAL_STATE = {
  currentUsers: [],
  expandUserData: {},
  closeKeys: [],
  filterUsers: [],
  keys: [],
  orderKeys: [],
};

export const updateFilterUsers = (currentUsers, newCloseKeys, newOrderKeys) => {
  // First get all filtered users by close keys

  const newUsers = [];
  currentUsers.forEach((user) => {
    const newUser = {};
    Object.keys(user).forEach((key) => {
      if (!newCloseKeys.includes(key)) {
        newUser[key] = user[key];
      }
    });
    newUsers.push(newUser);
  });
  const tt = [...newUsers];

  // Second get all filtered users by orders keys

  const newFiltersUsers = [];

  tt.forEach((filterUser) => {
    const newObject = {};

    newOrderKeys.forEach((key) => {
      // have to check in case the column still exits
      if (filterUser[key]) newObject[key] = filterUser[key];
    });
    newFiltersUsers.push(newObject);
  });

  // Now We Return The New Filtered Users which already filtered by close keys and order keys

  return newFiltersUsers;
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USERS_ACTIONS_TYPES.SET_USERS: {
      // set data which will get from different sources
      // must be array of objects (Typical JSON)

      return {
        ...state,
        currentUsers: [...payload],
        filterUsers: [...payload],
        orderKeys: [...Object.keys(state.currentUsers[0] || {})],
        closeKeys: [],
      };
    }

    case USERS_ACTIONS_TYPES.SET_ORDER_KEYS: {
      // Brainwashed filterUsers data by payload ()

      const tt = updateFilterUsers(
        state.currentUsers,
        state.closeKeys,
        payload
      );

      return {
        ...state,
        orderKeys: [...payload],
        filterUsers: [...tt],
      };
    }

    case USERS_ACTIONS_TYPES.SORT_USERS_BY_KEY: {
      // Change currentUsers of state by sorting, with reference it will update currentUsers

      state.currentUsers.sort((a, b) => (a[payload] < b[payload] ? -1 : 1));

      // Now we update filteredUsers

      const tt = updateFilterUsers(
        state.currentUsers,
        state.closeKeys,
        state.orderKeys
      );

      return { ...state, filterUsers: [...tt] };
    }

    case USERS_ACTIONS_TYPES.ADD_CLOSE_KEY: {
      // update state of closeKeys and update the filterUsers

      const newCloseKeys = [...state.closeKeys, payload];

      const tt = updateFilterUsers(
        state.currentUsers,
        newCloseKeys,
        state.orderKeys
      );

      return {
        ...state,
        closeKeys: newCloseKeys,
        filterUsers: [...tt],
      };
    }

    case USERS_ACTIONS_TYPES.REMOVE_CLOSE_KEY: {
      // update state of closeKeys and update the filterUsers

      const newCloseKeys = state.closeKeys.filter((key) => {
        return key !== payload;
      });

      const tt = updateFilterUsers(
        state.currentUsers,
        newCloseKeys,
        state.orderKeys
      );

      return {
        ...state,
        closeKeys: newCloseKeys,
        filterUsers: [...tt],
      };
    }
    // In case of other reducers' action types, we just return the state, not modifying a bit

    default:
      return state;
  }
};
