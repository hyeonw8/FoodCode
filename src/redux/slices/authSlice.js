import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import { userDataUpdate } from './userSlice';

// 회원가입 비동기 작업 정의
export const signUp = createAsyncThunk('auth/signUp', async ({ email, password, nickname }, { rejectWithValue }) => {
  try {
    const user = await api.auth.signUp(email, password, nickname);
    return user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// 로그인 비동기 작업 정의
export const signIn = createAsyncThunk('auth/signIn', async ({ email, password }, { rejectWithValue, dispatch }) => {
  try {
    const user = await api.auth.signIn(email, password);
    dispatch(userDataUpdate(user));
    return user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// 로그아웃 비동기 작업 정의
export const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
  try {
    await api.auth.signOut();
    localStorage.removeItem('supabase.auth.token');
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// 현재 사용자 가져오기
export const getUser = createAsyncThunk('auth/getUser', async (_, { rejectWithValue, dispatch }) => {
  try {
    const user = await api.auth.getUser();
    dispatch(userDataUpdate(user));
    return user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading'; // 회원가입 요청 중 상태
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status = 'succeeded'; // 회원가입 성공 상태
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed'; // 회원가입 실패 상태
        state.error = action.payload; // 에러 메시지 저장
      })
      .addCase(signIn.pending, (state) => {
        state.status = 'loading'; // 로그인 요청 중 상태
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded'; // 로그인 성공 상태
        state.user = action.payload; // 유저 정보 저장
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed'; // 로그인 실패 상태
        state.error = action.payload; // 에러 메시지 저장
      })
      .addCase(signOut.pending, (state) => {
        state.status = 'loading'; // 로그아웃 요청 중 상태
      })
      .addCase(signOut.fulfilled, (state) => {
        state.status = 'succeeded'; // 로그아웃 성공 상태
        state.user = null; // 유저 정보 제거
        localStorage.removeItem('supabase.auth.token'); // 토큰 제거
      })
      .addCase(signOut.rejected, (state, action) => {
        state.status = 'failed'; // 로그아웃 실패 상태
        state.error = action.payload; // 에러 메시지 저장
      })
      .addCase(getUser.pending, (state) => {
        state.status = 'loading'; // 사용자 정보 요청 중 상태
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded'; // 사용자 정보 가져오기 성공 상태
        state.user = action.payload; // 유저 정보 저장
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed'; // 사용자 정보 가져오기 실패 상태
        state.error = action.payload; // 에러 메시지 저장
      });
  }
});

export default authSlice.reducer;
