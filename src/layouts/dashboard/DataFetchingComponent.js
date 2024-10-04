import React, { useState, useEffect } from 'react';
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
  function countToStatus(statusInfo, value) {
    const totalCal = responseData && responseData.data
      ? responseData.data.reduce((total, item) => {
          // Check if item.log exists and is an array
          if (item && Array.isArray(item.log)) {
            let filterSong = [];
            // Based on the value, filter the songs accordingly
            if (value === '1') {
              filterSong = item.log.filter(song => song.status === statusInfo);
            } else if (value === '2') {
              filterSong = item.log.filter(song => song.status_gen === statusInfo);
            } else if (value === '3') {
              filterSong = item.log.filter(song => song.status_vocal === statusInfo);
            } else if (value === '4') {
              filterSong = item.log.filter(song => song.total_status === statusInfo);
            }
            
            // Accumulate the filtered results
            return total + filterSong.length;
          }
          
          // If item.log is not an array, just return the current total
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
  const dataResult2 = JSON.parse(JSON.stringify(responseData.data));
  // dataResult2.splice(1, 1);
    console.log("luthanhy", dataResult2);
    for (let i = 0; i < dataResult2.length; i++) {
      for (let j = 0; j < dataResult2[i].log.length; j++) {
          if (dataResult2[i].log[j].total_status === null || dataResult2[i].log[j].total_status === undefined || dataResult2[i].log[j].total_status ==="fail"|| dataResult2[i].log[j].status_download ==="existing" || dataResult2[i].log[j].status_pick_proxy === undefined || dataResult2[i].log[j].status_pick_proxy === null ) {
            dataResult2[i].log.splice(j, 1);
            j--;}
      }
  }
  const isSameDay = (trackingTime, dateToCompare) => {
    const trackingDate = new Date(trackingTime);
    
    return (
      trackingDate.getFullYear() === dateToCompare.getFullYear() &&
      trackingDate.getMonth() === dateToCompare.getMonth() &&
      trackingDate.getDate() === dateToCompare.getDate()
    );
  };
  // 1 day
  const dataResult1Day = JSON.parse(JSON.stringify(responseData.data));

  for (let i = 0; i < dataResult1Day.length; i++) {
    for (let j = 0; j < dataResult1Day[i].log.length; j++) {
      const log = dataResult1Day[i].log[j];
      const today = new Date();
      if (!isSameDay(log.tracking_time, today)) {
        dataResult1Day[i].log.splice(j, 1);
            j--;}
      }
    }
    for (let i = 0; i < dataResult1Day.length; i++) {
      for (let j = 0; j < dataResult1Day[i].log.length; j++) {
          if (dataResult1Day[i].log[j].total_status === null || dataResult1Day[i].log[j].total_status === undefined || dataResult1Day[i].log[j].total_status ==="fail"|| dataResult1Day[i].log[j].status_download ==="existing" || dataResult1Day[i].log[j].status_pick_proxy === undefined || dataResult1Day[i].log[j].status_pick_proxy === null ) {
            dataResult1Day[i].log.splice(j, 1);
            j--;}
      }
  }
  //7day
  const isWithinLast7Days = (trackingTime) => {
    const today = new Date(); // Current date
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago timestamp
    
    const trackingDate = new Date(trackingTime); // Convert tracking_time to Date object
  
    // Return true if trackingDate is between sevenDaysAgo and today
    return trackingDate >= sevenDaysAgo && trackingDate <= today;
  };
  const dataResult7Day = JSON.parse(JSON.stringify(responseData.data));

  for (let i = 0; i < dataResult7Day.length; i++) {
    for (let j = 0; j < dataResult7Day[i].log.length; j++) {
      const log = dataResult7Day[i].log[j];
      if (!isWithinLast7Days(log.tracking_time)) {
        dataResult7Day[i].log.splice(j, 1); // Remove if not within 7 days
        j--; // Adjust index after splice to avoid skipping elements  
      }
      }
    }
    for (let i = 0; i < dataResult7Day.length; i++) {
      for (let j = 0; j < dataResult7Day[i].log.length; j++) {
          if (dataResult7Day[i].log[j].total_status === null || dataResult7Day[i].log[j].total_status === undefined || dataResult7Day[i].log[j].total_status ==="fail"|| dataResult7Day[i].log[j].status_download ==="existing" || dataResult7Day[i].log[j].status_pick_proxy === undefined || dataResult7Day[i].log[j].status_pick_proxy === null ) {
            dataResult7Day[i].log.splice(j, 1);
            j--;}
      }
  }
  console.log("7 Day data",dataResult7Day);
  const dataResult3 = dataResult2;
  function calCulator(statusInfo, dataInput) {
    let timeDownTotal = 0;
    let lengthTotal = 0;

    for (let i = 0; i < dataInput.length; i++) {
        for (let j = 0; j < dataInput[i].log.length; j++) {
            timeDownTotal += dataInput[i].log[j][statusInfo]; // Sử dụng statusInfo như một biến để truy cập vào thuộc tính tương ứng
            lengthTotal++;
        }
    }
    if(lengthTotal === 0){
      return 0;
    }
    // Tính trung bình và định dạng số thập phân
    let averageTimeDown = (timeDownTotal / lengthTotal).toFixed(2) + "s";

    return averageTimeDown;
}

  const agvTimeDownYoutube = calCulator("time_download",dataResult2);
  const agvTotalTimeGenService = calCulator("time_gen",dataResult2);
  const agvTotalTimeGetVocal = calCulator("time_vocal",dataResult2);
  const  agvTimePickProxy = calCulator("time_pick_proxy",dataResult2);
  const agvTimeDowmSampleRate = calCulator("time_down_sample_rate",dataResult2);
  const agvTimeDownChord = calCulator('time_download_chord',dataResult2);
  const agvTimeMix = calCulator('time_mix',dataResult2);
  const agvTotalService = calCulator("time_total",dataResult2);

  const agvTimeDownYoutube1 = calCulator("time_download",dataResult1Day);
  const agvTotalTimeGenService1 = calCulator("time_gen",dataResult1Day);
  const agvTotalTimeGetVocal1 = calCulator("time_vocal",dataResult1Day);
  const  agvTimePickProxy1 = calCulator("time_pick_proxy",dataResult1Day);
  const agvTimeDowmSampleRate1 = calCulator("time_down_sample_rate",dataResult1Day);
  const agvTimeDownChord1 = calCulator('time_download_chord',dataResult1Day);
  const agvTimeMix1 = calCulator('time_mix',dataResult1Day);
  const agvTotalService1 = calCulator("time_total",dataResult1Day);

  const agvTimeDownYoutube7 = calCulator("time_download",dataResult7Day);
  const agvTotalTimeGenService7 = calCulator("time_gen",dataResult7Day);
  const agvTotalTimeGetVocal7 = calCulator("time_vocal",dataResult7Day);
  const  agvTimePickProxy7 = calCulator("time_pick_proxy",dataResult7Day);
  const agvTimeDowmSampleRate7 = calCulator("time_down_sample_rate",dataResult7Day);
  const agvTimeDownChord7 = calCulator('time_download_chord',dataResult7Day);
  const agvTimeMix7 = calCulator('time_mix',dataResult7Day);
  const agvTotalService7 = calCulator("time_total",dataResult7Day);
  
  // let timeTotalService = 0;
    // let lengthTotalService = 0;

    // for(let i = 0 ; i < responseData.data.length ; i++){
    //   let totalTimeDownLoad1 = 0;
    //   let lengthDown1 = responseData.data[i].log.length;
    //  for(let j = 0;j < responseData.data[i].log.length ; j++){
    //     //  console.log("result : ",lengthDown1)
    //      let valueTimeDowm = responseData.data[i].log[j].time_total;
    //      if(valueTimeDowm === null || valueTimeDowm === undefined){
    //        valueTimeDowm = 0;
    //       //  console.log("cc");
    //        lengthDown1--;
    //      }
    //      totalTimeDownLoad1 += valueTimeDowm;
    //    }
      //  console.log(lengthDown1);
      //  lengthTotalService += lengthDown1;
      //  timeTotalService += totalTimeDownLoad1;
      //  lengthTotalService +=  lengthDown1;
              // console.log( "length",lengthDown1);
      //  console.log( "length",lengthDown1);
      //  console.log( "total",totalTimeDownLoad1);
      //  totalTimeDownAgvYoutube += totalTimeDownLoad/lengthDown;
      //  lengthDownYoutube = responseData.data.length+1; 
    //  }
 
  // const agvTotalService = Math.floor(timeTotalService/lengthTotalService) + 's';

    //  let timeGenService = 0;
    //  let lengthTimeGenService = 0;
     
    // for(let i = 0 ; i < responseData.data.length ; i++){
    //   let totalTimeGen = 0;
    //   let lengthTimeGen = responseData.data[i].log.length;
    //  for(let j = 0;j < responseData.data[i].log.length ; j++){
    //     //  console.log("result : ",lengthDown1)
    //      let valueTimeDowm = responseData.data[i].log[j].time_gen;
    //      if(valueTimeDowm === null || valueTimeDowm === undefined){
    //        valueTimeDowm = 0;
    //       //  console.log("cc");
    //       lengthTimeGen--;
    //      }
    //      totalTimeGen += valueTimeDowm;
    //     //  lengthTime1 += lengthTimeGen+1;
    //    }
    //    lengthTimeGenService += lengthTimeGen+1;
    //   //  lengthTotalService += lengthDown1;
    //   timeGenService += totalTimeGen;
    //   // console.log(lengthTime1);

    //           // console.log( "length",lengthDown1);
    //   //  console.log( "length",lengthDown1);
    //   //  console.log( "total",totalTimeDownLoad1);
    //   //  totalTimeDownAgvYoutube += totalTimeDownLoad/lengthDown;
    //   //  lengthDownYoutube = responseData.data.length+1; 
    //  }
    // //  console.log(timeGenService);
    //  const agvTotalTimeGenService = Math.floor(timeGenService/lengthTimeGenService )+ 's';

    //  let TimeGetVocal = 0;
    //  let lengthtimegetvocal = 0;
    //  for(let i = 0 ; i < responseData.data.length ; i++){
    //   let totalTimeGetVocal = 0;
    //   let lengthTimeGetVocal = responseData.data[i].log.length;
    //  for(let j = 0;j < responseData.data[i].log.length ; j++){
    //     //  console.log("result : ",lengthDown1)
    //      let valueTimeDowm = responseData.data[i].log[j].time_vocal;
    //      if(valueTimeDowm === null || valueTimeDowm === undefined){
    //        valueTimeDowm = 0;
    //       //  console.log("cc");
    //       lengthTimeGetVocal--;
    //      }
    //      totalTimeGetVocal += valueTimeDowm;
    //     //  lengthTime1 += lengthTimeGen+1;
    //    }
    //    TimeGetVocal += totalTimeGetVocal;
    //    lengthtimegetvocal += lengthTimeGetVocal+1;
    //  }
    //  console.log(timeGenService);
      // const agvTotalTimeGetVocal = Math.floor(TimeGetVocal/lengthtimegetvocal )+ 's';
      return {
        successCount,
        failCount,
        totalSongCount,
        totalSongFailedCount,
        totalSongExitsCount,
        totalSongDownYoutobeSuccess,
        totalProxyTestFail,
        totalSongGenSuccess,
        totalSongGenFail,
        totalgetVocalSuccess,
        tottalgetVocalFail,
        tototalFailStatus,
        totalSatusSuccess,
        agvTimeDownYoutube,
        agvTotalService,
        agvTotalTimeGenService,
        agvTotalTimeGetVocal,
        agvTimePickProxy,
        agvTimeDowmSampleRate,
        agvTimeDownChord,
        agvTimeMix, 
        agvTimeDownYoutube1,
        agvTotalTimeGenService1,
        agvTotalTimeGetVocal1,
        agvTimePickProxy1,
        agvTimeDowmSampleRate1,
        agvTimeDownChord1,
        agvTimeMix1,
        agvTotalService1,
        agvTimeDownYoutube7,
        agvTotalTimeGenService7,
        agvTotalTimeGetVocal7,
        agvTimePickProxy7,
        agvTimeDowmSampleRate7,
        agvTimeDownChord7,
        agvTimeMix7,
        agvTotalService7,
        dataResult3
      };
  };
export default DataFetchingComponent;
