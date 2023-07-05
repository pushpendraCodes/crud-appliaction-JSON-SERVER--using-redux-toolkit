import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./UserApi";

const initialState = {
  users: [],
  errore: "",
  loading: false,
  page: 0,
  rowsPerPage: 5,
};

// get All USER
export const getAllAsync = createAsyncThunk("/user/getAllUser", async () => {
  const res = await getUsers();
  //   console.log(res, "res1");
  return res.data;
});

// add user function
export const CresteUserAsync = createAsyncThunk(
  "user/CreateUser",
  async (user, navigate) => {
    const response = await fetch("http://localhost:4000/User", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    navigate("/");
    // console.log(response, "response");

    return data;
  }
);

// delete function
export const deleteUserAsync = createAsyncThunk(
  "user/delete",
  async (id, { rejectWithValue }) => {
    let response = await fetch(`http://localhost:4000/User/${id}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
      },
    });
    try {
      console.log(response, "delete");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// update user

export const UpdateUserAsync = createAsyncThunk(
  "user/update",
  async (user, { rejectWithValue }) => {
    let response = await fetch(`http://localhost:4000/User/${user.id}`, {
      method: "put",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    try {
      console.log(response, "update");

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    searchUser: (state, action) => {
      state.users = state.users.filter((person) => {
        return (
          person.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          person.email.toLowerCase().includes(action.payload.toLowerCase()) ||
          person.city.toLowerCase().includes(action.payload.toLowerCase())
        );
      });
    },

  ChangePage: (state, action) => {
      state.page = action.payload;
      console.log(action.payload ,"ChangePage");
    },
  ChangeRowsPerPage: (state, action) => {
      console.log(action.payload,"ChangeRowsPerPage");
      state.rowsPerPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllAsync.rejected, (state, action) => {
        state.errore = action.payload;
        console.log(action.payload, "error");
      })
      .addCase(CresteUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(CresteUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.push(action.payload);
      })
      .addCase(CresteUserAsync.rejected, (state, action) => {
        state.errore = action.payload;
        console.log(action.payload, "error");
      })
      .addCase(deleteUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        const uu = state.users.find((item)=>item.id === id)

        if(uu){
          state.users.filter((user) => user.id !== id);
        }

      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.errore = action.payload;
      })
      .addCase(UpdateUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(UpdateUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })
      .addCase(UpdateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.errore = action.payload.message;
      });
  },
});
export const { searchUser, ChangePage, ChangeRowsPerPage } =
  userSlice.actions;
export default userSlice.reducer;
