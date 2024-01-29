"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import httpStatusCode from "@/src/app/errors/httpStatusCode";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

type RunCardProps = {
    id: string;
    name: string;
    status: "SUCCESS" | "ERRORS" | "IN PROGRESS";
    val_accuracy: string;
};

const RunCard: React.FC<RunCardProps> = ({
    id,
    name,
    status,
    val_accuracy,
}) => {
    const statusClasses = {
        SUCCESS: "bg-green-100 text-green-800",
        ERRORS: "bg-red-100 text-red-800",
        "IN PROGRESS": "bg-yellow-100 text-yellow-800",
    };

    const statusColor = statusClasses[status];
    const route = useRouter();
    const pathname = usePathname();
    const project_id = pathname.split("/")[2];

    const handleCardClick = () => {
        if (status === "SUCCESS") {

            localStorage.setItem("runName", name);
            route.push(`/projects/${project_id}/ImageClassification/predict`);
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
                <div className="mt-3 text-sm text-gray-500">{val_accuracy}</div>
            </div>
        </div>
    );
};

type RunsGridProps = {
    runs: Array<{
        id: string;
        name: string;
        status: "SUCCESS" | "ERRORS" | "IN PROGRESS";
        val_accuracy: string;
    }>;
};

const RunsGrid: React.FC<RunsGridProps> = ({ runs }) => {
    return (
        <div className="h-full overflow-y-auto px-4 py-4">
            <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
                {runs.map((run) => (
                    <RunCard
                        key={run.id}
                        id={run.id}
                        name={run.name}
                        status={run.status}
                        val_accuracy={run.val_accuracy}
                    />
                ))}
            </div>
        </div>
    );
};

const App: React.FC = () => {
    const [runsData, setRunsData] = useState<
        RunsGridProps["runs"]
    >([]);
    const pathname = usePathname();
    const project_id = pathname.split("/")[2];

    useEffect(() => {
        const getRuns = async () => {
            try {
                const response = await axios.post("/api/runs/getAllRun", {
                    project_id : project_id,
                });
                if (response.status === httpStatusCode.OK) {
                    const runs = response.data;
                    setRunsData(runs);
                } else {
                    toast.error(`Unexpected response status: ${response.status}`);
                }
            } catch (error: any) {
                console.error("An unexpected error occurred:", error);
            }
        }
        getRuns();
    }, []);

    return (
        <RunsGrid runs={runsData} />
    )
};

export default App;
