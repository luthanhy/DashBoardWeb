import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchData = () => {

    const [responseData, setResponseData] = useState(null);
    const [responseDataSecond,setResponseDataSecond] = useState(null);
    useEffect(() => {
        const postData = async(isServiceProxy) => {
            try {
                const response = await axios.post('https://simpia.app/user/requestProxy.php',{
                    isServiceProxy: isServiceProxy, 
                },{
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                return response.data;
            } catch (e) {
                console.error("Axios error:", e);
                throw e;
            }
        };
        const fetchData = async() =>{
            try{
                const [dataTrue,dataFalse] = await Promise.all([
                    postData(true),
                    postData(false),
                ]);
                setResponseData(dataTrue);
                setResponseDataSecond(dataFalse);
            }catch(e){
                // Error is already handled in postData, so no need for additional handling here
            }finally{
            }
        };
        fetchData();
    },[]);
    if(!responseData){
        return;
    }

    const dataResultTrue = responseData?.data;
    const dataResultFalse = responseDataSecond?.data;

    function checkStatusProxy(data,status){
        if(!Array.isArray(data))
            return 0;
        return data.filter(item=>item.status === status).length;
    }



    const totalProxySuccess = checkStatusProxy(dataResultTrue,'success');
    const totalProxyLocked = checkStatusProxy(dataResultFalse,'locked');
    const totalProxyTestFailed  = checkStatusProxy(dataResultFalse,'issues');
    const totalProxyError =  checkStatusProxy(dataResultTrue,'error');

    function CalSong(data){
        const totalSong = data.reduce((total,item)=>{
            if(Array.isArray(item.log)){
                return total + item.log.length;
            }
            return total;
        },0)
        return totalSong;
    }

    const totalSong = CalSong(dataResultTrue) + CalSong(dataResultFalse);

    function CalStatusSong(data,statusInfo){
        const totalStatusSong = data.reduce((total,item)=>{
            if(Array.isArray(item.log)){
                const filterSong =  item.log.filter(item=>item.status === statusInfo);
                return total + filterSong.length;
            }
            return total;
        },0);
        return totalStatusSong;
    }

    const totalSongUse = CalStatusSong(dataResultTrue,'success') + CalStatusSong(dataResultFalse,'success') + CalStatusSong(dataResultTrue,'existing') + CalStatusSong(dataResultFalse,'existing');
    const totalSongNoUsing = CalStatusSong(dataResultTrue,'fail') + CalStatusSong(dataResultFalse,'fail');

    const dataRawTrue = dataResultTrue;
    const dataRawFalse = dataResultFalse;
    function CleanData(data) {
        for (let i = 0; i < data.length; i++) {
            if (Array.isArray(data[i].log)) {
                for (let j = 0; j < data[i].log.length; j++) {
                }
            } else {
                data.splice(i, 1); 
                i--; 
            }
        }
        return data; 
    }
    

    const dataCleanTrue =  CleanData(dataRawTrue);
    const dataCleanFalse = CleanData(dataRawFalse)
    
    function gatherLog(dataFirst,dataSecond){
        let data = [];
        dataFirst.forEach(element => {
            data = [...data,...element.log];
        });
        dataSecond.forEach(element => {
            data = [...data,...element.log];
        });
        return data;
    }
    const LogDataClean = gatherLog(dataCleanTrue,dataCleanFalse);

    function getUniqueNameServer(logs)
    {
        const uniqueNameServer = new Set();
        logs.forEach(element => {
            if(element.name_server){
                uniqueNameServer.add(element.name_server);
            }
        })
        return Array.from(uniqueNameServer);
    } 

    const uniqueNameServers = getUniqueNameServer(LogDataClean);


    function groupLogsByNameServer(logs) {
        const groupedLogs = {};
    
        logs.forEach(log => {
            if (log.name_server) {
                if (!groupedLogs[log.name_server]) {
                    groupedLogs[log.name_server] = [];
                }
                groupedLogs[log.name_server].push(log);
            }
        });
    
        return groupedLogs;
    }
    const logsGroupedByNameServer =  groupLogsByNameServer(LogDataClean);
    console.log(logsGroupedByNameServer['local']); 
    for (let i = 0; i < Object.keys(logsGroupedByNameServer).length; i++) {
        const key = Object.keys(logsGroupedByNameServer)[i];
        const logs = logsGroupedByNameServer[key]; 
    
        for (let j = 0; j < logs.length; j++) {
            if (logs[j].total_status === null || logs[j].total_status === undefined || logs[j].total_status === "fail" || logs[j].status_download === "existing" || logs[j].status_pick_proxy === undefined || logs[j].status_pick_proxy === null) {
                logs.splice(j, 1);
                j--; 
            }
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
  const isWithinLast7Days = (trackingTime) => {
    const today = new Date(); 
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); 
    const trackingDate = new Date(trackingTime); 
    return trackingDate >= sevenDaysAgo && trackingDate <= today;
  };
  const isWithinLast30Days = (trackingTime) => {
    const today = new Date(); 
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000); 
    const trackingDate = new Date(trackingTime); 
    return trackingDate >= thirtyDaysAgo && trackingDate <= today;
  };

  function FillDataByDay(type, data) {
    for (let i = 0; i < Object.keys(data).length; i++) {
        const key = Object.keys(data)[i]; // Get the current key
        const logs = data[key]; // Get the array for this key
    
        for (let j = 0; j < logs.length; j++) {
            if (type === '1') {
                const today = new Date();
                if (!isSameDay(logs[j].tracking_time, today)) {
                    logs.splice(j, 1); // Remove the log if it's not from today
                    j--; 
                }
            }else if(type === '2'){
                if(!isWithinLast7Days(logs[j].tracking_time)){
                    logs.splice(j, 1);
                    j--;
                }
            }else if(type === '3'){
                if(!isWithinLast30Days(logs[j].tracking_time)){
                    logs.splice(j, 1);
                    j--;
                }
            }
        }
    }

    return data; // Return the modified data
}

  const rawDataOneDay = logsGroupedByNameServer;
  const rawDataSevenDay = logsGroupedByNameServer;
  const rawDataThirtyDay = logsGroupedByNameServer;

  const dataOneDay = FillDataByDay('1',rawDataOneDay);
  const dataSevenDay = FillDataByDay('2',rawDataSevenDay);
  const dataThirtyDay = FillDataByDay('3',rawDataThirtyDay);


  console.log("1",dataOneDay);
  console.log("2",dataSevenDay);
  console.log("3",dataThirtyDay);
    return (
        logsGroupedByNameServer
    )
}
export default FetchData;