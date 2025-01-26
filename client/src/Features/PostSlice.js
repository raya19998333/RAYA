import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

export const savePost = createAsyncThunk("posts/savePost", async (postData) => {
  try {
    const response = await axios.post(`${ENV.SERVER_URL}/savePost`, {
      postMsg: postData.postMsg,
      category: postData.category,
      email: postData.email,
      name: postData.name,
    });

    const post = response.data.post;
    return post; //Return the new post to Redux
  } catch (error) {
    console.log(error);
  }
});
export const getPosts = createAsyncThunk("post/getPosts", async () => {
  try {
    const response = await axios.get(`${ENV.SERVER_URL}/getPosts`);
    console.log(response);
    return response.data.posts;
  } catch (error) {
    console.log(error);
  }
});
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postId, email }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${ENV.SERVER_URL}/deletePost/${postId}`,
        {
          data: { email }, // إرسال البريد الإلكتروني في body
        }
      );

      if (response.status === 200) {
        return postId; // في حالة النجاح، نعيد الـ postId
      } else {
        return rejectWithValue("Failed to delete the post");
      }
    } catch (error) {
      console.log("Error deleting post", error);
      // إرجاع تفاصيل الخطأ إذا كان هناك استثناء
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle", // أو "loading" أو "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(savePost.pending, (state) => {
        state.status = "loading";
      })

      .addCase(savePost.fulfilled, (state, action) => {
        console.log(action.payload);

        state.status = "succeeded";

        // Update the state with fetched posts adding the latest post in the beginning

        state.posts.unshift(action.payload);
      })

      .addCase(savePost.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.error.message;
      })
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Update the state with fetched posts

        console.log(action.payload);

        state.posts = action.payload;
      })

      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.error.message;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        console.log("Post deleted: ", action.payload); // تأكد من أن الـ postId يصل هنا
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { reset } = postsSlice.actions; //export the function

export default postsSlice.reducer;
