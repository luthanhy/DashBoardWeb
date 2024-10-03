import React, { useState, useEffect } from 'react';
const successCounFinal = 0;
const DataFetchingComponent = () => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const postData = async () => {
      setLoading(true);
      setError(null); // Reset error before making API call

      try {
        const response = await fetch('https://simpia.app/user/requestProxy.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isServiceProxy: true, // Set the value for isServiceProxy
          }),
        });

        // Check if the response status is ok (status code 2xx)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON response
        setResponseData(data); // Save the data to state
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message); // Save the error message to state
      } finally {
        setLoading(false); // Set loading to false after API call completes
      }
    };

    postData();
  }, []); // useEffect only runs once when the component mounts

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function to count the number of statuses with 'success'
  const countSuccess = (data) => {
    if (!Array.isArray(data)) return 0; // Return 0 if data is not an array
    return data.filter(item => item.status === 'success').length; // Count items with status 'success'
  };

  // Function to count the number of statuses with 'error'
  const countFail = (data) => {
    if (!Array.isArray(data)) return 0; // Return 0 if data is not an array
    return data.filter(item => item.status === 'error').length; // Count items with status 'error'
  };

  // Function to count the number of statuses with 'issues'
  const countProxyTestFail = (data) => {
    if (!Array.isArray(data)) return 0; // Return 0 if data is not an array
    return data.filter(item => item.status === 'issues').length; // Count items with status 'issues'
  };
  const totalSongCount = responseData && responseData.data
    ? responseData.data.reduce((total, item) => {
        if (Array.isArray(item.log)) {
          return total + item.log.length;
        }
        return total;
      }, 0)
    : 0;

  const totalProxyTestFail = responseData && responseData.data ? countProxyTestFail(responseData.data) : 0;
  const successCount = responseData && responseData.data ? countSuccess(responseData.data) : 0;
  const failCount = responseData && responseData.data ? countFail(responseData.data) : 0;
  function countToStatus(statusInfo,value){
    const totalCal = responseData && responseData.data
    ? responseData.data.reduce((total, item) => {
        if (Array.isArray(item.log)) {
            let  filterSong;
          if(value === '1'){
            filterSong = item.log.filter(song => song.status === statusInfo);
          }else if(value === '2'){
            filterSong = item.log.filter(song => song.status_gen === statusInfo);
          }else if(value === '3'){
            filterSong = item.log.filter(song => song.status_vocal === statusInfo);
          }
          else if(value === '4'){
            filterSong = item.log.filter(song => song.total_status === statusInfo);
          }
          return total + filterSong.length;
        }
        return total;
      }, 0)
    : 0;
    return totalCal;
  }
  
  const totalSongFailedCount = countToStatus('fail','1');
  const totalSongExitsCount = countToStatus('existing','1');
  const totalSongDownYoutobeSuccess = countToStatus("success",'1');
  const totalSongGenSuccess = countToStatus("success",'2');
  const totalSongGenFail = countToStatus("fail","2");
  const totalgetVocalSuccess = countToStatus("success",'3');
  const tottalgetVocalFail = countToStatus("fail",'3');
  const tototalFailStatus = countToStatus("fail","4");
  const totalSatusSuccess = countToStatus("success",'4');
  // Total number of failed song requests
  // const totalSongFailedCount = responseData && responseData.data
  //   ? responseData.data.reduce((total, item) => {
  //       if (Array.isArray(item.log)) {
  //         const failedSongs = item.log.filter(song => song.status === 'fail');
  //         return total + failedSongs.length;
  //       }
  //       return total;
  //     }, 0)
  //   : 0;

  // Total number of songs that already exist
  // const totalSongExitsCount = responseData && responseData.data
  //   ? responseData.data.reduce((total, item) => {
  //       if (Array.isArray(item.log)) {
  //         const existingSongs = item.log.filter(song => song.status === 'existing');
  //         return total + existingSongs.length;
  //       }
  //       return total;
  //     }, 0)
  //   : 0;

  // Total number of successful YouTube downloads
  // const totalSongDownYoutobeSuccess = responseData && responseData.data
  //   ? responseData.data.reduce((total, item) => {
  //       if (Array.isArray(item.log)) {
  //         const successfulDownloads = item.log.filter(song => song.status === 'success');
  //         return total + successfulDownloads.length;
  //       }
  //       return total;
  //     }, 0)
  //   : 0;
  // const timeDownLoadYoutube =   JSON.parse(responseData.data  );
  // for(let i=0; i < responseData.)
  console.log("",responseData.data);
  let totalTimeDownAgvYoutube = 0;
  let lengthDownYoutube = 0;
  for(let i = 0 ; i < responseData.data.length ; i++){
     let totalTimeDownLoad = 0;
     let lengthDown = 0;
    for(let j = 0;j < responseData.data[i].log.length ; j++){
        let valueTimeDowm = responseData.data[i].log[j].timeDownload;
        if(valueTimeDowm === null || valueTimeDowm === undefined){
          valueTimeDowm = 0;
        }
        totalTimeDownLoad += valueTimeDowm;
        lengthDown = responseData.data[i].log.length;
      }
      totalTimeDownAgvYoutube += totalTimeDownLoad/lengthDown+1;
      lengthDownYoutube = responseData.data.length+1; 
    }
    const agvTimeDownYoutube =  totalTimeDownAgvYoutube/lengthDownYoutube;


    let timeTotalService = 0;
    let lengthTotalService = 0;

    for(let i = 0 ; i < responseData.data.length ; i++){
      let totalTimeDownLoad1 = 0;
      let lengthDown1 = responseData.data[i].log.length;
     for(let j = 0;j < responseData.data[i].log.length ; j++){
        //  console.log("result : ",lengthDown1)
         let valueTimeDowm = responseData.data[i].log[j].time_total;
         if(valueTimeDowm === null || valueTimeDowm === undefined){
           valueTimeDowm = 0;
          //  console.log("cc");
           lengthDown1--;
         }
         totalTimeDownLoad1 += valueTimeDowm;
       }
      //  console.log(lengthDown1);
      //  lengthTotalService += lengthDown1;
       timeTotalService += totalTimeDownLoad1;
       lengthTotalService +=  lengthDown1;
              // console.log( "length",lengthDown1);
      //  console.log( "length",lengthDown1);
      //  console.log( "total",totalTimeDownLoad1);
      //  totalTimeDownAgvYoutube += totalTimeDownLoad/lengthDown;
      //  lengthDownYoutube = responseData.data.length+1; 
     }
 
     const agvTotalService = timeTotalService/lengthTotalService;

     let timeGenService = 0;
     let lengthTimeGenService = 0;
     
    for(let i = 0 ; i < responseData.data.length ; i++){
      let totalTimeGen = 0;
      let lengthTimeGen = responseData.data[i].log.length;
     for(let j = 0;j < responseData.data[i].log.length ; j++){
        //  console.log("result : ",lengthDown1)
         let valueTimeDowm = responseData.data[i].log[j].time_gen;
         if(valueTimeDowm === null || valueTimeDowm === undefined){
           valueTimeDowm = 0;
          //  console.log("cc");
          lengthTimeGen--;
         }
         totalTimeGen += valueTimeDowm;
        //  lengthTime1 += lengthTimeGen+1;
       }
       lengthTimeGenService += lengthTimeGen+1;
      //  lengthTotalService += lengthDown1;
      timeGenService += totalTimeGen;
      // console.log(lengthTime1);

              // console.log( "length",lengthDown1);
      //  console.log( "length",lengthDown1);
      //  console.log( "total",totalTimeDownLoad1);
      //  totalTimeDownAgvYoutube += totalTimeDownLoad/lengthDown;
      //  lengthDownYoutube = responseData.data.length+1; 
     }
    //  console.log(timeGenService);
     const agvTotalTimeGenService = timeGenService/lengthTimeGenService;

     let TimeGetVocal = 0;
     let lengthtimegetvocal = 0;
     for(let i = 0 ; i < responseData.data.length ; i++){
      let totalTimeGetVocal = 0;
      let lengthTimeGetVocal = responseData.data[i].log.length;
     for(let j = 0;j < responseData.data[i].log.length ; j++){
        //  console.log("result : ",lengthDown1)
         let valueTimeDowm = responseData.data[i].log[j].time_vocal;
         if(valueTimeDowm === null || valueTimeDowm === undefined){
           valueTimeDowm = 0;
          //  console.log("cc");
          lengthTimeGetVocal--;
         }
         totalTimeGetVocal += valueTimeDowm;
        //  lengthTime1 += lengthTimeGen+1;
       }
       TimeGetVocal += totalTimeGetVocal;
       lengthtimegetvocal += lengthTimeGetVocal+1;
     }
    //  console.log(timeGenService);
      const agvTotalTimeGetVocal = TimeGetVocal/lengthtimegetvocal;
      return (
      <div>
        <h1>Response Data:</h1>
        <h2>Number of Success Statuses: {successCount}</h2>
        <h2>Number of Fail Statuses: {failCount}</h2>
        <h2>Number of Requested Songs: {totalSongCount}</h2>
        <h2>Number of Failed Song Requests: {totalSongFailedCount}</h2>
        <h2>Number of Existing Songs: {totalSongExitsCount}</h2>
        <h2>Number of Successful YouTube Downloads: {totalSongDownYoutobeSuccess}</h2>
        <h2>Number of Proxy Test Failures: {totalProxyTestFail}</h2>
        <h2>Number of gen song success tính từ ngày 1/10/2024 : {totalSongGenSuccess} </h2>
        <h2>Number of gen song fail : {totalSongGenFail}</h2>
        <h2>Number of get vocal song success {totalgetVocalSuccess}</h2>
        <h2>Number of gen song fail : {tottalgetVocalFail}</h2>
        <h2>Number of total status use  fail: {tototalFailStatus}</h2>
        <h2>Number of total status use success: {totalSatusSuccess}</h2>
        <h2>Agv Time Down Youtube {agvTimeDownYoutube}</h2>
        <h2>Agv Time Service {agvTotalService} </h2>
        <h2>Agv Time Gen Service {agvTotalTimeGenService} </h2>
        <h2>Agv Time Get Vocal {agvTotalTimeGetVocal}</h2>
      </div>
    );
  };
  export const responseData = {
    successCounFinal,

  }
export default DataFetchingComponent;
