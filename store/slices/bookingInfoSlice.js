import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  pickup: "",
  destination: "",
  pickupTime: "",
  pickupDate: "",
  noofPersons: "1",
  carType: "",
  emailId: "",
  mobileNumber: "",
  otp: "",
  otpGenerate: "",
  otpVerified: "",
  currentDate: "",
};

export const bookingInfoSlice = createSlice({
  name: "bookingInfo",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } =
  bookingInfoSlice.actions;

export const selectAll = (state) => state.bookingInfo;
export const selectName = (state) => state.bookingInfo.name;
export const selectPickup = (state) => state.bookingInfo.pickup;
export const selectDestination = (state) => state.bookingInfo.destination;
export const selectPickupTime = (state) => state.bookingInfo.pickupTime;
export const selectPickupDate = (state) => state.bookingInfo.pickupDate;
export const selectnoofPersons = (state) => state.bookingInfo.noofPersons;
export const selectCarType = (state) => state.bookingInfo.carType;
export const selectEmailId = (state) => state.bookingInfo.emailId;
export const selectMobileNumber = (state) => state.bookingInfo.mobileNumber;
export const selectOtp = (state) => state.bookingInfo.otp;
export const selectOtpGenerate = (state) => state.bookingInfo.otpGenerate;
export const selectOtpVerified = (state) => state.bookingInfo.otpVerified;
export const selectCurrentDate = (state) => state.bookingInfo.currentDate;

export default bookingInfoSlice.reducer;
