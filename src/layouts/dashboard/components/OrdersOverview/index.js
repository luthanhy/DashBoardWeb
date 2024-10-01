import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Orders overview
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              24%
            </MDTypography>{" "}
            this month
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox 
        p={2} 
        sx={{ 
          maxHeight: "400px", // Chiều cao tối đa cho vùng có thể cuộn
          overflowY: "auto", // Cho phép cuộn theo chiều dọc
          overflowX: "hidden", // Ẩn thanh cuộn ngang
        }}
      >
        {/* Danh sách các mục */}
        {Array.from({ length: 20 }, (_, index) => ( // Giả lập nhiều mục
          <TimelineItem
            key={index}
            color="success"
            icon="notifications"
            title={`$2400, Design changes ${index + 1}`}
            dateTime="22 DEC 7:20 PM"
          />
        ))}
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
