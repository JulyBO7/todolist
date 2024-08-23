import ReactDOM from 'react-dom/client';
import './index.css';
import AppWithRedux from './app/App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppWithRedux />
    </Provider>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals




// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom'
// import React from 'react'

// type UserType = {
//   id: number
//   name: string
//   avatar: string
//   age: number
//   address: string
// }

// const users: UserType[] = [
//   {
//     id: 1,
//     name: 'my Name',
//     age: 32,
//     avatar: '—ฅ/ᐠ.̫ .ᐟ\\ฅ—',
//     address: 'my Address'
//   },
//   {
//     id: 2,
//     name: 'John',
//     age: 22,
//     avatar: ':)',
//     address: 'California'
//   },
//   {
//     id: 3,
//     name: 'Mike',
//     age: 18,
//     avatar: '^._.^',
//     address: 'New York'
//   },
//   {
//     id: 4,
//     name: 'Emma',
//     age: 38,
//     avatar: '/ᐠ-ꞈ-ᐟ\\',
//     address: 'Washington'
//   },
// ]

// const StartPage = () => {
//   const navigate = useNavigate()
//   const friends = users.filter(u => u.id !== 1)

//   const mappedFriends = friends.map((f, i) => {
//     const go = () => {
//       navigate('/friend/' + f.id)
//     }

//     return (
//       <div key={i} onClick={go} style={{paddingLeft: 24, color: 'blue', cursor: 'pointer'}}>
//         {f.name}, {f.age}
//       </div>
//     )
//   })

//   return (
//     <div>
//       <h2>🙂 My profile</h2>
//       <Profile userId={1}/>
//       <hr/>
//       <h2>👪 Friends</h2>
//       {mappedFriends}
//     </div>
//   )
// }
// const Profile: React.FC<{ userId?: number }> = ({userId}) => {
//   const {id} = useParams<{ id: string }>()
//   const user = users.find(u => u.id === +(id || userId || 0))

//   return (
//     <div>
//       <div>
//         <b>avatar</b> {user?.avatar}</div>
//       <div>
//         <div><b>name</b>: {user?.name}</div>
//         <div><b>age</b>: {user?.age}</div>
//         <div><b>address</b>: {user?.address}</div>
//       </div>
//     </div>
//   )
// }

// export const Friends = () => {
//   return (
//     <Routes>
//       <Route path={'/'} element={<StartPage/>}/>
//       <Route path={'/friend/:id'} element={<Profile/>}/>
//       <Route path={'*'} element={<div>❌404 Page Not Found❌</div>}/>
//     </Routes>
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(
//   <BrowserRouter>
//     <Friends/>
//   </BrowserRouter>
// );

// 📜 Описание:
// При загрузке приложения на экране отображается
// профиль пользователя и список друзей.
// Если кликнуть на пользователя, то видим ❌404 Page Not Found❌
// Исправьте код, чтобы по клику на пользователя
// отображалась странице с информацией о друге.
// В качестве ответа укажите исправленную строку кода.
//
// 🖥 Пример ответа: <Profile userId={4}/>

// 📜 Описание:
// После старта / обновления приложения мы видим Login, а потом через 3 секунды Profile
// Но это плохое поведение.
// Ваша задача написать код при котором пользователя не будет редиректить на Login,
// пока приложение не проинициализировано,
// а во время ожидания ответа с сервера он будет видеть Loader

// 🖥 Пример ответа: <Loader/>
// import ReactDOM from "react-dom/client";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import React, { FC, useEffect } from "react";
// import axios from "axios";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";

// // Styles
// const table: React.CSSProperties = {
//   borderCollapse: "collapse",
//   width: "100%",
//   tableLayout: "fixed",
// };

// const th: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
//   background: "lightgray",
//   cursor: "pointer",
// };

// const td: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
// };

// const thActive: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
//   background: "lightblue",
//   cursor: "pointer",
// };

// // Types
// type UserType = {
//   id: string;
//   name: string;
//   age: number;
// };

// type UsersResponseType = {
//   items: UserType[];
//   totalCount: number;
// };

// type ParamsType = {
//   sortBy: string | null;
//   sortDirection: "asc" | "desc" | null;
// };

// // API
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/" });

// const api = {
//   getUsers(params?: ParamsType) {
//     return instance.get<UsersResponseType>("users", { params });
//   },
// };

// // Reducer
// const initState = {
//   users: [] as UserType[],
//   params: {
//     sortBy: "name",
//     sortDirection: "asc",
//   } as ParamsType,
// };
// type InitStateType = typeof initState;

// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//   switch (action.type) {
//     case "SET_USERS":
//       return { ...state, users: action.users };
//     case "SET_PARAMS":
//       return { ...state, params: { ...state.params, ...action.payload } };
//     default:
//       return state;
//   }
// };

// // Store
// const rootReducer = combineReducers({ app: appReducer });

// const store = configureStore({ reducer: rootReducer });
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// const setUsersAC = (users: UserType[]) => ({ type: "SET_USERS", users }) as const;
// const setParamsAC = (payload: ParamsType) => ({ type: "SET_PARAMS", payload }) as const;
// type ActionsType =
//   | ReturnType<typeof setUsersAC>
//   | ReturnType<typeof setParamsAC>

// // Thunk
// const getUsersTC = (): AppThunk => (dispatch, getState) => {
//   const params = getState().app.params;
//   api.getUsers(params).then((res) => dispatch(setUsersAC(res.data.items)));
// };

// export const Users = () => {
//   const users = useAppSelector((state) => state.app.users);
//   const sortBy = useAppSelector((state) => state.app.params.sortBy);
//   const sortDirection = useAppSelector((state) => state.app.params.sortDirection);

//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(getUsersTC());
//   }, [sortBy, sortDirection]);

//   const sortHandler = (sortBy: string) => {
//     const direction = sortDirection === "asc" ? "desc" : "asc";
//     dispatch(setParamsAC({ sortBy, sortDirection: direction }));
//   };

//   return (
//     <div>
//       <h1>👪 Список пользователей</h1>
//       <table style={table}>
//         <thead>
//           <tr>
//             <Th name={"name"} sortHandler={sortHandler} />
//             <Th name={"age"} sortHandler={sortHandler} />
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => {
//             return (
//               <tr key={u.id}>
//                 <td style={td}>{u.name}</td>
//                 <td style={td}>{u.age}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// type ThPropsType = {
//   name: string;
//   sortHandler: (name: string) => void;
// };

// const Th: FC<ThPropsType> = ({ name, sortHandler }) => {
//   const sortBy = useAppSelector((state) => state.app.params.sortBy);
//   const sortDirection = useAppSelector((state) => state.app.params.sortDirection);

//   const condition1 = name === sortBy //ОТВЕТ !!!!!!
//   const condition2 = sortDirection === 'asc' //ОТВЕТ !!!!!

//   return (
//     <th style={condition1 ? thActive : th} onClick={() => sortHandler(name)}>
//       {name}
//       {condition1 && (condition2 ? <span> ⬆</span> : <span> ⬇</span>)}
//     </th>
//   );
// };

// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//   <Provider store={store}>
//     <Users />
//   </Provider>,
// );

// 📜 Описание:
// Перед вами таблица с пользователями.
// Покликайте по вкладкам age и name и убедитесь, что сортировка работает верно,
// но в шапке некорректно отображаются стрелки и не видно активной колонки
// Ваша задача написать правильные условия вместо XXX и YYY, чтобы:
// 1) Стрелки соответствовали сортировке (если сортировка от меньшего к большему, то стрелка вверх)
// 2) Шапка активной колонки была голубая, а неактивной серая
// ❗ Ответ дайте через пробел

// // 🖥 Пример ответа: a === '1' b !== a




// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import ReactDOM from 'react-dom/client'

// type UserType = {
//   id: string;
//   name: string;
//   age: number;
// }

// // API
// const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.io/api/'})

// const api = {
//   getUsers() {
//     // return instance.get('users?pageSize=3&pageNumber=2')
//     return instance.get('users', {params: {pageSize: 3, pageNumber: 2 }})

//   },
// }

// // App
// export const App = () => {

//   const [users, setUsers] = useState<UserType[]>([])

//   useEffect(() => {
//     api.getUsers()
//       .then((res) => {
//         setUsers(res.data.items)
//       })
//   }, [])


//   return (
//     <>
//       <h1>👪 Список пользователей</h1>
//       {
//         users.map(u => {
//           return <div style={{display: 'flex', gap: '10px'}} key={u.id}>
//             <p><b>name</b>: {u.name}</p>
//             <p><b>age</b>: {u.age}</p>
//           </div>
//         })
//       }
//     </>
//   )
// }


// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<App/>)

// 📜 Описание:
// На странице отображен список юзеров из 3-человек.
// Подгрузились именно эти пользователи не случайно, а из-за query параметров указанных в запросе.
// Ваша задача переписать строку с запросом таким образом, чтобы получить аналогичный результат (все тех же юзеров),
// при этом запрещено в ответе использовать символы вопроса и амперсанда.
// В качестве ответа укажите полностью исправленную строку коду (переносы разрешены)


// 🖥 Пример ответа: return instance.get('users=pageSize=3=pageNumber=2')

// import ReactDOM from "react-dom/client";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import React, { useEffect } from "react";
// import axios from "axios";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";

// // Styles
// const table: React.CSSProperties = {
//   borderCollapse: "collapse",
//   width: "100%",
//   tableLayout: "fixed",
// };

// const th: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
//   background: "lightgray",
//   cursor: "pointer",
// };

// const td: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
// };

// // Types
// type UserType = {
//   id: string;
//   name: string;
//   age: number;
// };

// type UsersResponseType = {
//   items: UserType[];
//   totalCount: number;
// };

// type ParamsType = {
//   sortBy: string | null;
//   sortDirection: "asc" | "desc" | null;
// };

// // API
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/" });

// const api = {
//   getUsers(params?: ParamsType) {
//     return instance.get<UsersResponseType>("users", { params });
//   },
// };

// // Reducer
// const initState = {
//   users: [] as UserType[],
//   params: {
//     sortBy: null,
//     sortDirection: "asc",
//   } as ParamsType,
// };
// type InitStateType = typeof initState;

// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//   switch (action.type) {
//     case "SET_USERS":
//       return { ...state, users: action.users };
//     case "SET_PARAMS":
//       return { ...state, params: { ...state.params, ...action.payload } };
//     default:
//       return state;
//   }
// };

// // Store
// const rootReducer = combineReducers({ app: appReducer });

// const store = configureStore({ reducer: rootReducer });
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// const setUsersAC = (users: UserType[]) => ({ type: "SET_USERS", users }) as const;
// const setParamsAC = (payload: ParamsType) => ({ type: "SET_PARAMS", payload }) as const;
// type ActionsType = ReturnType<typeof setUsersAC> | ReturnType<typeof setParamsAC>;

// // Thunk
// const getUsersTC = (): AppThunk => (dispatch, getState) => {
//   const params = getState().app.params;
//   api
//     .getUsers(params.sortBy ? params : undefined)
//     .then((res) => dispatch(setUsersAC(res.data.items)));
// };

// export const Users = () => {
//   const users = useAppSelector((state) => state.app.users);
//   const sortBy = useAppSelector((state) => state.app.params.sortBy);
//   const sortDirection = useAppSelector((state) => state.app.params.sortDirection);
//   console.log(users, sortBy, sortDirection);

//   const dispatch = useAppDispatch();
//   useEffect(()=> {
//       dispatch(getUsersTC())
//     },[sortBy, sortDirection])

//   // ❗❗❗ XXX ❗❗❗

//   const sortHandler = (name: string) => {
//     const direction = sortDirection === "asc" ? "desc" : "asc";
//     dispatch(setParamsAC({ sortBy: name, sortDirection: direction }));
//   };

//   return (
//     <div>
//       <h1>👪 Список пользователей</h1>
//       <table style={table}>
//         <thead>
//           <tr>
//             <th style={th} onClick={() => sortHandler("name")}>
//               Name
//             </th>
//             <th style={th} onClick={() => sortHandler("age")}>
//               Age
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => {
//             return (
//               <tr key={u.id}>
//                 <td style={td}>{u.name}</td>
//                 <td style={td}>{u.age}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//   <Provider store={store}>
//     <Users />
//   </Provider>,
// );

// 📜 Описание:
// Перед вами таблица с пользователями. Но данные не подгружаются
// Что нужно написать вместо XXX, чтобы:
// 1) Пользователи подгрузились
// 2) Чтобы работала сортировка по имени и возрасту
// 3) Направление сортировки тоже должно работать (проверить можно нажав на одно и тоже поле 2 раза)

// 🖥 Пример ответа: console.log(users, sortBy, sortDirection)





// import ReactDOM from "react-dom/client";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import React, { useEffect } from "react";
// import axios from "axios";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";

// // Styles
// const table: React.CSSProperties = {
//   borderCollapse: "collapse",
//   width: "100%",
//   tableLayout: "fixed",
// };

// const th: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
//   background: "lightgray",
//   cursor: "pointer",
// };

// const td: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
// };

// // Types
// type UserType = {
//   id: string;
//   name: string;
//   age: number;
// };

// type UsersResponseType = {
//   items: UserType[];
//   totalCount: number;
// };

// // API
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/" });

// const api = {
//   getUsers() {
//     return instance.get<UsersResponseType>("users");
//   },
// };

// // Reducer
// const initState = {
//   users: [] as UserType[],
// };
// type InitStateType = typeof initState;

// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//   switch (action.type) {
//     case "SET-USERS":
//       return { ...state, users: action.users };
//     default:
//       return state;
//   }
// };

// // Store
// const rootReducer = combineReducers({ app: appReducer });

// const store = configureStore({ reducer: rootReducer });
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// const setUsersAC = (users: UserType[]) => ({ type: "SET-USERS", users });
// type ActionsType = ReturnType<typeof setUsersAC>;

// // Thunk
// const getUsersTC = (): AppThunk => (dispatch, getState) => {
//   api.getUsers().then((res) => dispatch(setUsersAC(res.data.items)));
// };

// // Components
// export const Users = () => {
//   const users = useAppSelector((state) => state.app.users);

//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(getUsersTC());
//   }, []);

//   return (
//     <div>
//       <h1>👪 Список пользователей</h1>
//       <table style={table}>
//         <thead>
//           <tr>
//             <th style={th}> Name</th>
//             <th style={th}> Age</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u.id}>
//               <td style={td}>{u.name}</td>
//               <td style={td}>{u.age}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//   <Provider store={store}>
//     <Users />
//   </Provider>,
// );

// // 📜 Описание:
// // Перед вами пустая таблица. Пользователи не подгрузились, т.к. в коде допущена ошибка
// // Ваша задача найти багу, чтобы таблица с пользователями подгрузилась.
// // В качестве укажите исправленную строку кода
// // ❗ Есть несколько вариантов решения данной задачи, в ответах учтены различные варианты

// // 🖥 Пример ответа: {users.map(u)=> таблица отрисуйся ВЖУХ ВЖУХ}



// import ReactDOM from "react-dom/client";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import React, { useEffect } from "react";
// import axios from "axios";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";

// // Styles
// const table: React.CSSProperties = {
//   borderCollapse: "collapse",
//   width: "100%",
//   tableLayout: "fixed",
// };

// const th: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
//   background: "lightgray",
//   cursor: "pointer",
// };

// const td: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
// };

// // Types
// type UserType = {
//   id: string;
//   name: string;
//   age: number;
// };

// type UsersResponseType = {
//   items: UserType[];
//   totalCount: number;
// };

// type ParamsType = {
//   sortBy: string | null;
//   sortDirection: "asc" | "desc" | null;
// };

// // API
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/" });

// const api = {
//   getUsers(params?: ParamsType) {
//     return instance.get<UsersResponseType>("users", { params });
//   },
// };

// // Reducer
// const initState = {
//   users: [] as UserType[],
//   params: {
//     sortBy: null,
//     sortDirection: "asc",
//   } as ParamsType,
// };
// type InitStateType = typeof initState;

// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//   switch (action.type) {
//     case "SET_USERS":
//       return { ...state, users: action.users };
//     case "SET_PARAMS":
//       return { ...state, params: { ...state.params, ...action.payload } };
//     default:
//       return state;
//   }
// };

// // Store
// const rootReducer = combineReducers({ app: appReducer });

// const store = configureStore({ reducer: rootReducer });
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// const setUsersAC = (users: UserType[]) => ({ type: "SET_USERS", users }) as const;
// const setParamsAC = (payload: ParamsType) => ({ type: "SET_PARAMS", payload }) as const;
// type ActionsType = ReturnType<typeof setUsersAC> | ReturnType<typeof setParamsAC>;

// // Thunk
// const getUsersTC = (): AppThunk => (dispatch, getState) => {
//   const params = getState().app.params;
//   api
//     .getUsers(params.sortBy ? params : undefined)
//     .then((res) => dispatch(setUsersAC(res.data.items)));
// };

// export const Users = () => {
//   const users = useAppSelector((state) => state.app.users);
//   const sortBy = useAppSelector((state) => state.app.params.sortBy);
//   const sortDirection = useAppSelector((state) => state.app.params.sortDirection);
//   console.log(users, sortBy, sortDirection);

//   const dispatch = useAppDispatch();

//   useEffect(()=> {
//   dispatch(getUsersTC())
// },[sortBy, sortDirection]) // ОТВЕТ
//   // ❗❗❗ XXX ❗❗❗

//   const sortHandler = (name: string) => {
//     const direction = sortDirection === "asc" ? "desc" : "asc";
//     dispatch(setParamsAC({ sortBy: name, sortDirection: direction }));
//   };

//   return (
//     <div>
//       <h1>👪 Список пользователей</h1>
//       <table style={table}>
//         <thead>
//           <tr>
//             <th style={th} onClick={() => sortHandler("name")}>
//               Name
//             </th>
//             <th style={th} onClick={() => sortHandler("age")}>
//               Age
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => {
//             return (
//               <tr key={u.id}>
//                 <td style={td}>{u.name}</td>
//                 <td style={td}>{u.age}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//   <Provider store={store}>
//     <Users />
//   </Provider>,
// );

// 📜 Описание:
// Перед вами таблица с пользователями. Но данные не подгружаются
// Что нужно написать вместо XXX, чтобы:
// 1) Пользователи подгрузились
// 2) Чтобы работала сортировка по имени и возрасту
// 3) Направление сортировки тоже должно работать (проверить можно нажав на одно и тоже поле 2 раза)

// 🖥 Пример ответа: console.log(users, sortBy, sortDirection)







// import ReactDOM from 'react-dom/client';
// import React from 'react';

// export const Jpegs = () => {

//   return (
//     <div style={{height: '100%',
//         margin: 0,
//         padding: 0}}>
//       <iframe
//         src="//coub.com/embed/2wp0wa?muted=false&autostart=false&originalSize=false&startWithHD=true"
//         frameBorder="0"
//         width="640"
//         height="360"
//         allow="autoplay"
//         allowFullScreen={true}
    
//       />
//     </div>
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<Jpegs/>);

// // 📜 Описание:
// // Пользователи жалуются, что нельзя развернуть видео на весь экран
// // В качестве ответа укажите исправленную или добавленную строку кода
// //
// // 🖥 Пример ответа: iframe.станьНаВесьЭкранПожалуйста()




// import ReactDOM from 'react-dom/client';
// import React, { useState } from 'react'

// export const Jpegs = () => {
//   const [fileURL, setFileURL] = useState<any>()

//   const onChange = (e: any) => {
//     const maybeFile = e.target.files?.[0]
//     if (maybeFile) {
//       if (maybeFile.type === 'image/jpeg') {
       
//         setFileURL(URL.createObjectURL(maybeFile)) // ОТВЕТ !!!!!!!
//         return
//       } else alert('not .jpg!')
//     }
//     setFileURL('')
//   }

//   return (
//     <div>
//       <input
//         type={'file'}
//         onChange={onChange}

//       />
//       {fileURL && (
//         <img
//           src={fileURL}
//           alt={'avatar'}

//         />
//       )}
//     </div>
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<Jpegs/>);

// // 📜 Описание:
// // Не отображается картинка при выборе.
// // В качестве ответа укажите исправленную версию строки кода
// //
// // 🖥 Пример ответа: value={fileURL}




// // // import ReactDOM from "react-dom/client";
// // // import React, { FC, ReactNode } from "react";

// // // const quizStyle: React.CSSProperties = {
// // //   background: "lightgreen",
// // //   padding: "10px",
// // //   margin: "10px",
// // // };

// // // type BtnPropsType = {
// // //   question: ReactNode;
// // //   children: ReactNode;
// // // };

// // // const Block: FC<BtnPropsType> = ({ question, children }) => {
// // //   return (
// // //     <div style={{ display: "flex", alignItems: "center" }}>
// // //       {question} = {children}
// // //     </div>
// // //   );
// // // };

// // // const quiz = [
// // //   { id: 1, question: "1 + 1", answer: "2" },
// // //   { id: 2, question: "2 + 2", answer: "4" },
// // //   { id: 3, question: "3 + 3", answer: "6" },
// // // ];

// // // const App = () => {
// // //   return (
// // //     <div>
// // //       {quiz.map((q) => {
// // //         return(
// // //           <Block key={ q.id } question={<h2 style={ quizStyle }>{ q.question }</h2>}>
// // //             <h2 style={ quizStyle }>{ q.answer }</h2>
// // //           </Block>
// // //         )
// // //       }) }
// // //     </div>
// // //   );
// // // };

// // // const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// // // root.render(<App />);

// // // // 📜 Описание:
// // // // Что необходимо написать вместо XXX и YYY, чтобы на экране отобразились вопросы и ответы из массива quiz.
// // // // 1 + 1 = 2
// // // // 2 + 2 = 4
// // // // 3 + 3 = 6
// // // // ❗ Ответ дайте через пробел

// // // // 🖥 Пример ответа: quiz[0]=yes redux=h2




// // // // // import React, { useState } from "react";
// // // // // import ReactDOM from "react-dom/client";
// // // // // import { ThunkAction, ThunkDispatch } from "redux-thunk";
// // // // // import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// // // // // import { configureStore, combineReducers } from "@reduxjs/toolkit";

// // // // // // Styles
// // // // // const modal: React.CSSProperties = {
// // // // //   position: "fixed",
// // // // //   zIndex: 1,
// // // // //   left: 0,
// // // // //   top: 0,
// // // // //   width: "100%",
// // // // //   height: "100%",
// // // // //   overflow: "auto",
// // // // //   backgroundColor: "rgba(23,26,38,0.26)",
// // // // // };

// // // // // const modalContent: React.CSSProperties = {
// // // // //   backgroundColor: "#fefefe",
// // // // //   margin: "15% auto",
// // // // //   padding: "20px",
// // // // //   border: "1px solid #888",
// // // // //   width: "80%",
// // // // // };

// // // // // // Reducer
// // // // // const initState = { tasks: [] as any[] };
// // // // // type InitStateType = typeof initState;

// // // // // const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
// // // // //   switch (action.type) {
// // // // //     case "ADD_TASK":
// // // // //       return {
// // // // //         ...state,
// // // // //         tasks: [action.task, ...state.tasks],
// // // // //       };
// // // // //     case "CHANGE_TASK":
// // // // //       return {
// // // // //         ...state,
// // // // //         tasks: [action.task, ...state.tasks.filter((t: any) => t.id !== action.task.id)],
// // // // //       };
// // // // //     default:
// // // // //       return state;
// // // // //   }
// // // // // };

// // // // // // Store
// // // // // const rootReducer = combineReducers({ app: appReducer });

// // // // // const store = configureStore({ reducer: rootReducer });
// // // // // type RootState = ReturnType<typeof store.getState>;
// // // // // type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// // // // // type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// // // // // const useAppDispatch = () => useDispatch<AppDispatch>();
// // // // // const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// // // // // const addTask = (task: any) => ({ type: "ADD_TASK", task }) as const;
// // // // // const changeTask = (task: any) => ({ type: "CHANGE_TASK", task }) as const;
// // // // // type ActionsType = ReturnType<typeof addTask> | ReturnType<typeof changeTask>;

// // // // // // Components
// // // // // const Modal = (props: any) => {
// // // // //   const [value, setValue] = useState(props.task?.name || "");

// // // // //   return (
// // // // //     <div style={modalContent}>
// // // // //       modal:
// // // // //       <input value={value} onChange={(e) => setValue(e.target.value)} />
// // // // //       <button onClick={() => props.callback(value)}>{props.title}</button>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const Task = (props: any) => {
// // // // //   const [show, setShow] = useState(false);

// // // // //   return (
// // // // //     <div>
// // // // //       {props.task.name}
// // // // //       <button onClick={() => setShow(true)}>change</button>
// // // // //       {show && (
// // // // //         <Modal
// // // // //           callback={(value: string) => {
// // // // //             props.change(value);
// // // // //             setShow(false);
// // // // //           }}
// // // // //           title={"change"}
// // // // //           task={props.task} // ОТВЕТ !!!!!
// // // // //         />
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export const Todolist = () => {
// // // // //   const tasks = useAppSelector((state) => state.app.tasks);
// // // // //   const dispatch = useAppDispatch();
// // // // //   const [show, setShow] = useState(false);

// // // // //   const getId = () => tasks.reduce((acc: number, t: any) => (acc > t.id ? acc : t.id), 0) + 1;

// // // // //   const mapped = tasks.map((t: any) => (
// // // // //     <Task
// // // // //       key={t.id}
// // // // //       task={t}
// // // // //       change={(value: string) => dispatch(changeTask({ id: t.id, name: value }))}
// // // // //     />
// // // // //   ));

// // // // //   return (
// // // // //     <div style={modal}>
// // // // //       <button onClick={() => setShow(true)}>open modal</button>
// // // // //       {show && (
// // // // //         <Modal
// // // // //           callback={(value: string) => {
// // // // //             dispatch(addTask({ id: getId(), name: value }));
// // // // //             setShow(false);
// // // // //           }}
// // // // //           title={"add"}
// // // // //         />
// // // // //       )}
// // // // //       {mapped}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// // // // // root.render(
// // // // //   <Provider store={store}>
// // // // //     <Todolist />
// // // // //   </Provider>,
// // // // // );

// // // // // 📜Описание:
// // // // // Откройте модалку и добавьте какой-нибудь текст.
// // // // // Теперь попробуйте изменить этот текст.
// // // // // При изменении существующей таски в инпуте не отображается старые данные.
// // // // // Ваша задача починить это поведение.
// // // // //
// // // // // В качестве ответа укажите строку кода, которую нужно изменить или добавить,
// // // // // чтобы реализовать данную задачу
// // // // //
// // // // // 🖥 Пример ответа: defaultValue={value}






// // // // // // import ReactDOM from "react-dom/client";
// // // // // // import { ThunkAction, ThunkDispatch } from "redux-thunk";
// // // // // // import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// // // // // // import React, { useState } from "react";
// // // // // // import { configureStore, combineReducers } from "@reduxjs/toolkit";

// // // // // // // Styles
// // // // // // const modal: React.CSSProperties = {
// // // // // //   position: "fixed",
// // // // // //   zIndex: 1,
// // // // // //   left: 0,
// // // // // //   top: 0,
// // // // // //   width: "100%",
// // // // // //   height: "100%",
// // // // // //   overflow: "auto",
// // // // // //   backgroundColor: "rgba(23,26,38,0.26)",
// // // // // // };

// // // // // // const modalContent: React.CSSProperties = {
// // // // // //   backgroundColor: "#fefefe",
// // // // // //   margin: "15% auto",
// // // // // //   padding: "20px",
// // // // // //   border: "1px solid #888",
// // // // // //   width: "80%",
// // // // // // };

// // // // // // // Reducer
// // // // // // const initState = { goodThings: [] as any[] };
// // // // // // type InitStateType = typeof initState;

// // // // // // const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
// // // // // //   switch (action.type) {
// // // // // //     case "LIKE":
// // // // // //       return {
// // // // // //         ...state,
// // // // // //         goodThings: [action.thing, ...state.goodThings],
// // // // // //       };
// // // // // //   }
// // // // // //   return state;
// // // // // // };

// // // // // // // Store
// // // // // // const rootReducer = combineReducers({ app: appReducer });

// // // // // // const store = configureStore({ reducer: rootReducer });
// // // // // // type RootState = ReturnType<typeof store.getState>;
// // // // // // type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// // // // // // type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// // // // // // const useAppDispatch = () => useDispatch<AppDispatch>();
// // // // // // const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// // // // // // const addThing = (thing: any) => ({ type: "LIKE", thing }) as const;
// // // // // // type ActionsType = ReturnType<typeof addThing>;

// // // // // // const Modal = (props: any) => {
// // // // // //   return (
// // // // // //     <div style={modalContent}>
// // // // // //       modal:
// // // // // //       <input value={props.value} onChange={(e) => props.setValue(e.target.value)} />
// // // // // //       <button onClick={props.add}>add</button>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // // Components
// // // // // // export const Animals = () => {
// // // // // //   const goodThings = useAppSelector((state) => state.app.goodThings);
// // // // // //   const dispatch = useAppDispatch();

// // // // // //   const [value, setValue] = useState("");
// // // // // //   const [show, setShow] = useState(false);

// // // // // //   const mapped = goodThings.map((t: any, i: number) => <div key={i}>{t}</div>);

// // // // // //   return (
// // // // // //     <div style={modal}>
// // // // // //       <button onClick={() => setShow(true)}>show modal</button>

// // // // // //       {show && (
// // // // // //         <Modal
// // // // // //           value={value}
// // // // // //           setValue={setValue}
// // // // // //           add={() => {
// // // // // //             dispatch(addThing(value));
// // // // // //             setValue("");
// // // // // //             setShow(false)
// // // // // //           }}
// // // // // //         />
// // // // // //       )}

// // // // // //       {mapped}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// // // // // // root.render(
// // // // // //   <Provider store={store}>
// // // // // //     <Animals />
// // // // // //   </Provider>,
// // // // // // );

// // // // // // // 📜 Описание:
// // // // // // // Откройте модалку, введите любой текст и нажмите add.
// // // // // // // Введенный текст отобразится снизу, но модалка останется по прежнему видимой.

// // // // // // // 🪛 Задача:
// // // // // // // Необходимо сделать так, чтобы модалка пряталась сразу после добавления элемента
// // // // // // // В качестве ответа укажите строку коду, которую необходимо добавить для реализации данной задачи

// // // // // // // 🖥 Пример ответа: closeModal(true)












// // // // // // // // import React from "react";
// // // // // // // // import ReactDOM from "react-dom/client";
// // // // // // // // import { ThunkAction, ThunkDispatch } from "redux-thunk";
// // // // // // // // import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// // // // // // // // import { configureStore, combineReducers } from "@reduxjs/toolkit";

// // // // // // // // // Reducer
// // // // // // // // const initState = {
// // // // // // // //   work: 0,
// // // // // // // //   donate: 0,
// // // // // // // //   balance: 0,
// // // // // // // // };
// // // // // // // // type InitStateType = typeof initState;

// // // // // // // // const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
// // // // // // // //   switch (action.type) {
// // // // // // // //     case "CHANGE_VALUE":
// // // // // // // //       return {
// // // // // // // //         ...state,
// // // // // // // //         ...action.payload,
// // // // // // // //       };
// // // // // // // //     default:
// // // // // // // //       return state;
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // Store
// // // // // // // // const rootReducer = combineReducers({ app: appReducer });

// // // // // // // // const store = configureStore({ reducer: rootReducer });
// // // // // // // // type RootState = ReturnType<typeof store.getState>;
// // // // // // // // type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// // // // // // // // type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// // // // // // // // const useAppDispatch = () => useDispatch<AppDispatch>();
// // // // // // // // const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// // // // // // // // const changeValue = (payload: any) => ({ type: "CHANGE_VALUE", payload }) as const;
// // // // // // // // type ActionsType = ReturnType<typeof changeValue>;

// // // // // // // // // Components
// // // // // // // // export const Income = () => {
// // // // // // // //   const work = useAppSelector((state) => state.app.work);
// // // // // // // //   const donate = useAppSelector((state) => state.app.donate);
// // // // // // // //   const balance = useAppSelector((state) => state.app.balance);

// // // // // // // //   const dispatch = useAppDispatch();

// // // // // // // //   return (
// // // // // // // //     <div>
// // // // // // // //       <div>
// // // // // // // //         work:{" "}
// // // // // // // //         <input
// // // // // // // //           value={work}
// // // // // // // //           type={"number"}
// // // // // // // //           onChange={(e) => dispatch(changeValue({ work: +e.target.value }))}
// // // // // // // //         />
// // // // // // // //       </div>
// // // // // // // //       <div>
// // // // // // // //         donate:{" "}
// // // // // // // //         <input
// // // // // // // //           value={donate}
// // // // // // // //           type={"number"}
// // // // // // // //           onChange={(e) => dispatch(changeValue({ donate: +e.target.value }))}
// // // // // // // //         />
// // // // // // // //       </div>

// // // // // // // //       <h1>💵 balance: {balance}</h1>
// // // // // // // //       <button
// // // // // // // //         onClick={() => {
// // // // // // // //           // ❗❗❗ XXX ❗❗❗
// // // // // // // //           dispatch(changeValue({balance: work +donate  }))
// // // // // // // //         }}
// // // // // // // //       >
// // // // // // // //         calculate balance
// // // // // // // //       </button>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// // // // // // // // root.render(
// // // // // // // //   <Provider store={store}>
// // // // // // // //     <Income />
// // // // // // // //   </Provider>,
// // // // // // // // );

// // // // // // // // // 📜 Описание:
// // // // // // // // // Что нужно написать вместо XXX, чтобы вывелась сумма дохода в строке баланса
// // // // // // // // //
// // // // // // // // // 🖥 Пример ответа: console.log(work + donate)
// // // // // // // // // import React from "react";
// // // // // // // // // import ReactDOM from "react-dom/client";
// // // // // // // // // import { ThunkAction, ThunkDispatch } from "redux-thunk";
// // // // // // // // // import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// // // // // // // // // import { configureStore, combineReducers } from "@reduxjs/toolkit";

// // // // // // // // // // Reducer
// // // // // // // // // const initState = {
// // // // // // // // //   animals: [
// // // // // // // // //     { likes: 0, name: "cat" },
// // // // // // // // //     { likes: 0, name: "dog" },
// // // // // // // // //     { likes: 0, name: "fish" },
// // // // // // // // //     { likes: 0, name: "spider" },
// // // // // // // // //     { likes: 0, name: "bird" },
// // // // // // // // //   ] as { likes: number; name: string }[],
// // // // // // // // // };
// // // // // // // // // type InitStateType = typeof initState;

// // // // // // // // // const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
// // // // // // // // //   switch (action.type) {
// // // // // // // // //     case "LIKE":
// // // // // // // // //       return {
// // // // // // // // //         ...state,
// // // // // // // // //         animals: state.animals.map((animal) => {
// // // // // // // // //           return animal.name === action.name ? {...animal, likes: action.likes} : animal
// // // // // // // // //           // return true ? { ...animal } : animal;
// // // // // // // // //         }),
// // // // // // // // //       };
// // // // // // // // //   }
// // // // // // // // //   return state;
// // // // // // // // // };

// // // // // // // // // // Store
// // // // // // // // // const rootReducer = combineReducers({ app: appReducer });

// // // // // // // // // const store = configureStore({ reducer: rootReducer });
// // // // // // // // // type RootState = ReturnType<typeof store.getState>;
// // // // // // // // // type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// // // // // // // // // type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// // // // // // // // // const useAppDispatch = () => useDispatch<AppDispatch>();
// // // // // // // // // const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// // // // // // // // // const like = (likes: any, name: any) => ({ type: "LIKE", likes, name }) as const;
// // // // // // // // // type ActionsType = ReturnType<typeof like>;

// // // // // // // // // // Components
// // // // // // // // // export const Animals = () => {
// // // // // // // // //   const animals = useAppSelector((state) => state.app.animals);
// // // // // // // // //   const dispatch = useAppDispatch();

// // // // // // // // //   const mapped = animals.map((a: any, i: number) => (
// // // // // // // // //     <div key={i}>
// // // // // // // // //       {a.name}-{a.likes}-<button onClick={() => dispatch(like(a.likes + 1, a.name))}>Like!</button>
// // // // // // // // //     </div>
// // // // // // // // //   ));

// // // // // // // // //   return <div>{mapped}</div>;
// // // // // // // // // };

// // // // // // // // // const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// // // // // // // // // root.render(
// // // // // // // // //   <Provider store={store}>
// // // // // // // // //     <Animals />
// // // // // // // // //   </Provider>,
// // // // // // // // // );

// // // // // // // // // // 📜 Описание:
// // // // // // // // // // На экране отображен список животных.
// // // // // // // // // // Кликните на like и вы увидите, что ничего не происходит.
// // // // // // // // // // Ваша задача починить лайки.
// // // // // // // // // // В качестве ответа укажите исправленную версию строки
// // // // // // // // // //
// // // // // // // // // // 🖥 Пример ответа: -{a.likes + 1}-



// экзамены 5ый спринт 2ой экзамен - задание номер 6 : 

// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import ReactDOM from 'react-dom/client'

// type UserType = {
//   id: string;
//   name: string;
//   age: number;
// }

// // API
// const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.io/api/'})

// const api = {
//   getUsers() {
//     // return instance.get('users?pageSize=3&pageNumber=2')
//     return instance.get('/users', {params: {pageSize: 3, pageNumber: 2}}) // ОТВЕТ!
//   },
// }

// // App
// export const App = () => {

//   const [users, setUsers] = useState<UserType[]>([])

//   useEffect(() => {
//     api.getUsers()
//       .then((res) => {
//         setUsers(res.data.items)
//       })
//   }, [])


//   return (
//     <>
//       <h1>👪 Список пользователей</h1>
//       {
//         users.map(u => {
//           return <div style={{display: 'flex', gap: '10px'}} key={u.id}>
//             <p><b>name</b>: {u.name}</p>
//             <p><b>age</b>: {u.age}</p>
//           </div>
//         })
//       }
//     </>
//   )
// }


// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<App/>)

// 📜 Описание:
// На странице отображен список юзеров из 3-человек.
// Подгрузились именно эти пользователи не случайно, а из-за query параметров указанных в запросе.
// Ваша задача переписать строку с запросом таким образом, чтобы получить аналогичный результат (все тех же юзеров),
// при этом запрещено в ответе использовать символы вопроса и амперсанда.
// В качестве ответа укажите полностью исправленную строку коду (переносы разрешены)



// import ReactDOM from "react-dom/client";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";

// // Styles
// const table: React.CSSProperties = {
//   borderCollapse: "collapse",
//   width: "100%",
//   tableLayout: "fixed",
// };

// const th: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
//   background: "lightgray",
//   cursor: "pointer",
// };

// const td: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
// };

// // Types
// type UserType = {
//   id: string;
//   name: string;
//   age: number;
// };

// type UsersResponseType = {
//   items: UserType[];
//   totalCount: number;
// };

// type ParamsType = {
//   sortBy: string | null;
//   sortDirection: "asc" | "desc" | null;
// };

// // API
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/" });

// const api = {
//   getUsers(params?: ParamsType) {
//     return instance.get<UsersResponseType>("users", { params });
//   },
// };

// // Reducer
// const initState = { users: [] as UserType[] };
// type InitStateType = typeof initState;

// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//   switch (action.type) {
//     case "SET_USERS":
//       return { ...state, users: action.users };
//     default:
//       return state;
//   }
// };

// // Store
// const rootReducer = combineReducers({ app: appReducer });

// const store = configureStore({ reducer: rootReducer });
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// const setUsersAC = (users: UserType[]) => ({ type: "SET_USERS", users }) as const;
// type ActionsType = ReturnType<typeof setUsersAC>;

// // Thunk
// const getUsersTC =
//   (searchParams?: ParamsType): AppThunk =>
//   (dispatch) => {
//     api.getUsers(searchParams).then((res) => dispatch(setUsersAC(res.data.items)));
//   };

// export const Users = () => {
//   const [activeColumn, setActiveColumn] = useState<ParamsType>({
//     sortBy: null,
//     sortDirection: 'asc',
//   });

//   const users = useAppSelector((state) => state.app.users);

//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(activeColumn.sortBy ? getUsersTC(activeColumn) : getUsersTC());
//   }, [activeColumn]);

//   const sortHandler = (sortBy: string) => {
//     // setActiveColumn({})
//     setActiveColumn(prevState => prevState.sortDirection === null ? {sortBy, sortDirection: 'asc'} : prevState.sortDirection === 'asc' ? {sortBy,sortDirection: 'desc' } : {sortBy, sortDirection: 'asc'}) //ОТВЕТ!!!! НО НАЧИНАЕТ СОРТИРОВАТЬСЯ ПО УБЫВАНИЮ!
//     // ❗❗❗ XXX ❗❗❗
//   };

//   return (
//     <div>
//       <h1>👪 Список пользователей</h1>
//       <table style={table}>
//         <thead>
//           <tr>
//             <th style={th} onClick={() => sortHandler("name")}>
//               Name
//               {activeColumn?.sortBy === "name" &&
//                 (activeColumn.sortDirection === "asc" ? (
//                   <span> &#8593;</span>
//                 ) : (
//                   <span> &#8595;</span>
//                 ))}
//             </th>
//             <th style={th} onClick={() => sortHandler("age")}>
//               Age
//               {activeColumn?.sortBy === "age" &&
//                 (activeColumn.sortDirection === "asc" ? (
//                   <span> &#8593;</span>
//                 ) : (
//                   <span> &#8595;</span>
//                 ))}
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => {
//             return (
//               <tr key={u.id}>
//                 <td style={td}>{u.name}</td>
//                 <td style={td}>{u.age}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//   <Provider store={store}>
//     <Users />
//   </Provider>,
// );

// 📜 Описание:
// Перед вами таблица с пользователями.
// Ваша задача вместо XXX написать код для сортировки пользователей по имени и возрасту.
// Т.е. при нажатии на name либо age пользователи должны сортироваться в таблице.
// При повторном нажатии на этот же столбец сортировка должна происходить в обратном порядке
// При последующих нажатиях сортировка не должна сбрасываться, а должна продолжать переключаться.
// ❗ сортировка пользователей происходит на сервере, т.е. sort использовать не нужно

// 🖥 Пример ответа: sort(a, b)






// import ReactDOM from "react-dom/client";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";

// type UserType = {
//   id: string;
//   name: string;
//   age: number;
// };

// type UsersResponseType = {
//   items: UserType[];
//   totalCount: number;
// };

// // API
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/" });

// const api = {
//   getUsers(search: string) {
//     return instance.get<UsersResponseType>(`users?name=${search}&pageSize=100`);
//   },
// };

// const initState = { users: [] as UserType[] };
// type InitStateType = typeof initState;

// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//   switch (action.type) {
//     case "SET_USERS":
//       return { ...state, users: action.users };
//     default:
//       return state;
//   }
// };

// // Store
// const rootReducer = combineReducers({ app: appReducer });

// const store = configureStore({ reducer: rootReducer });
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// const setUsersAC = (users: UserType[]) => ({ type: "SET_USERS", users }) as const;
// type ActionsType = ReturnType<typeof setUsersAC>;

// // Thunk
// const getFriends =
//   (name: string): AppThunk =>
//   (dispatch) => {
//     api.getUsers(name).then((res) => dispatch(setUsersAC(res.data.items)));
//   };

// export const Users = () => {
//   const users = useAppSelector((state) => state.app.users);
//   const dispatch = useAppDispatch();
//   const [name, setName] = useState("");
//   const [timerId, setTimerId] = useState(0);

//   useEffect(() => {
//       clearTimeout(timerId) //ЭТО ОТВЕТ!!!!!!

//     setTimerId (+
//       setTimeout(() => {
//       dispatch(getFriends(name));
//       }, 1500)
//     )
//     // return ()=> {
//     //   clearTimeout(timerId)
//     // }
//   }, [name]);

//   return (
//     <div>
//       <input value={name} onChange={(e) => setName(e.target.value)} />
//       {users.map((u) => {
//         return (
//           <div key={u.id}>
//             <p>
//               <b>name</b>: {u.name}
//             </p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//   <Provider store={store}>
//     <Users />
//   </Provider>,
// );

// // 📜 Описание:
// // На экране input, куда можно вводить символы.
// // Откройте Network/ fetch/XHR и поробуйте вводить символы
// // Обратите внимание, что все символы которые вы вводите уходят на сервер -
// // это плохо.

// // 🪛 Задача: Починить debounce
// // В качестве ответа напишите строку кода которую необходимо исправить или добавить
// // для реализации данной задачи

// // 🖥 Пример ответа: value={name(1500)}




// import ReactDOM from "react-dom/client";
// import React, { useEffect } from "react";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";

// // Reducer
// const initState = { find: "", words: [] as string[] };
// type InitStateType = typeof initState;

// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//   switch (action.type) {
//     case "SET_FIND":
//       return { ...state, find: action.find };
//     case "SET_WORDS":
//       return { ...state, words: action.words };
//     default:
//       return state;
//   }
// };

// // Store
// const rootReducer = combineReducers({ app: appReducer });

// const store = configureStore({ reducer: rootReducer });
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// const setFind = (find: string) => ({ type: "SET_FIND", find }) as const;
// const setWords = (words: string[]) => ({ type: "SET_WORDS", words }) as const;
// type ActionsType = ReturnType<typeof setFind> | ReturnType<typeof setWords>;

// // Components
// const defWords = ["a", "ab", "abc", "b", "bc", "c", "d", "ac", "bcd", "cd", "abcd", "bd"];

// export const App = () => {
//   const find = useAppSelector((state) => state.app.find);
//   const words = useAppSelector((state) => state.app.words);

//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(setWords(defWords));
//   }, []);

//   const mapped = words
//     .filter((w: string) => new RegExp(find, "gi").test(w))
//     .map((w: string, i: number) => <div key={i}>{w}</div>);

//   const onChangeHandler = (value: string) => {
//     dispatch(setFind(value)) // ОТВЕТ!!!

//     console.log(value);
//   };

//   return (
//     <div>
//       <input value={find} onChange={(e) => onChangeHandler(e.target.value)} />
//       {mapped}
//     </div>
//   );
// };

// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
// );

// // 📜 Описание:
// // На экране отображен массив слов.
// // Ваша задача починить фильтрацию:
// // вводите символы в input и сразу видите как фильтруются данные.
// // В качестве ответа укажите исправленную версию строки.
// //
// // 🖥 Пример ответа: dispatch(setFind(defWords))





// 🖥 Пример ответа: return instance.get('users=pageSize=3=pageNumber=2')





// import React, { useEffect } from "react";
// import ReactDOM from "react-dom/client";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";

// type UserType = {
//   id: string;
//   name: string;
//   age: number;
// };

// // API
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/" });

// const api = {
//   getUsers(pageNumber: number) {
//     return instance.get(`users?pageSize=${3}&pageNumber=${pageNumber}`);
//   },
// };

// // Reducer
// const initState = { page: 1, users: [] as UserType[] };
// type InitStateType = typeof initState;

// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//   switch (action.type) {
//     case "SET_PAGE":
//       return { ...state, page: action.page };
//     case "SET_USERS":
//       return { ...state, users: action.users };
//     default:
//       return state;
//   }
// };

// // Store
// const rootReducer = combineReducers({ app: appReducer });

// const store = configureStore({ reducer: rootReducer });
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// const setPageAC = (page: number) => ({ type: "SET_PAGE", page }) as const;
// const setUsersAC = (users: UserType[]) => ({ type: "SET_USERS", users }) as const;
// type ActionsType = ReturnType<typeof setPageAC> | ReturnType<typeof setUsersAC>;

// const getUsers = (): AppThunk => (dispatch, getState) => {
//   const page = getState().app.page //ОТВЕТ!!!
//   api.getUsers(page).then((res) => dispatch(setUsersAC(res.data.items)));
// };

// // Components
// export const App = () => {
//   const page = useAppSelector((state) => state.app.page);
//   const users = useAppSelector((state) => state.app.users);

//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(getUsers());
//   }, [page]);

//   const pages = new Array(4).fill(1).map((p, i) => (
//     <button key={i} onClick={() => dispatch(setPageAC(i + 1))} disabled={page === i + 1}>
//       {i + 1}
//     </button>
//   ));

//   return (
//     <div>
//       {users.map((u) => {
//         return (
//           <div style={{ marginBottom: "25px" }} key={u.id}>
//             <p>
//               <b>name</b>: {u.name}
//             </p>
//             <p>
//               <b>age</b>: {u.age}
//             </p>
//           </div>
//         );
//       })}
//       {pages}
//     </div>
//   );
// };

// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
// );

// // // 📜 Описание:
// // // При переходе по страницам должны подгружаться новые пользователи.
// // // Однако в коде допущена ошибка и всегда подгружаются одни и теже пользователи.
// // // Задача: найти эту ошибку, и исправленную версию строки написать в качестве ответа.

// // // 🖥 Пример ответа: {pages.next()}




// РАСКОММЕНТИРОВАТЬ, КОГДА СДАМ ЭКЗАМЕНЫ ВСЕ!!!!


