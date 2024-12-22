import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  comments: [],
  likes: [],
};

export const savePost = createAsyncThunk("posts/savePost", async (postData) => {
  try {
    const response = await axios.post("http://localhost:3001/savePost", {
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
    const response = await axios.get("http://localhost:3001/getPosts");
    return response.data.posts;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postId, email }) => {
    // إرسال البريد الإلكتروني مع الـ postId
    try {
      const response = await axios.delete(
        `http://localhost:3001/deletePost/${postId}`,
        {
          data: { email }, // إرسال البريد الإلكتروني في body
        }
      );
      return postId;
    } catch (error) {
      console.log("Error deleting post", error);
      throw new Error("Error deleting post");
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
