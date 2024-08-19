import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from "@fullcalendar/daygrid"
import jaLocale from "@fullcalendar/core/locales/ja"
import "../calendar.css"
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import { calculateDailyBalances } from '../utils/financeCalculations'
import { Balance, CalendarContent, Transaction } from '../types'
import { formatCurrentcy } from '../utils/formatting'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { theme } from '../theme/theme'
import { Palette } from '@mui/icons-material'
import { useTheme } from '@mui/material'
import { isSameMonth } from 'date-fns'



interface CalendarProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth:React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string,
  today: string,
}
const Calender = ({
  monthlyTransactions,
  setCurrentMonth,
  setCurrentDay,
  currentDay,
  today,
  }: CalendarProps) => {
    const theme = useTheme()
    const dailyBalances = calculateDailyBalances(monthlyTransactions);
    console.log(dailyBalances);
    
    const createCalendarEvents = (dailyBalances: Record<string,Balance>):CalendarContent[]  => {
     return Object.keys(dailyBalances).map((date) => {
      const {income, expense, balance} = dailyBalances[date]
        return {
          start: date,
          income: formatCurrentcy(income),
          expense: formatCurrentcy(expense),
          balance: formatCurrentcy(balance),
        }
      })
    };
    
    const calendarEvents = createCalendarEvents(dailyBalances)
    console.log(calendarEvents);
    
    const renderEventContent=(eventInfo: EventContentArg) => {
      console.log(eventInfo);
      return (
        <div>
          <div className='money' id='event-income'>
            {eventInfo.event.extendedProps.income}
          </div>
  
          <div className='money' id='event-expense'>
            {eventInfo.event.extendedProps.expense}
          </div>
  
          <div className='money' id='event-balance'>
            {eventInfo.event.extendedProps.balance}
          </div>
        </div>
      )
    }
    
    const events = [
    { title: 'Meeting', start: new Date() },
    { title: 'eat', start: "2024-08-17", income:300, expense: 200, balance: 100},
    { start: "2024-09-01", display: "background", backgroundColor: "red"}
    ];

    const backgroundEvent = {
      start: currentDay,
      display: "background",
      backgroundColor: theme.palette.incomeColor.light,
    }

    console.log([...calendarEvents, backgroundEvent])

  /*const monthlyTransactions = [
    {
      id: "a",
      type: "income",
      category: "お小遣い",
      amount: 700,
      content: "母から",
      date: "2024-08-01"
    }
  ]*/

const handleDateSet = (datesetInfo:DatesSetArg) => {
  const currentMonth = datesetInfo.view.currentStart;
  setCurrentMonth(currentMonth);
  const todayDate = new Date();
  if(isSameMonth(todayDate, currentMonth)){
    setCurrentDay(today);
  };
}

  const handleDateClick = (dateInfo: DateClickArg) => {
    console.log(dateInfo);
    setCurrentDay(dateInfo.dateStr);
  }
  return (
    <FullCalendar 
    locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView='dayGridMonth'
      events={[...calendarEvents, backgroundEvent]}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleDateClick}
      />
  )
}

export default Calender