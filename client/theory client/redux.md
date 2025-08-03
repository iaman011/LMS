State management : to manage our state we use redux toolkit

<!-- 📦 State Management ka Matlab? -->

"App ke data ko achhe se handle karna, track karna, aur share karna – isse hi State Management kehte hain."

<!-- imp work of redux toolkit -->
📦 Redux Toolkit ke Parts:
Part	Kaam
configureStore()	Store banata hai
createSlice()	Ek feature ka state + uske actions define karta hai
Provider	Store ko React app me connect karta hai
useSelector()	Data ko React component me dikhata hai
useDispatch()	Actions ko fire karta hai (jaise increment())


<!-- redux toolkit -->

🔰 Redux Toolkit क्या है? (Basic samajh)
React me jab hum chhoti app banate hain, to useState kaafi hota hai.
Lekin agar app badi ho jaaye – jisme bahut saare components ek hi data ko use kar rahe ho (jaise login user, cart items, theme), to useState se kaam chalana mushkil ho jaata hai.

Isi shared data ko manage karne ke liye hum use karte hain:

✅ State Management Tool — jisme Redux ek popular choice hai, aur uska easy version hai Redux Toolkit.

🔧 Redux Toolkit kaam kaise karta hai?
Ek central jagah (store) banata hai jahan saari app ka data hota hai.

Har feature (jaise counter, user, cart) ka apna ek slice hota hai.

Hum React components me se data le bhi sakte hain aur update bhi kar sakte hain.


💡 Ek Easy Example – Counter App
Step 1: Install karo
bash
Copy
Edit
npm install @reduxjs/toolkit react-redux
Step 2: Ek slice banao – jaise counter
js
Copy
Edit
// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
    reset: (state) => { state.value = 0 }
  }
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
Step 3: Store banao
js
Copy
Edit
// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});
Step 4: React App ko Redux se jodo
js
Copy
Edit
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
Step 5: Component me use karo
js
Copy
Edit
// Counter.js
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from './counterSlice';

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}

export default Counter;
📌 Samajhne ka Tarika (Simplified)
Term	Hindi Me Matlab
Slice	Ek part of data + uska kaam (jaise counter slice)
Store	Sabhi data ka godown
Action	Kisi cheez ko badalne ka kaam (jaise + ya -)
Reducer	Action ke base pe naya state return karta hai
Dispatch	Action ko trigger karta hai
Selector	Data ko component me dikhata hai

✅ Final Summary
Redux Toolkit se hum React app ka data easily manage kar sakte hain.

Ye Redux ka hi easy version hai jisme kam code likhna padta hai.

Large apps me jahan data share hota hai, wahan Redux Toolkit bahut useful hai.