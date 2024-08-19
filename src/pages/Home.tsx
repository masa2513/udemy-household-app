import React, { useState } from 'react'
import MonthlySummary from '../components/MonthlySummary'
import TransactionMenu from '../components/TransactionMenu'
import Transactionform from '../components/layout/Transactionform'
import { Box } from '@mui/material'
import { Transaction } from '../types'
import Calender from '../components/Calendar'
import { format, formatDistanceToNow } from 'date-fns'

interface HomeProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Home = ({monthlyTransactions,setCurrentMonth}: HomeProps) => {
  const today = format (new Date(),"yyyy-MM-dd");
  console.log(today);
  const [currentDay,setCurrentDay] = useState(today);

  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date ===currentDay
  })
  console.log(dailyTransactions);
  return (
    <Box sx={{display: "flex"}}>
        {/*左側コンテンツ*/}
        <Box　sx={{flexGrow:1}}>
            <MonthlySummary monthlyTransactions={monthlyTransactions}/>
            <Calender 
            monthlyTransactions={monthlyTransactions} 
            setCurrentMonth={setCurrentMonth}
            setCurrentDay={setCurrentDay}
            currentDay={currentDay}
            today={today}
            />
        </Box>

        {/*右側コンテンツ*/}
        <Box>
            <TransactionMenu 
            dailyTransactions={dailyTransactions}
            currentDay={currentDay}
            />
            <Transactionform />
        </Box>
    </Box>
  )
}

export default Home