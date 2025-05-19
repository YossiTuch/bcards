import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { TCard } from "../types/TCard";

const CardDetails = () => {
  const [card, setCard] = useState<TCard>();

  const { id } = useParams();

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        );

        setCard(response.data);
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    };

    fetchCardDetails();
  }, [id]);
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-11/12 w-9/12 flex-col items-center justify-start gap-4 border-none bg-gray-100 text-center shadow-2xl">
        <h1 className="mt-10 text-3xl font-bold">{card?.title}</h1>
        <img
          className="h-52 w-72 rounded-md"
          src={card?.image.url}
          alt={card?.image.alt}
        />
        <h2 className="text-2xl font-semibold">{card?.subtitle}</h2>
        <div className="mt-10 flex flex-col gap-4 text-left text-xl">
          <p>
            <b>Email</b>: {card?.email}
          </p>
          <p>
            <b>Phone</b>: {card?.phone}
          </p>
          <p>
            <b>Website</b>: {card?.web}
          </p>
          <p>
            <b>Address</b>: {card?.address.street} {card?.address.country}{" "}
            {card?.address.city}
          </p>
        </div>
      </div>
    </div>
  );
};
export default CardDetails;
