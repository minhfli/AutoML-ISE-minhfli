"use client";
import React, {useEffect} from "react";
import Card from "@/components/Card";
import Link from "next/link";

const Train = () => {
    const cardsData = [
        {
            id: 1,
            title: "Image Project",
            description: "Teach based on images, from files or your webcam.",
            link: "/train/image",
        },
        {
            id: 2,
            title: "Audio Project",
            description:
                "Teach based on one-second-long sounds, from files or your microphone.",
            link: "/train/audio",
        },
        {
            id: 3,
            title: "Pose Project",
            description: "Teach based on images, from files or your webcam.",
            link: "/train/pose",
        },
    ];
    return (
        <div className="flex justify-center items-center h-screen space-x-4 hov">
            {cardsData.map((card) => (
                <Card key={card.id} title={card.title} description={card.description}>
                    <Link href={card.link}>{card.title}</Link>
                </Card>
            ))}
        </div>
    );
};

export default Train;
