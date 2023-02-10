import React, { useReducer, createContext, useContext, useRef } from "react";

const initialTodos = [
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true
    },
    {
        id: 2,
        text: '컴포넌트 스타일링 하기',
        done: true
    },
    {
        id: 3,
        text: 'Context 만들기',
        done: false
    },
    {
        id: 4,
        text: '기능 구현하기',
        done: false
    }
];

function todoReducer(state, action){
    switch(action.type){
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.id ? { ...todo, done : !todo.done } : todo);
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext(); 
//state와 dispatch를 다른 context에 넣었음
const TodoNextIdContext = createContext();

export function TodoProvider({children}){
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    ); //context에서 사용할 값을 지정할 때, provider 컴포넌트를 렌더링하고 value를 설정해주면 된다. 그리고 props로 받아온 값인 children을 내부에 렌더링해주었음
}

export function useTodoState(){
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch(){
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}
//useContext를 사용하는 커스텀 Hook을 만들어 내보냄. 굳이 안해도 되지만... 쪼꼼 더 편한 정도...

export function useTodoNextId(){
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}