// Import các thành phần từ Recharts
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import DataFetchingComponent from './DataFetchingComponent';

// const dataFetch = DataFetchingComponent();

// console.log("",dataFetch.totalSongCount);
// console.log("",dataFetch.totalSongDownYoutobeSuccess);
// console.log("",dataFetch.totalSongFailedCount);


// Dữ liệu ví dụ với giá trị là phần trăm

function MyPieChart() {
    const fetchedData = DataFetchingComponent();
    const data = [
      { name: 'Số lượng bài down Fail', value: Math.round((fetchedData.totalSongFailedCount / fetchedData.totalSongCount) * 100) },
      { name: 'Số lượng bài down Success', value: Math.round((fetchedData.totalSongDownYoutobeSuccess / fetchedData.totalSongCount) * 100) },
      { name: 'Số lượng bài hát đã tồn tại', value: Math.round((fetchedData.totalSongExitsCount / fetchedData.totalSongCount) * 100) }
      ];
      
      // Màu sắc cho từng phần của biểu đồ
      const COLORS = ['#FF8042', '#00C49F', '#FFBB28'];
      
      // Hàm hiển thị giá trị phần trăm trực tiếp
      const renderCustomizedLabel = ({ value }) => {
        return `${value}%`;
      };
      
  return (
    <PieChart width={800} height={500}>  {/* Tăng chiều rộng và chiều cao của biểu đồ */}
      <Pie
        data={data}
        cx={300}  // Di chuyển tâm biểu đồ sang bên phải để tạo không gian cho chú giải
        cy={250}  // Điều chỉnh tọa độ trục y của tâm
        innerRadius={100} // Tăng bán kính trong để tạo không gian
        outerRadius={180} // Tăng bán kính ngoài để biểu đồ lớn hơn
        fill="#8884d8"
        paddingAngle={5} // Khoảng cách giữa các phần của biểu đồ
        dataKey="value" // Giá trị của từng phần
        label={renderCustomizedLabel} // Gọi hàm hiển thị nhãn với giá trị phần trăm
        labelPosition="outside" // Đặt nhãn bên ngoài để tránh mất chữ
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />  {/* Hiển thị thông tin khi di chuột vào các phần */}
      <Legend 
        layout="vertical"  // Hiển thị theo chiều dọc
        align="right"      // Canh sang phải
        verticalAlign="middle"  // Căn giữa theo chiều dọc
      />
    </PieChart>
  );
};

export default MyPieChart;
