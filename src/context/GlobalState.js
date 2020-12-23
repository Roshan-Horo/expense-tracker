import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

//Initial State
const initialState = {
    transactions: [],
    error: null,
    loading: true
}

//Create context
export const GlobalContext = createContext(initialState);


// Provider component
export const GlobalProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions
    async function getTransaction(){
        try {
            const res = await axios.get('/api/transactions');

            dispatch({type: 'GET_TRANSACTION', payload: res.data.data});

        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error 
            });
        }
    }

    async function deleteTransaction(id){
        try {
             await axios.delete(`/api/transactions/${id}`);

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error 
            });
         }
  
    }

    async function addTransaction(transactions){
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/transactions', transactions, config);

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            });

        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error 
            });
        }

        
    }
    
    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransaction,
        deleteTransaction,
        addTransaction
        
    }}>
         {children}
        </GlobalContext.Provider>)
}