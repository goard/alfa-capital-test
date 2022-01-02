import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cards: [],
  status: "idle",
  error: null,
};

export const fetchCards = createAsyncThunk("photos/getPhotos", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/photos?_limit=10"
  );
  const cards = await response.json()
  return cards;
});

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchCards.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cards = state.cards.concat(action.payload);
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = cardSlice.actions;
export default cardSlice.reducer;
