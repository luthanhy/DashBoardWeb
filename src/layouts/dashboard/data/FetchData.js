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

    console.log("uniqueNameServers",uniqueNameServers);

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
    const logsGroupedByNameServer = groupLogsByNameServer(LogDataClean);
    console.log(logsGroupedByNameServer);
    return (
        <h1>luthanhy</h1>
    )
}
export default FetchData;