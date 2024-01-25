"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import httpStatusCode from "@/src/app/errors/httpStatusCode";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const NewProjectCard: React.FC = () => {
  return (
    <Link
      href="/projects/new"
      className="mx-auto w-full rounded-lg border border-gray-200 bg-white shadow-md hover:bg-gray-50"
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
  id: string;
  name: string;
  status: "SUCCESS" | "ERRORS" | "IN PROGRESS"; // Enumerate possible statuses
  description: string;
  updated_at: string;
};

// Define the ProjectCard component with typed props
const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  status,
  description,
  updated_at,
}) => {
  // Determine the color based on the status
  const statusClasses = {
    SUCCESS: "bg-green-100 text-green-800",
    ERRORS: "bg-red-100 text-red-800",
    "IN PROGRESS": "bg-yellow-100 text-yellow-800",
  };

  const statusColor = statusClasses[status];
  const route = useRouter();

  const handleCardClick = () => {
    // khong hieu sao dung Link bi loi css
    // them task field sau nay, default : ImageClassification
    if (status === "IN PROGRESS") {
      route.push(`/projects/${id}/ImageClassification/data`);
    } else if (status === "SUCCESS") {
      route.push(`/projects/${id}/ImageClassification/predict`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="mx-auto w-full rounded-lg border border-gray-200 bg-white text-center shadow-md hover:bg-gray-50"
    >
      <div className="p-5">
        <h5 className="text-lg font-bold tracking-tight text-gray-900">
          {name}
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
          Updated {updated_at}
        </div>
      </div>
    </div>
  );
};

// Define the type for the ProjectsGrid props
type ProjectsGridProps = {
  projects: Array<{
    id: string;
    name: string;
    status: "SUCCESS" | "ERRORS" | "IN PROGRESS";
    description: string;
    updated_at: string;
  }>;
};

// Define the ProjectsGrid component
const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  return (
    <div className="h-full overflow-y-auto px-4 py-4">
      <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        <NewProjectCard />
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            status={project.status}
            description={project.description}
            updated_at={project.updated_at}
          />
        ))}
      </div>
    </div>
  );
};

// Example usage of ProjectsGrid
const App: React.FC = () => {
  const [projectsData, setProjectsData] = useState<
    ProjectsGridProps["projects"]
  >([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await axios.post("/api/projects/getAllProject");
        if (response.status === httpStatusCode.OK) {
          const projects = response.data;
          setProjectsData(projects);
        } else {
          toast.error(`Unexpected response status: ${response.status}`);
        }
      } catch (error : any) {
        console.error("An unexpected error occurred:", error);
      }
    }
    getProjects();
  }, []);

  return (
    <ProjectsGrid projects={projectsData} />
  )
};

export default App;
