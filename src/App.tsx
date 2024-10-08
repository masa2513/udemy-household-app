import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import {theme} from './theme/theme'
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Transaction } from './types/index';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase';
import { format } from 'date-fns';
import { formatMonth } from './utils/formatting';

function App() {

  //Firestoreエラーかどうかを判定する型ガード
  function isFirestoreError(err: unknown): err is{code: string, message: string} {
    return typeof err === "object" && err !== null && "code" in err
  }
  const[transactions,settransactions] = useState<Transaction[]>([]);
  const[currentMonth,setCurrentMonth] = useState(new Date());
  console.log(currentMonth);
  const a = format(currentMonth, "yyyy-MM")
  console.log(a);

  useEffect(() => {
    const fecheTransactions = async() => {

    try {
      const querySnapshot = await getDocs(collection(db, "Transactions"));
      console.log(querySnapshot)

      const transactionsData = querySnapshot.docs.map((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        return{
          ...doc.data(),
          id: doc.id,
        } as Transaction
      });
      console.log(transactionsData)
      settransactions(transactionsData)
    } catch(err) {
      //error
      if(isFirestoreError(err)) {
        console.error("firestoreのエラーは:",err)
      } else {
        console.error("一般的なエラーは",err)
      }
      
    }
  }
  fecheTransactions();
  },[])

  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth))
  })

  console.log(monthlyTransactions);
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
        <Route index element={<Home monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth}/>} />
        <Route path="/report" element={<Report />}/>
        <Route path="*" element={<NoMatch />}/>
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>

  );
}

export default App;
