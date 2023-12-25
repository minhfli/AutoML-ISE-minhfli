"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ClassDivider from "@/components/ui/ClassDivider";

const TrainImage = () => {
    const [classDividers, setClassDividers] = useState([{ key: 1, title: 1 }, { key: 2, title: 2 }]);
    const currentClass = useRef(2);

    const increaseCount = useCallback(() => {
        currentClass.current += 1;
        setClassDividers((prevDividers) => [
            ...prevDividers,
            { key: currentClass.current, title: currentClass.current },
        ]);
    }, []);

    const deleteItem = useCallback((key : any) => {
        setClassDividers((prevDividers) =>
            prevDividers.filter((item) => item.key !== key)
        );
    }, []);

    useEffect(() => {
        const handleBeforeUnload = (event : any) => {
            event.returnValue = "Are you sure you want to leave? Your changes may be lost.";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);

    return (
        <div className="mt-auto items-center">
            <div className="mt-40">
                {classDividers.map((classDivider) => (
                    <ClassDivider
                        key={classDivider.key}
                        title={classDivider.title}
                        onRemove={deleteItem}
                    />
                ))}
                <button
                    onClick={increaseCount}
                    className="btn btn-ghost flex w-1/4 h-20 card bg-base-300 rounded-box ml-40 mb-5 items-center justify-center"
                >
                    <h2 className="card-title">Add a Class</h2>
                </button>
            </div>
        </div>
    );
};

export default TrainImage;
