import React, { useState } from 'react';
import DataFetchingComponent from './DataFetchingComponent';

// Component chính
const TableData = () => {
  const fetchDataLoad = DataFetchingComponent(); // Fetch data from the API or data source
  
  // State to store the selected time filter
  const [timeFilter, setTimeFilter] = useState('today');

  // Handle time filter changes
  const handleTimeFilterChange = (e) => {
    setTimeFilter(e.target.value);
  };
  
  // Data for "Last 7 Days"
  const agvData7 = [
    { label: 'Pick Proxy Time', time: fetchDataLoad?.agvTimePickProxy7 },
    { label: 'Download Time', time: fetchDataLoad?.agvTimeDownYoutube7 },
    { label: 'Sample Rate Time', time: fetchDataLoad?.agvTimeDowmSampleRate7 },
    { label: 'Process Chord Time', time: fetchDataLoad?.agvTimeDownChord7 },
    { label: 'Vocal Separation Time', time: fetchDataLoad?.agvTotalTimeGetVocal7 },
    { label: 'Generation Time', time: fetchDataLoad?.agvTotalTimeGenService7 },
    { label: 'Mixer chords', time: fetchDataLoad?.agvTimeMix7 },
    { label: 'Total Time', time: fetchDataLoad?.agvTotalService7 },
  ];

  // Data for "Today"
  const agvData1 = [
    { label: 'Pick Proxy Time', time: fetchDataLoad?.agvTimePickProxy1,Success: '75%',Failed: '25%'},
    { label: 'Download Time', time: fetchDataLoad?.agvTimeDownYoutube1,Success: '75%',Failed: '25%' },
    { label: 'Sample Rate Time', time: fetchDataLoad?.agvTimeDowmSampleRate1,Success: '75%',Failed: '25%' },
    { label: 'Process Chord Time', time: fetchDataLoad?.agvTimeDownChord1,Success: '75%',Failed: '25%' },
    { label: 'Vocal Separation Time', time: fetchDataLoad?.agvTotalTimeGetVocal1,Success: '75%',Failed: '25%' },
    { label: 'Generation Time', time: fetchDataLoad?.agvTotalTimeGenService1,Success: '75%',Failed: '25%' },
    { label: 'Mixer chords', time: fetchDataLoad?.agvTimeMix1 ,Success: '75%',Failed: '25%'},
    { label: 'Total Time', time: fetchDataLoad?.agvTotalService1,Success: '75%',Failed: '25%' },
  ];

  // Data for other periods (30 days, All)
  const agvData = [
    { label: 'Pick Proxy Time', time: fetchDataLoad?.agvTimePickProxy },
    { label: 'Download Time', time: fetchDataLoad?.agvTimeDownYoutube },
    { label: 'Sample Rate Time', time: fetchDataLoad?.agvTimeDowmSampleRate },
    { label: 'Process Chord Time', time: fetchDataLoad?.agvTimeDownChord },
    { label: 'Vocal Separation Time', time: fetchDataLoad?.agvTotalTimeGetVocal },
    { label: 'Generation Time', time: fetchDataLoad?.agvTotalTimeGenService },
    { label: 'Mixer chords', time: fetchDataLoad?.agvTimeMix },
    { label: 'Total Time', time: fetchDataLoad?.agvTotalService },
  ];

  // Choose which data to show based on the selected filter
  let displayedData;
  if (timeFilter === 'today') {
    displayedData = agvData1;
  } else if (timeFilter === '7days') {
    displayedData = agvData7;
  } else {
    displayedData = agvData;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>AGV Time Statistics</h2>
      
      {/* Time filter dropdown */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="timeFilter">Filter by: </label>
        <select id="timeFilter" value={timeFilter} onChange={handleTimeFilterChange}>
          <option value="today">Today</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="all">All</option>
        </select>
      </div>

      {/* AGV data table */}
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>AGV Metric</th>
            <th>Time</th>
            <th>Success</th>
            <th>Failed</th>

          </tr>
        </thead>
        <tbody>
          {displayedData.map((item, index) => (
            <tr key={index}>
              <td>{item.label}</td>
              <td>{item.time}</td>
              <td>{item.Success}</td>
              <td>{item.Failed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
