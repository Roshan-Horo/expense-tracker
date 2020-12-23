import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const AddTransaction = () => {
    const { addTransaction } = useContext(GlobalContext);

    const [text,setText] = useState('');
    const [amount,setAmount] = useState('');
 
    const onSubmit = (e) => {
      e.preventDefault();

      const newTransaction = {
        id: Date.now(),
        text: text,
        amount: +amount
      }

      addTransaction(newTransaction);
      setText('');
      setAmount('');
    }

    return (
      <React.Fragment>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label >Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)}  placeholder="Enter text..." />
        </div>
        <div className="form-control">
        <label >Amount <br />
        (negative - expense, positive - income)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}  placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
      </React.Fragment>
    );
}

export default AddTransaction;