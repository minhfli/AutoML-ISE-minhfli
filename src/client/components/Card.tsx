"use client";
import React,{ReactNode} from "react";
interface CardProps {
  title: string;
  description: string;
  children?: ReactNode; // Thêm children với kiểu ReactNode
}
const Card: React.FC<CardProps> = ({title,description,children}) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl"  data-theme="lofi">
      <figure>
        <img
          src={new URL(
            "abc.jpg",
            import.meta.url
          ).toString()} alt="Shoes"
        />
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