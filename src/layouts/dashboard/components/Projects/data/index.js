import React from 'react';

// Dữ liệu mẫu
const data = [
  { id: 1, name: 'Project 1', description: 'Description for Project 1' },
  { id: 2, name: 'Project 2', description: 'Description for Project 2' },
  { id: 3, name: 'Project 3', description: 'Description for Project 3' },
];

// Component hiển thị từng project
const ProjectItem = ({ project }) => (
  <div>
    <h3>{project.name}</h3>
    <p>{project.description}</p>
  </div>
);

// Component hiển thị danh sách projects
const Projects = () => (
  <div>
    <h1>List of Projects</h1>
    {data.map(project => (
      <ProjectItem key={project.id} project={project} />
    ))}
  </div>
);

export default Projects;
