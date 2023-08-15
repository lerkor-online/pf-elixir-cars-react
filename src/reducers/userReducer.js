export const userInitialState =
  JSON.parse(window.localStorage.getItem("user")) || null;

export const USER_ACTION_TYPES = {
  SET_USER: "SET_USER",
  CLEAR_USER: "CLEAR_USER",
};

// Actualizar localStorage con el estado del usuario
export const updateUserLocalStorage = (user) => {
  window.localStorage.setItem("user", JSON.stringify(user));
};

const UPDATE_STATE_BY_USER_ACTION = {
  [USER_ACTION_TYPES.SET_USER]: (state, action) => {
    const { user } = action.payload;
    updateUserLocalStorage(user);
    return user;
  },
  [USER_ACTION_TYPES.CLEAR_USER]: () => {
    updateUserLocalStorage(null);
    return null;
  },
};

export const userReducer = (state, action) => {
  const { type: actionType } = action;
  const updateState = UPDATE_STATE_BY_USER_ACTION[actionType];
  return updateState ? updateState(state, action) : state;
};
