import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

// 회원가입 비동기 작업 정의
export const signUp = createAsyncThunk('auth/signUp', async ({ email, password, username }, { rejectWithValue }) => {
  const { user, error } = await api.auth.signUp({
    email,
    password,
    username
  });
  if (error) return rejectWithValue(error.message); // 에러 발생 시 리젝트
  return user; // 성공 시 유저 정보 반환
});

// 로그인 비동기 작업 정의
export const signIn = createAsyncThunk('auth/signIn', async ({ email, password, username }, { rejectWithValue }) => {
  const { user, error } = await api.auth.signIn({
    email,
    password,
    username
  });
  if (error) return rejectWithValue(error.message); // 에러 발생 시 리젝트
  return user; // 성공 시 유저 정보 반환
});

// 로그아웃 비동기 작업 정의
export const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
  const { error } = await api.auth.signOut();
  if (error) return rejectWithValue(error.message); // 에러 발생 시 리젝트
  return {}; // 성공 시 빈 객체 반환
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
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'succeeded'; // 회원가입 성공 상태
        state.user = action.payload; // 유저 정보 저장
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
      })
      .addCase(signOut.rejected, (state, action) => {
        state.status = 'failed'; // 로그아웃 실패 상태
        state.error = action.payload; // 에러 메시지 저장
      });
  }
});

export default authSlice.reducer;