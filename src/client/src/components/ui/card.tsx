import Image, { StaticImageData } from "next/image";
import React, { ReactNode } from "react";
import Link from "next/link";

export type CardProps = {
    title: string;
    logo: string | StaticImageData;
    description: string;
    href : string;
    children?: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, children, logo, href }) => {
    return (
        <div className="card w-96 bg-base-100 hover:bg-base-200 hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1" data-theme="lofi">
            <figure>
                <Image src={logo} alt="logo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end font-semibold">
                    {children}
                    <button className="btn"><Link href={href} prefetch={true} className="button">{title}</Link>

                    </button>

                </div>

            </div>
        </div>
    );
};

export default Card;
