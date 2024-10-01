import React, { useState, useEffect } from 'react';

const DataFetchingComponent = () => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const postData = async () => {
      setLoading(true);
      setError(null); // Đặt lỗi về null trước khi gọi API
      try {
        const response = await fetch('https://simpia.app/user/requestProxy.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isServiceProxy: true, // Set your value for isServiceProxy
          }),
        });
        
        // Kiểm tra trạng thái của phản hồi
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Phân tích phản hồi JSON
        setResponseData(data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message); // Lưu thông điệp lỗi vào state
      } finally {
        setLoading(false); // Đặt loading về false khi hoàn thành
      }
    };

    postData();
  }, []); // useEffect chỉ chạy một lần khi component được mount

  // Hiển thị trạng thái loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Hàm đếm số lượng status 'success'
  const countSuccess = (data) => {
    if (!Array.isArray(data)) return 0; // Nếu không phải là mảng, trả về 0
    return data.filter(item => item.status === 'success').length; // Đếm các mục có status là 'success'
  };
  const countFail = (data) => {
    if (!Array.isArray(data)) return 0; // Nếu không phải là mảng, trả về 0
    return data.filter(item => item.status === 'error').length; // Đếm các mục có status là 'success'
  };

  // Đảm bảo responseData là một mảng
  const successCount = responseData && responseData.data ? countSuccess(responseData.data) : 0;
  const failCount = responseData && responseData.data ? countFail(responseData.data) : 0;
  const totalSongCount = responseData && responseData.data
  ? responseData.data.reduce((total, item) => {
      if (Array.isArray(item.log)) {
        return total + item.log.length; 
      }
      return total; 
    }, 0)
  : 0; 
  const totalSongFailedCount = responseData && responseData.data
  ? responseData.data.reduce((total, item) => {
      if (Array.isArray(item.log)) {
        const failedSongs = item.log.filter(song => song.status === 'fail');
        return total + failedSongs.length; 
      }
      return total; 
    }, 0)
  : 0; 
  const totalSongExitsCount = responseData && responseData.data
  ? responseData.data.reduce((total, item) => {
      if (Array.isArray(item.log)) {
        const failedSongs = item.log.filter(song => song.status === 'existing');
        return total + failedSongs.length; 
      }
      return total; 
    }, 0)
  : 0; 
  const totalSongDownYoutobeSuccess = responseData && responseData.data
  ? responseData.data.reduce((total, item) => {
      if (Array.isArray(item.log)) {
        const failedSongs = item.log.filter(song => song.status === 'success');
        return total + failedSongs.length; 
      }
      return total; 
    }, 0)
  : 0; 
  return (
    <div>
      <h1>Response Data:</h1>
      <h2>Number of Success Statuses: {successCount}</h2> {/* Hiển thị số lượng status 'success' */}
      <h2>Number of fail Statuses: {failCount}</h2> {/* Hiển thị số lượng status 'success' */}
      <h2>Số lượng bài hát request {totalSongCount} </h2>
      <h2>Số lượng bài hát request fail {totalSongFailedCount} </h2>
      <h2>Số lượng bài hát đã tồn tại {totalSongExitsCount}</h2>
      <h2>Số lượng bài hát tải qua youtobe thành công {totalSongDownYoutobeSuccess} </h2>
    </div>
  );
};

export default DataFetchingComponent;
