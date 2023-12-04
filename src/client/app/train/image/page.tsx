"use client"
import React, { useEffect } from "react";
import ClassDivider from "@/components/ClassDivider";

const TrainImage = () => {
    const [classDividers, setClassDividers] = React.useState([
        <ClassDivider key={1} title={1} />,
    ]);

    const increaseCount = () => {
        const newCount = classDividers.length + 1;
        setClassDividers((prevDividers) => [
            ...prevDividers,
            <ClassDivider key={newCount} title={newCount} />,
        ]);
    };


    const decreaseCount = () => {
        const newCount = classDividers.length - 1;
        setClassDividers((prevDividers) => [
            ...prevDividers,
            <ClassDivider key={newCount} title={newCount} />,
        ]);
    }

    useEffect(() => {
        const handleBeforeUnload = (event : any) => {
            const message = "Are you sure you want to leave? Your changes may be lost.";
            event.returnValue = message;
            return message;
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <>
            {classDividers.map((classDivider) => (
                <div key={classDivider.key}>
                    {classDivider}
                </div>
            ))}
            <button
                onClick={increaseCount}
                className="btn btn-ghost flex w-1/4 h-20 card bg-base-300 rounded-box ml-40 mb-5 items-center justify-center"
            >
                <h2 className="card-title">Add a Class</h2>
            </button>
        </>
    );
};

export default TrainImage;
