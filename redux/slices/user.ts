/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  createUser,
  loginUser,
  updateUserById,
  getUserByOrganization,
  getUserByTokenAccess,
  deleteUser,
  getUserByIdLogin,
  queryAllUsers,
  getAdminUserOfAllOrganization,
  getGloabalySearchDataa,
  updateUserPassword,
  getUserProfileData,
  updateUserPasswordForNew,
} from '../actions/user';

type UserState = {
  loading: boolean;
  error: string | null;
  data: any;
  user: any;
  userInformation: any;
  loginUserInformation: any;
  allResellerRecord: any;
  searchDataa: any;
  createUserData: any;
  updateUserPasswordData: any;
};
const initialState: UserState = {
  loading: false,
  error: null,
  data: [],
  user: [],
  userInformation: [],
  loginUserInformation: {},
  allResellerRecord: {},
  searchDataa: [],
  createUserData: {},
  updateUserPasswordData: {},
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserInformation: (state, action) => {
      state.userInformation = action.payload;
    },
    setAllResellerRecord: (state, action) => {
      state.allResellerRecord = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.createUserData = action.payload;
      })
      .addCase(createUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUserById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(updateUserById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUserPassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateUserPassword.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getUserByOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUserByOrganization.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getUserByOrganization.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getUserByTokenAccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUserByTokenAccess.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.userInformation = action.payload;
        },
      )
      .addCase(
        getUserByTokenAccess.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserByIdLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUserByIdLogin.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.loginUserInformation = action.payload;
        },
      )
      .addCase(
        getUserByIdLogin.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(queryAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(queryAllUsers.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(queryAllUsers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAdminUserOfAllOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAdminUserOfAllOrganization.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAdminUserOfAllOrganization.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getGloabalySearchDataa.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getGloabalySearchDataa.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.searchDataa = action.payload;
        },
      )
      .addCase(
        getGloabalySearchDataa.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getUserProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUserProfileData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.searchDataa = action.payload;
        },
      )
      .addCase(
        getUserProfileData.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateUserPasswordForNew.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUserPasswordForNew.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.updateUserPasswordData = action.payload;
        },
      )
      .addCase(
        updateUserPasswordForNew.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setUser, setUserInformation, setAllResellerRecord} =
  userSlice.actions;
export default userSlice?.reducer;

// console.log(
//   'error12345',
//   action.payload?.message?.response?.data?.message,
// );