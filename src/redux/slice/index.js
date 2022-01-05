import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const cardsAdapter = createEntityAdapter();

const initialState = cardsAdapter.getInitialState({
  filter: false,
  status: "idle",
  error: null,
});

export const fetchCards = createAsyncThunk("photos/getPhotos", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/photos?_limit=10"
  );
  const cards = await response.json();
  return cards;
});

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    cardLiked(state, action) {
      const id = action.payload;
      const existingCard = state.entities[id];
      if (existingCard) {
        existingCard.liked += 1;
      }
    },
    cardsLikedFilter(state, action) {
      state.filter = !state.filter;
    },
    cardDelete: cardsAdapter.removeOne,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCards.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        const arrPayload = action.payload.map((el) => {
          return { ...el, liked: 0 };
        });
        // state.cards = state.cards.concat(arrPayload);
        cardsAdapter.setAll(state, arrPayload);
        state.status = "succeeded";
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { cardLiked, cardDelete, cardsLikedFilter } = cardSlice.actions;
export default cardSlice.reducer;

export const { selectAll: selectCards, selectById: selectCardById } =
  cardsAdapter.getSelectors((state) => state.cards);

/**
 * Selector create another state data.
 */
export const selectCardIds = createSelector(
  selectCards,
  (state) => state.cards.filter,
  (cards, filters) => {
    if (filters) {
      return cards.filter((card) => card.liked !== 0).map((card) => card.id);
    } else {
      return cards.map((card) => card.id);
    }
  }
);
