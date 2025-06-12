import { Card } from "flowbite-react";
import { FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import { TCard } from "../types/TCard";

interface CardInfoSectionProps {
  card: TCard;
}

export const CardInfoSection = ({ card }: CardInfoSectionProps) => (
  <div className="grid gap-6 md:grid-cols-2">
    <Card>
      <h2 className="mb-3 text-xl font-semibold">Contact Information</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-gray-500" />
          <a href={`mailto:${card.email}`} className="hover:text-blue-500">
            {card.email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <FaPhone className="text-gray-500" />
          <a href={`tel:${card.phone}`} className="hover:text-blue-500">
            {card.phone}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <FaGlobe className="text-gray-500" />
          <a
            href={card.web}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            {card.web}
          </a>
        </div>
      </div>
    </Card>

    <Card>
      <h2 className="mb-3 text-xl font-semibold">Location</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-gray-500" />
          <span>
            {card.address.street} {card.address.houseNumber}
          </span>
        </div>
        <div className="ml-7">
          <p>
            {card.address.city}, {card.address.state} {card.address.zip}
          </p>
          <p>{card.address.country}</p>
        </div>
      </div>
    </Card>
  </div>
);
