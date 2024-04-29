import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store'; 

interface ApiState {
  loading: boolean;
  error: string | null;
  data: any
}

const initialState: ApiState = {
  loading: false,
  error: null,
  data: []
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
    setData (state, action: PayloadAction<any>) {
      console.log('actionpayload', action.payload)
      console.log("statedata", state.data)
      
        state.data = [...state.data, ...action.payload];
        console.log("statedata after", state.data)
  },
}
});

// Asynchronous action creator for making API calls with token
export const fetchData = (pageNumber: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(setLoading(true));
  const { token } = getState().auth

  console.log('fetch calling', "token is", token)
  try {
    console.log('try calling')
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch(setData(data.results))

  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export const { setLoading, setError, setData } = apiSlice.actions;

export default apiSlice.reducer;


