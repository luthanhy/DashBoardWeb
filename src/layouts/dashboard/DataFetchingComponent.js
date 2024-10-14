import React, { useState, useEffect } from 'react';
const DataFetchingComponent = () => {
  // const [responseData, setResponseData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const postData = async () => {
  //     setLoading(true);
  //     setError(null); // Reset error before making API call
  
  //     try {
  //       const response = await fetch('https://simpia.app/user/requestProxy.php', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           isServiceProxy: true, // Set the value for isServiceProxy
  //         }),
  //       });
  
  //       // Check if the response status is ok (status code 2xx)
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  
  //       const data = await response.json(); // Parse the JSON response
  //       setResponseData(data); // Save the data to state
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //       setError(error.message); // Save the error message to state
  //     } finally {
  //       setLoading(false); // Set loading to false after API call completes
  //     }
  //   };
  
  //   postData();
  // }, []); // useEffect only runs once when the component mounts
  
  // console.log("",responseData);
  // // Display loading state
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // // Display error message if there's an error
  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // // Function to count the number of statuses with 'success'
  // const countSuccess = (data) => {
  //   if (!Array.isArray(data)) return 0; // Return 0 if data is not an array
  //   return data.filter(item => item.status === 'success').length; // Count items with status 'success'
  // };

  // // Function to count the number of statuses with 'error'
  // const countFail = (data) => {
  //   if (!Array.isArray(data)) return 0; // Return 0 if data is not an array
  //   return data.filter(item => item.status === 'error').length; // Count items with status 'error'
  // };

  // // Function to count the number of statuses with 'issues'
  // const countProxyTestFail = (data) => {
  //   if (!Array.isArray(data)) return 0; // Return 0 if data is not an array
  //   return data.filter(item => item.status === 'issues').length; // Count items with status 'issues'
  // };
  // const totalSongCount = responseData && responseData.data
  //   ? responseData.data.reduce((total, item) => {
  //       if (Array.isArray(item.log)) {
  //         return total + item.log.length;
  //       }
  //       return total;
  //     }, 0)
  //   : 0;

  // const totalProxyTestFail = responseData && responseData.data ? countProxyTestFail(responseData.data) : 0;
  // const successCount = responseData && responseData.data ? countSuccess(responseData.data) : 0;
  // const failCount = responseData && responseData.data ? countFail(responseData.data) : 0;
  // function countToStatus(statusInfo, value) {
  //   const totalCal = responseData && responseData.data
  //     ? responseData.data.reduce((total, item) => {
  //         // Check if item.log exists and is an array
  //         if (item && Array.isArray(item.log)) {
  //           let filterSong = [];
  //           // Based on the value, filter the songs accordingly
  //           if (value === '1') {
  //             filterSong = item.log.filter(song => song.status === statusInfo);
  //           } else if (value === '2') {
  //             filterSong = item.log.filter(song => song.status_gen === statusInfo);
  //           } else if (value === '3') {
  //             filterSong = item.log.filter(song => song.status_vocal === statusInfo);
  //           } else if (value === '4') {
  //             filterSong = item.log.filter(song => song.total_status === statusInfo);
  //           }
  //           return total + filterSong.length;
  //         }
  //         return total;
  //       }, 0)
  //     : 0;
  
  //   return totalCal;
  // }
  
  
//   const totalSongFailedCount = countToStatus('fail','1');
//   const totalSongExitsCount = countToStatus('existing','1');
//   const totalSongDownYoutobeSuccess = countToStatus("success",'1');
//   const totalSongGenSuccess = countToStatus("success",'2');
//   const totalSongGenFail = countToStatus("fail","2");
//   const totalgetVocalSuccess = countToStatus("success",'3');
//   const tottalgetVocalFail = countToStatus("fail",'3');
//   const tototalFailStatus = countToStatus("fail","4");
//   const totalSatusSuccess = countToStatus("success",'4');
//   const dataResult2 = JSON.parse(JSON.stringify(responseData.data));
//     for (let i = 0; i < dataResult2.length; i++) {
//       for (let j = 0; j < dataResult2[i].log.length; j++) {
//           if (dataResult2[i].log[j].total_status === null || dataResult2[i].log[j].total_status === undefined || dataResult2[i].log[j].total_status ==="fail"|| dataResult2[i].log[j].status_download ==="existing" || dataResult2[i].log[j].status_pick_proxy === undefined || dataResult2[i].log[j].status_pick_proxy === null ) {
//             dataResult2[i].log.splice(j, 1);
//             j--;}
//       }
//   }
//   const isSameDay = (trackingTime, dateToCompare) => {
//     const trackingDate = new Date(trackingTime);
    
//     return (
//       trackingDate.getFullYear() === dateToCompare.getFullYear() &&
//       trackingDate.getMonth() === dateToCompare.getMonth() &&
//       trackingDate.getDate() === dateToCompare.getDate()
//     );
//   };
//   // 1 day
//   const dataResult1Day = JSON.parse(JSON.stringify(responseData.data));

//   for (let i = 0; i < dataResult1Day.length; i++) {
//     for (let j = 0; j < dataResult1Day[i].log.length; j++) {
//       const log = dataResult1Day[i].log[j];
//       const today = new Date();
//       if (!isSameDay(log.tracking_time, today)) {
//         dataResult1Day[i].log.splice(j, 1);
//             j--;}
//       }
//     }
//     for (let i = 0; i < dataResult1Day.length; i++) {
//       for (let j = 0; j < dataResult1Day[i].log.length; j++) {
//           if (dataResult1Day[i].log[j].total_status === null || dataResult1Day[i].log[j].total_status === undefined || dataResult1Day[i].log[j].total_status ==="fail"|| dataResult1Day[i].log[j].status_download ==="existing" || dataResult1Day[i].log[j].status_pick_proxy === undefined || dataResult1Day[i].log[j].status_pick_proxy === null ) {
//             dataResult1Day[i].log.splice(j, 1);
//             j--;}
//       }
//   }
//   //7day
  //   const isWithinLast7Days = (trackingTime) => {
  //     const today = new Date(); // Current date
  //     const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago timestamp
      
  //     const trackingDate = new Date(trackingTime); // Convert tracking_time to Date object
    
  //     // Return true if trackingDate is between sevenDaysAgo and today
  //     return trackingDate >= sevenDaysAgo && trackingDate <= today;
  //   };
//   const dataResult7Day = JSON.parse(JSON.stringify(responseData.data));

//   for (let i = 0; i < dataResult7Day.length; i++) {
//     for (let j = 0; j < dataResult7Day[i].log.length; j++) {
//       const log = dataResult7Day[i].log[j];
//       if (!isWithinLast7Days(log.tracking_time)) {
//         dataResult7Day[i].log.splice(j, 1); // Remove if not within 7 days
//         j--; // Adjust index after splice to avoid skipping elements  
//       }
//       }
//     }
//     for (let i = 0; i < dataResult7Day.length; i++) {
//       for (let j = 0; j < dataResult7Day[i].log.length; j++) {
//           if (dataResult7Day[i].log[j].total_status === null || dataResult7Day[i].log[j].total_status === undefined || dataResult7Day[i].log[j].total_status ==="fail"|| dataResult7Day[i].log[j].status_download ==="existing" || dataResult7Day[i].log[j].status_pick_proxy === undefined || dataResult7Day[i].log[j].status_pick_proxy === null ) {
//             dataResult7Day[i].log.splice(j, 1);
//             j--;}
//       }
//   }
//   const dataResult3 = dataResult2;
//   function calCulator(statusInfo, dataInput) {
//     let timeDownTotal = 0;
//     let lengthTotal = 0;

//     for (let i = 0; i < dataInput.length; i++) {
//         for (let j = 0; j < dataInput[i].log.length; j++) {
//             timeDownTotal += dataInput[i].log[j][statusInfo]; // Sử dụng statusInfo như một biến để truy cập vào thuộc tính tương ứng
//             lengthTotal++;
//         }
//     }
//     if(lengthTotal === 0){
//       return 0;
//     }
//     let averageTimeDown = (timeDownTotal / lengthTotal).toFixed(2) + "s";

//     return averageTimeDown;
// }

//   const agvTimeDownYoutube = calCulator("time_download",dataResult2);
//   const agvTotalTimeGenService = calCulator("time_gen",dataResult2);
//   const agvTotalTimeGetVocal = calCulator("time_vocal",dataResult2);
//   const  agvTimePickProxy = calCulator("time_pick_proxy",dataResult2);
//   const agvTimeDowmSampleRate = calCulator("time_down_sample_rate",dataResult2);
//   const agvTimeDownChord = calCulator('time_download_chord',dataResult2);
//   const agvTimeMix = calCulator('time_mix',dataResult2);
//   const agvTotalService = calCulator("time_total",dataResult2);

//   const agvTimeDownYoutube1 = calCulator("time_download",dataResult1Day);
//   const agvTotalTimeGenService1 = calCulator("time_gen",dataResult1Day);
//   const agvTotalTimeGetVocal1 = calCulator("time_vocal",dataResult1Day);
//   const  agvTimePickProxy1 = calCulator("time_pick_proxy",dataResult1Day);
//   const agvTimeDowmSampleRate1 = calCulator("time_down_sample_rate",dataResult1Day);
//   const agvTimeDownChord1 = calCulator('time_download_chord',dataResult1Day);
//   const agvTimeMix1 = calCulator('time_mix',dataResult1Day);
//   const agvTotalService1 = calCulator("time_total",dataResult1Day);

//   const agvTimeDownYoutube7 = calCulator("time_download",dataResult7Day);
//   const agvTotalTimeGenService7 = calCulator("time_gen",dataResult7Day);
//   const agvTotalTimeGetVocal7 = calCulator("time_vocal",dataResult7Day);
//   const  agvTimePickProxy7 = calCulator("time_pick_proxy",dataResult7Day);
//   const agvTimeDowmSampleRate7 = calCulator("time_down_sample_rate",dataResult7Day);
//   const agvTimeDownChord7 = calCulator('time_download_chord',dataResult7Day);
//   const agvTimeMix7 = calCulator('time_mix',dataResult7Day);
//   const agvTotalService7 = calCulator("time_total",dataResult7Day);
   
//   // cal per
//   const dataUseCalPer = JSON.parse(JSON.stringify(responseData.data));
//   for (let i = 0; i < dataUseCalPer.length; i++) {
//     for (let j = 0; j < dataUseCalPer[i].log.length; j++) {
//       const log = dataUseCalPer[i].log[j];
//       const today = new Date();
//       if (!isSameDay(log.tracking_time, today)) {
//         dataUseCalPer[i].log.splice(j, 1);
//             j--;}
//       }
//     }
//     console.log("data use cal per ",dataUseCalPer);
//     function AgvToStatus(statusInfo,dataUseCalPerInput){
//       let numberSong = 0;
//       let totalData = 0;
//       for(let i = 0 ; i < dataUseCalPerInput.length;i++){
//           numberSong += (dataUseCalPerInput[i].log.length);
//           for(let j = 0 ; j <(dataUseCalPerInput[i].log.length) ;j++){
//             if(dataUseCalPerInput[i].log[j][statusInfo] === 'success' ||dataUseCalPerInput[i].log[j][statusInfo] === 'existing' ){
//               totalData++;
//             }
//           }
//       }
//       console.log("sl song",numberSong);
//       console.log("totalData",totalData);
//       return Math.round((totalData/numberSong)*100);
//     }
//   const perSuccessPickProxy1 = AgvToStatus('status_pick_proxy',dataUseCalPer);
//   const perFailPickProxy1 =( 100 -perSuccessPickProxy1);
//   const perDownloadTimeSuccess1 = AgvToStatus('status_download',dataUseCalPer);
//   const perDownloadFail1 = (100 - perDownloadTimeSuccess1);
//   const perDownSampleRateSuccess1  = AgvToStatus('status_down_sample_rate',dataUseCalPer);
//   const perDownSampleRateFail1 = (100 - perDownSampleRateSuccess1);
//   const perDownChordSuccess1 = AgvToStatus('status_download_chords',dataUseCalPer);
//   const perDownChordFail1 = 100 - perDownChordSuccess1;
//   const perVocalSuccess1 = AgvToStatus('status_vocal',dataUseCalPer);
//   const perVocalFail = 100 - perVocalSuccess1;
//   const perGenerateTSuccess1 = AgvToStatus('status_gen',dataUseCalPer);
//   const perGenerateTFail11 = 100 - perGenerateTSuccess1;
//   const perMixSuccess1 = AgvToStatus('mix_status',dataUseCalPer);
//   const perMixFail11 = 100 - perMixSuccess1;
//   const perServiceSuccess1 = AgvToStatus("total_status",dataUseCalPer);
//   const perServiceFail1 = 100 - perServiceSuccess1;

//   // cal per 7day
//   const dataUseCal1Week = JSON.parse(JSON.stringify(responseData.data));
//   for (let i = 0; i < dataUseCal1Week.length; i++) {
//     for (let j = 0; j < dataUseCal1Week[i].log.length; j++) {
//       const log = dataUseCal1Week[i].log[j];
//       if (!isWithinLast7Days(log.tracking_time)) {
//         dataUseCal1Week[i].log.splice(j, 1); // Remove if not within 7 days
//         j--; // Adjust index after splice to avoid skipping elements  
//       }
//       }
//     }
//     const perSuccessPickProxy7 = AgvToStatus('status_pick_proxy',dataUseCal1Week);
//     const perFailPickProxy7 =( 100 -perSuccessPickProxy7);
//     const perDownloadTimeSuccess7 = AgvToStatus('status_download',dataUseCal1Week);
//     const perDownloadFail7 = (100 - perDownloadTimeSuccess7);
//     const perDownSampleRateSuccess7  = AgvToStatus('status_down_sample_rate',dataUseCal1Week);
//     const perDownSampleRateFail7 = (100 - perDownSampleRateSuccess7);
//     const perDownChordSuccess7 = AgvToStatus('status_download_chords',dataUseCal1Week);
//     const perDownChordFail7 = 100 - perDownChordSuccess7;
//     const perVocalSuccess7 = AgvToStatus('status_vocal',dataUseCal1Week);
//     const perVocalFail7 = 100 - perVocalSuccess7;
//     const perGenerateTSuccess7 = AgvToStatus('status_gen',dataUseCal1Week);
//     const perGenerateTFail17 = 100 - perGenerateTSuccess7;
//     const perMixSuccess7 = AgvToStatus('mix_status',dataUseCal1Week);
//     const perMixFail17 = 100 - perMixSuccess7;
//     const perServiceSuccess7 = AgvToStatus("total_status",dataUseCal1Week);
//     const perServiceFail7 = 100 - perServiceSuccess7;
let perSuccessPickProxy7 = 0;
let perFailPickProxy7 = 0;
let perDownloadTimeSuccess7 = 0;
let perDownloadFail7 = 0;
let perDownSampleRateSuccess7 = 0;
let perDownSampleRateFail7 = 0;
let perDownChordSuccess7 = 0;
let perDownChordFail7 = 0;
let perVocalSuccess7 = 0;
let perVocalFail7 = 0;
let perGenerateTSuccess7 = 0;
let perGenerateTFail17 = 0;
let perMixSuccess7 = 0;
let perMixFail17 = 0;
let perServiceSuccess7 = 0;
let perServiceFail7 = 0;
let perServiceSuccess1 = 0;
let perServiceFail1 = 0;
let perMixSuccess1 = 0;
let perMixFail11 = 0;
let perGenerateTSuccess1 = 0;
let perGenerateTFail11 = 0;
let perVocalSuccess1 = 0;
let perVocalFail = 0;
let perDownChordSuccess1 = 0;
let perDownChordFail1 = 0;
let perDownSampleRateSuccess1 = 0;
let perDownSampleRateFail1 = 0;
let perDownloadTimeSuccess1 = 0;
let perDownloadFail1 = 0;
let perSuccessPickProxy1 = 0;
let perFailPickProxy1 = 0;
let successCount = 0;
let failCount = 0;
let totalSongCount = 0;
let totalSongFailedCount = 0;
let totalSongExitsCount = 0;
let totalSongDownYoutobeSuccess = 0;
let totalProxyTestFail = 0;
let totalSongGenSuccess = 0;
let totalSongGenFail = 0;
let totalgetVocalSuccess = 0;
let tottalgetVocalFail = 0;
let tototalFailStatus = 0;
let totalSatusSuccess = 0;
let agvTimeDownYoutube = 0;
let agvTotalService = 0;
let agvTotalTimeGenService = 0;
let agvTotalTimeGetVocal = 0;
let agvTimePickProxy = 0;
let agvTimeDowmSampleRate = 0;
let agvTimeDownChord = 0;
let agvTimeMix = 0; 
let agvTimeDownYoutube1 = 0;
let agvTotalTimeGenService1 = 0;
let agvTotalTimeGetVocal1 = 0;
let agvTimePickProxy1 = 0;
let agvTimeDowmSampleRate1 = 0;
let agvTimeDownChord1 = 0;
let agvTimeMix1 = 0;
let agvTotalService1 = 0;
let agvTimeDownYoutube7 = 0;
let agvTotalTimeGenService7 = 0;
let agvTotalTimeGetVocal7 = 0;
let agvTimePickProxy7 = 0;
let agvTimeDowmSampleRate7 = 0;
let agvTimeDownChord7 = 0;
let agvTimeMix7 = 0;
let agvTotalService7 = 0;
let dataResult3 = []; // Giả sử đây là một mảng

  return {
    perSuccessPickProxy7,
    perFailPickProxy7,
    perDownloadTimeSuccess7,
    perDownloadFail7,
    perDownSampleRateSuccess7,
    perDownSampleRateFail7,
    perDownChordSuccess7,
    perDownChordFail7,
    perVocalSuccess7,
    perVocalFail7,
    perGenerateTSuccess7,
    perGenerateTFail17,
    perMixSuccess7,
    perMixFail17,
    perServiceSuccess7,
    perServiceFail7,
    perServiceSuccess1,
    perServiceFail1,
    perMixSuccess1,
    perMixFail11,
    perGenerateTSuccess1,
    perGenerateTFail11,
    perVocalSuccess1,
    perVocalFail,
    perDownChordSuccess1,
    perDownChordFail1,
     perDownSampleRateSuccess1,
     perDownSampleRateFail1,
      perDownloadTimeSuccess1,
      perDownloadFail1,
        perSuccessPickProxy1,
        perFailPickProxy1,
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
