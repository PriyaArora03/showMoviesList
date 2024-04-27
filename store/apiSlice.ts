import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store'; 

interface ApiState {
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  loading: false,
  error: null,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

// Asynchronous action creator for making API calls with token
export const fetchData = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(setLoading(true));
  const { token } = getState().auth
  console.log('fetch calling')
  try {
    console.log('try calling')
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("data is ", data)
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export const { setLoading, setError } = apiSlice.actions;

export default apiSlice.reducer;


