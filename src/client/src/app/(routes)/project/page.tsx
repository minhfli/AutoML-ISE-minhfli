import Card from "@/src/components/ui/card";
import Link from "next/link";
import image_classification from "@/public/classification-object-detection.png";
import tabular_classification from "@/public/tabular_classification.png";
import language_classification from "@/public/language.png";

const Train = () => {
    const cardsData = [
        {
            id: 1,
            logo: image_classification,
            title: "Image Project",
            description: "Teach based on images, from files or your webcam.",
            link: "project/image",
        },
        {
            id: 2,
            logo: tabular_classification,
            title: "Tabular Project",
            description:
                "This type of project involve the analysis and processing of data that is organized into rows and columns, much like in a spreadsheet. Such projects can range from classification, where the goal is to assign labels to data which",
            link: "project/tabular",
        },
        {
            id: 3,
            logo: language_classification,
            title: "Language Project",
            description: "Automatically classify text, extract or even custom your own LLM.",
            link: "project/language",
        },
    ];
    return (
        <div className="flex justify-center items-center h-screen space-x-4 hov overflow-scroll">
            {cardsData.map((card) => (
                <Card key={card.id} title={card.title} description={card.description} logo={card.logo}
                href = {card.link}
                >
                </Card>
            ))}
        </div>
    );
};

export default Train;
