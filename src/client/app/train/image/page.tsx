"use client";
import React, {useEffect, useRef} from "react";
import ClassDivider from "@/components/ui/ClassDivider";

const TrainImage = () => {
    const [classDividers, setClassDividers] = React.useState([
        {key: 1, title: 1},
    ]);
    const currentClass = useRef<number>(1);
    const increaseCount = () => {
        currentClass.current += 1;
        const newCount = currentClass.current;
        setClassDividers((prevDividers) => [
            ...prevDividers,
            {key: newCount, title: newCount},
        ]);
    };

    const deleteItem = (key: number) => {   
        setClassDividers((prevDividers) =>
            prevDividers.filter((item) => item.key !== key)
        );
    }

    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            const message =
                "Are you sure you want to leave? Your changes may be lost.";
            event.returnValue = message;
            return message;
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <div className="mt-auto items-center">
            <div className="mt-40">
                {classDividers.map((classDivider) => (
                    <div key={classDivider.key}>
                        <ClassDivider
                            title={classDivider.title}
                            onRemove={deleteItem}
                        />
                    </div>
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