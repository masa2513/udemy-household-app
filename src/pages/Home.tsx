import React from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calender from '../components/layout/Calender'
import TransactionMenu from '../components/layout/TransactionMenu'
import Transactionform from '../components/layout/Transactionform'
import { Box } from '@mui/material'

const Home = () => {
  return (
    <Box sx={{display: "flex"}}>
        {/*左側コンテンツ*/}
        <Box　sx={{flexGrow:1}}>
            <MonthlySummary />
            <Calender />
        </Box>

        {/*右側コンテンツ*/}
        <Box>
            <TransactionMenu />
            <Transactionform />
        </Box>
    </Box>
  )
}

export default Home