import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import DataFetchingComponent from 'layouts/dashboard/DataFetchingComponent';

function Projects() {
  const dataFetch = DataFetchingComponent();
  const listData = dataFetch?.dataResult; // Optional chaining để tránh lỗi khi chưa có dữ liệu
  console.log(listData);
  // Kiểm tra nếu listData tồn tại và không rỗng
  if (!listData || listData.length === 0) {
    return <div>Loading data...</div>;
  }

  // Kết hợp tất cả các `log` từ các phần tử của listData
  const dataFinal = listData.reduce((acc, curr) => {
    if (curr?.log) {
      return [...acc, ...curr.log]; // Kết hợp các log từ từng phần tử
    }
    return acc;
  }, []);

  if (dataFinal.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div style={{ maxHeight: '800px', overflowY: 'auto', marginTop: '7px' }}>
      <Grid container spacing={2}>
        {dataFinal.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.idProxy}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                  {project.name_server}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.proxy}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  <strong>timeDownload:</strong> {project.timeDownload}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  <strong>idYoutube:</strong> {project.ytID}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  <strong>status download:</strong> {project.status_download}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  <strong>status gen:</strong> {project.status_gen}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  <strong>status vocal:</strong> {project.status_vocal}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  <strong>status gen:</strong> {project.status_gen}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  <strong>total status:</strong> {project.total_status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Projects;
