import './App.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import WeeklyCalendar from './components/WeeklyCalendar';

const API_KEY = 'f5fb197fb552a47dc301c0a0327cffa6'

function App() {

  const [holidays, setHolidays] = useState([]);

  async function getHolidays(){
    try {
      const response = await axios.post('https://wozmx9dh26.execute-api.eu-west-1.amazonaws.com/api/holidays', {
          "apiKey": API_KEY,
          "startDate": "2019-02-01",
          "endDate": "2019-02-28"
      })
      console.log('Holidays resp:', response)
      console.log('Holidays resp DATA Holydays:', response.data.holidays)
      setHolidays(response.data)
    } catch (e) {
      console.log('E',e)
      if(e && e.response){
        console.log(e.response.data)
      }
    }
  }

  useEffect(() => {
    getHolidays()
  }, []);

  return (
    <div className="App">
      Hello
      <WeeklyCalendar>

      </WeeklyCalendar>
    </div>
  );
}

export default App;
