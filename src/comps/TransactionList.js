import React, {useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Transaction } from './Transaction';


const TransactionList = () => {
  const { transactions, getTransaction } = useContext(GlobalContext);

  useEffect( () => {
    getTransaction();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return transactions ? (
      <React.Fragment>
      <h3>History</h3>
      <ul  className="list">
        {transactions.map( (transaction) => ( <Transaction key={transaction.id} transaction={transaction} /> ))}
          
      </ul>
      </React.Fragment>
    )
    : <h2>Loading...</h2>
}

export default TransactionList;