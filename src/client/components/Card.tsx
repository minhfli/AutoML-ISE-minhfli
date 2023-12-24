import Image, {StaticImageData} from "next/image";
import React, {ReactNode} from "react";

export type CardProps = {
    title: string;
    logo: string | StaticImageData;
    description: string;
    children?: ReactNode;  
}
const Card: React.FC<CardProps> = ({title, description, children, logo}) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl" data-theme="lofi">
            <figure>
                <Image src={logo} alt="logo"/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    {children}
                </div>
            </div>
        </div>
    );
};
export default Card;