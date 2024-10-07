import React, { useState,useEffect } from 'react';
import DataFetchingComponent from './DataFetchingComponent';
import FetchData from './data/FetchData';
// Component chính
const TableData = () => {
  const fetchDataLoad = DataFetchingComponent(); // Fetch data from the API or data source
  const [fetchData, setFetchData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await FetchData(); // Giả sử FetchData là hàm lấy dữ liệu
      setFetchData(data);
    };
    loadData();
  }, []);
  // State to store the selected time filter
  const [timeFilter, setTimeFilter] = useState('today');
  const [severFilter,setServerFilter] = useState('all');

  const handleServerFilterChange = (e) =>{
    setServerFilter(e.target.value);
  }

  console.log('======================================')
  console.log('',fetchData.logsGroupedByNameServer);
  console.log('======================================')
  // Handle time filter changes
  const handleTimeFilterChange = (e) => {
    setTimeFilter(e.target.value);
  };
  
  // Data for "Last 7 Days"
  const agvData7 = [
    { label: 'Pick Proxy Time', time: fetchDataLoad?.agvTimePickProxy7,Success: fetchDataLoad.perSuccessPickProxy7,Failed: fetchDataLoad.perFailPickProxy7 },
    { label: 'Download Time', time: fetchDataLoad?.agvTimeDownYoutube7 ,Success: fetchDataLoad.perDownloadTimeSuccess7,Failed: fetchDataLoad.perDownloadFail7 },
    { label: 'Sample Rate Time', time: fetchDataLoad?.agvTimeDowmSampleRate7 ,Success: fetchDataLoad.perDownSampleRateSuccess7,Failed: fetchDataLoad.perDownSampleRateFail7},
    { label: 'Process Chord Time', time: fetchDataLoad?.agvTimeDownChord7 ,Success: fetchDataLoad.perDownChordSuccess7,Failed: fetchDataLoad.perDownChordFail7 },
    { label: 'Vocal Separation Time', time: fetchDataLoad?.agvTotalTimeGetVocal7,Success: fetchDataLoad.perVocalSuccess7,Failed: fetchDataLoad.perVocalFail7 },
    { label: 'Generation Time', time: fetchDataLoad?.agvTotalTimeGenService7,Success: fetchDataLoad.perGenerateTSuccess7,Failed: fetchDataLoad.perGenerateTFail17 },
    { label: 'Mixer chords', time: fetchDataLoad?.agvTimeMix7 ,Success: fetchDataLoad.perMixSuccess7,Failed: fetchDataLoad.perMixFail17},
    { label: 'Total Time', time: fetchDataLoad?.agvTotalService7 ,Success: fetchDataLoad.perServiceSuccess7,Failed: fetchDataLoad.perServiceFail7 },
  ];

  // Data for "Today"
  const agvData1 = [
    { label: 'Pick Proxy Time', time: fetchDataLoad?.agvTimePickProxy1,Success: fetchDataLoad.perSuccessPickProxy1,Failed: fetchDataLoad.perFailPickProxy1},
    { label: 'Download Time', time: fetchDataLoad?.agvTimeDownYoutube1,Success: fetchDataLoad.perDownloadTimeSuccess1,Failed: fetchDataLoad.perDownloadFail1 },
    { label: 'Sample Rate Time', time: fetchDataLoad?.agvTimeDowmSampleRate1,Success: fetchDataLoad.perDownSampleRateSuccess1,Failed: fetchDataLoad.perDownSampleRateFail1},
    { label: 'Process Chord Time', time: fetchDataLoad?.agvTimeDownChord1,Success: fetchDataLoad.perDownChordSuccess1,Failed: fetchDataLoad.perDownChordFail1 },
    { label: 'Vocal Separation Time', time: fetchDataLoad?.agvTotalTimeGetVocal1,Success: fetchDataLoad.perVocalSuccess1,Failed: fetchDataLoad.perVocalFail },
    { label: 'Generation Time', time: fetchDataLoad?.agvTotalTimeGenService1,Success: fetchDataLoad.perGenerateTSuccess1,Failed: fetchDataLoad.perGenerateTFail11},
    { label: 'Mixer chords', time: fetchDataLoad?.agvTimeMix1 ,Success: fetchDataLoad.perMixSuccess1,Failed: fetchDataLoad.perMixFail11},
    { label: 'Total Time', time: fetchDataLoad?.agvTotalService1,Success: fetchDataLoad.perServiceSuccess1,Failed: fetchDataLoad.perServiceFail1 },
  ];

  // Data for other periods (30 days, All)
  const agvData = [
    { label: 'Pick Proxy Time', time: fetchDataLoad?.agvTimePickProxy ,Success: fetchDataLoad.perSuccessPickProxy7,Failed: fetchDataLoad.perFailPickProxy7},
    { label: 'Download Time', time: fetchDataLoad?.agvTimeDownYoutube,Success: fetchDataLoad.perDownloadTimeSuccess7,Failed: fetchDataLoad.perDownloadFail7 },
    { label: 'Sample Rate Time', time: fetchDataLoad?.agvTimeDowmSampleRate,Success: fetchDataLoad.perDownSampleRateSuccess7,Failed: fetchDataLoad.perDownSampleRateFail7 },
    { label: 'Process Chord Time', time: fetchDataLoad?.agvTimeDownChord,Success: fetchDataLoad.perDownChordSuccess7,Failed: fetchDataLoad.perDownChordFail7 },
    { label: 'Vocal Separation Time', time: fetchDataLoad?.agvTotalTimeGetVocal,Success: fetchDataLoad.perVocalSuccess7,Failed: fetchDataLoad.perVocalFail7 },
    { label: 'Generation Time', time: fetchDataLoad?.agvTotalTimeGenService,Success: fetchDataLoad.perGenerateTSuccess7,Failed: fetchDataLoad.perGenerateTFail17 },
    { label: 'Mixer chords', time: fetchDataLoad?.agvTimeMix ,Success: fetchDataLoad.perMixSuccess7,Failed: fetchDataLoad.perMixFail17},
    { label: 'Total Time', time: fetchDataLoad?.agvTotalService,Success: fetchDataLoad.perServiceSuccess7,Failed: fetchDataLoad.perServiceFail7 },
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
            <th>Success (%)</th>
            <th>Failed (%)</th>

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
