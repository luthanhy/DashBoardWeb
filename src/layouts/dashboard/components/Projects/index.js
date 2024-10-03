import React from 'react';
import { Grid, Card, CardContent, Typography, Paper } from '@mui/material';

// Dữ liệu mẫu
const data = [
  { id: 1, name: 'Project 1', description: 'Description for Project 1', timeVocal: 's', timeDown: 'v', timeDown2: 'v' },
  { id: 2, name: 'Project 2', description: 'Description for Project 2', timeVocal: 's', timeDown: 'v', timeDown2: 'v' },
  { id: 3, name: 'Project 3', description: 'Description for Project 3', timeVocal: 's', timeDown: 'v', timeDown2: 'v' },
  { id: 4, name: 'Project 4', description: 'Description for Project 4', timeVocal: 's', timeDown: 'v', timeDown2: 'v' },
  { id: 5, name: 'Project 5', description: 'Description for Project 5', timeVocal: 's', timeDown: 'v', timeDown2: 'v' },
  { id: 6, name: 'Project 6', description: 'Description for Project 6', timeVocal: 's', timeDown: 'v', timeDown2: 'v' },
  // Thêm dữ liệu mẫu nếu cần để kiểm tra cuộn
  { id: 7, name: 'Project 7', description: 'Description for Project 7', timeVocal: 's', timeDown: 'v', timeDown2: 'v' },
  { id: 8, name: 'Project 8', description: 'Description for Project 8', timeVocal: 's', timeDown: 'v', timeDown2: 'v' },
  { id: 8, name: 'Project 8', description: 'Description for Project 8', timeVocal: 's', timeDown: 'v', timeDown2: 'v' },
  { id: 8, name: 'Project 8', description: 'Description for Project 8', timeVocal: 's', timeDown: 'v', timeDown2: 'v' },
  { id: 8, name: 'Project 8', description: 'Description for Project 8', timeVocal: 's', timeDown: 'v', timeDown2: 'v' },
  { id: 8, name: 'Project 8', description: 'Description for Project 8', timeVocal: 's', timeDown: 'v', timeDown2: 'v' },
  { id: 8, name: 'Project 8', description: 'Description for Project 8', timeVocal: 's', timeDown: 'v', timeDown2: 'v' },
  { id: 8, name: 'Project 8', description: 'Description for Project 8', timeVocal: 's', timeDown: 'v', timeDown2: 'v' },
];

// Component hiển thị danh sách projects dưới dạng card
const Projects = () => (
  <div style={{ maxHeight: '800px', overflowY: 'auto', marginTop: '7px' }}> {/* Thêm scroll ở đây */}
    <Grid container spacing={2}>
      {data.map((project) => (
        <Grid item xs={12} sm={6} md={4} key={project.id}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                {project.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {project.description}
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>timeVocal:</strong> {project.timeVocal}
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>timeDown:</strong> {project.timeDown}
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>timeDown2:</strong> {project.timeDown2}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
);

export default Projects;
