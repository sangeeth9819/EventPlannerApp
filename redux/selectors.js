
// Example selector to get the entire user object
export const selectUser = (state) => state.user.user.user;

// Example selector to get the user name
export const selectUserName = (state) => state.user.user.user.name;
