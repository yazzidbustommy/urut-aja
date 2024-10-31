import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";

const ResultCard = ({ image, name, age, experience, price }) => {
  return (
    <>
      <Card isHoverable className="max-w-xs">
        <CardHeader>
          <img
            src={image}
            alt={name}
            className="h-48 w-full object-cover rounded-lg"
          />
        </CardHeader>
        <CardBody>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Age:</strong> {age}
          </p>
          <p>
            <strong>Time Experience:</strong> {experience}
          </p>
          <p className="font-bold mt-2 text-center text-3xl">Rp {price}.-</p>
          <Button className="bg-lime-800 hover:bg-lime-600 text-gray-100 font-bold py-2 px-4 mt-4 w-full">
            Choose
          </Button>
        </CardBody>
      </Card>
    </>
  );
};

export default ResultCard;
