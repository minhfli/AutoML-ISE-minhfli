import Card from "@/components/ui/Card";
import Link from "next/link";
import image_classification from "@/public/classification-object-detection.png";
import tabular_classification from "@/public/tabular_classification.png";
import language_classification from "@/public/language.png";
const Train = () => {
    const cardsData = [
        {
            id: 1,
            logo : image_classification,
            title: "Image Project",
            description: "Teach based on images, from files or your webcam.",
            link: "/train/image",
        },
        {
            id: 2,
            logo : tabular_classification,
            title: "Tabular Project",
            description:
                "Classificate, regression, or time series from CSV or Excel files.",
            link: "/train/tabular",
        },
        {
            id: 3,
            logo : language_classification,
            title: "Language Project",
            description: "Automatically classify text, extract or even custom your own LLM.",
            link: "/train/language",
        },
    ];
    return (
        <div className="flex justify-center items-center h-screen space-x-4 hov">
            {cardsData.map((card) => (
                <Card key={card.id} title={card.title} description={card.description} logo={card.logo}>
                    <Link href={card.link} prefetch={true}>{card.title}</Link>
                </Card>
            ))}
        </div>
    );
};

export default Train;
