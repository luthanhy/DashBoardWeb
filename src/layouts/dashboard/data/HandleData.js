import React, { useState, useEffect } from 'react';
import FetchData from './FetchData';

const HandleData = () => {
    // State to store the fetched data
    const [fetchData, setFetchData] = useState(null);

    // Fetch data on component mount
    useEffect(() => {
        const loadData = async () => {
            const data = await FetchData(); // Assuming FetchData is an async function
            setFetchData(data); // Store the data in state
        };

        loadData();
    }, []);  // Empty dependency array to run only on component mount

    // Check if data is still loading
    if (!fetchData) {
        return <div>Loading...</div>; // Show loading message until data is fetched
    }

    console.log("Fetched data:", fetchData.finalData);

    return (
        <div>
            <h1>Check the console for logs</h1>
            <pre>{JSON.stringify(fetchData.finalData, null, 2)}</pre> {/* Display fetched data */}
        </div>
    );
};

export default HandleData;
