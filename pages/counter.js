import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  selectValue,
} from "../store/slices/counterSlice";

export default function Counter() {
  const count = useSelector(selectValue);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <Link href="/">home</Link>
    </div>
  );
}
