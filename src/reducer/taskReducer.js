export const initialState = {
  tasks: []
};

export function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };

    default:
      return state;
  }
}
