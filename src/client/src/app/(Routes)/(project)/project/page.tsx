"use client";
import React from "react";
import Link from "next/link";

const NewProjectCard: React.FC = () => {
  return (
    <Link
      href="/project/new"
      className="mx-auto w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md hover:bg-gray-50"
    >
      <div className="flex h-full items-center justify-center p-4">
        <div className="flex items-center justify-center space-x-2">
          {" "}
          {/* Container for icon and text */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="text-lg font-semibold">New Project</span>
        </div>
      </div>
    </Link>
  );
};

// Define the type for the ProjectCard props
type ProjectCardProps = {
  title: string;
  status: "SUCCESS" | "ERRORS" | "IN PROGRESS"; // Enumerate possible statuses
  description: string;
  dateUpdated: string;
};

// Define the ProjectCard component with typed props
const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  status,
  description,
  dateUpdated,
}) => {
  // Determine the color based on the status
  const statusClasses = {
    SUCCESS: "bg-green-100 text-green-800",
    ERRORS: "bg-red-100 text-red-800",
    "IN PROGRESS": "bg-yellow-100 text-yellow-800",
  };

  const statusColor = statusClasses[status];

  return (
    <div className="mx-auto w-full overflow-hidden rounded-lg border border-gray-200 bg-white text-center shadow-md">
      <div className="p-5">
        <h5 className="text-lg font-bold tracking-tight text-gray-900">
          {title}
        </h5>
        <div className="mt-1">
          <span
            className={`rounded-full px-2.5 py-0.5 text-sm font-semibold ${statusColor}`}
          >
            {status}
          </span>
        </div>
        <div className="mt-3 text-sm text-gray-500">{description}</div>
        <div className="mt-4 text-xs font-medium text-gray-400">
          Updated {dateUpdated}
        </div>
      </div>
    </div>
  );
};

// Define the type for the ProjectsGrid props
type ProjectsGridProps = {
  projects: Array<{
    id: number;
    title: string;
    status: "SUCCESS" | "ERRORS" | "IN PROGRESS";
    description: string;
    dateUpdated: string;
  }>;
};

// Define the ProjectsGrid component
const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
      <NewProjectCard />
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          status={project.status}
          description={project.description}
          dateUpdated={project.dateUpdated}
        />
      ))}
    </div>
  );
};

// Example usage of ProjectsGrid
const App: React.FC = () => {
  const projectsData: ProjectsGridProps["projects"] = [
    {
      id: 1,
      title: "Project 1",
      status: "SUCCESS",
      description: "This is a description",
      dateUpdated: "2021-01-01",
    },
    {
      id: 2,
      title: "Project 2",
      status: "ERRORS",
      description: "This is a description",
      dateUpdated: "2021-01-01",
    },
    {
      id: 3,
      title: "Project 3",
      status: "IN PROGRESS",
      description: "This is a description",
      dateUpdated: "2021-01-01",
    },
    {
      id: 4,
      title: "Project 4",
      status: "SUCCESS",
      description: "This is a description",
      dateUpdated: "2021-01-01",
    },
    {
      id: 5,
      title: "Project 5",
      status: "ERRORS",
      description: "This is a description",
      dateUpdated: "2021-01-01",
    },

    // ... array of projects with id, title, status, and dateUpdated
  ];

  return <ProjectsGrid projects={projectsData} />;
};

export default App;
