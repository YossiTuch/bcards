import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { TCard } from "../types/TCard";
import { Button, Card, Spinner } from "flowbite-react";
import { FaHeart, FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { TRootState } from "../store/store";
import { toast } from "react-toastify";

const CardDetails = () => {
  const [card, setCard] = useState<TCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: TRootState) => state.userSlice.user);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`
        );

        if (!response.data) {
          setError("Card not found");
          return;
        }

        setCard(response.data);
      } catch (error: any) {
        const errorMessage = error.response?.status === 404 
          ? "Card not found" 
          : error.response?.data?.message || error.message || "Failed to load card details";

        setError(`Error loading card: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCardDetails();
    } else {
      setError("No card ID provided");
      setIsLoading(false);
    }
  }, [id]);

  const likeOrUnlikeCard = async () => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }
      if (!card) return;

      await axios.patch(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id
      );

      const isLiked = card.likes.includes(user?._id + "");

      setCard({
        ...card,
        likes: isLiked 
          ? card.likes.filter(like => like !== user?._id + "") 
          : [...card.likes, user?._id + ""]
      });
      
      toast.success(isLiked ? "Card unliked successfully" : "Card Liked Successfully");
    } catch (error) {
      toast.error("Failed to update favorite status");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-xl text-red-500">{error || "Card not found"}</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
      <Card className="mx-auto max-w-4xl">        {/* Header Image */}
        <div className="relative -mt-6 -mx-6 mb-6">
          <img
            className="w-full max-h-[600px] object-contain bg-gray-100 dark:bg-gray-700"
            src={card.image.url}
            alt={card.image.alt}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-6 text-white">
            <h1 className="text-3xl font-bold text-shadow">{card.title}</h1>
            <p className="mt-2 text-xl text-shadow">{card.subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <h2 className="mb-3 text-xl font-semibold">About</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">{card.description}</p>

        {/* Contact Information */}
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
                <a href={card.web} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
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
                <span>{card.address.street} {card.address.houseNumber}</span>
              </div>
              <div className="ml-7">
                <p>{card.address.city}, {card.address.state} {card.address.zip}</p>
                <p>{card.address.country}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center border-t mt-6 pt-6">
          <div className="flex items-center gap-2">
            <FaHeart
              onClick={likeOrUnlikeCard}
              className={`cursor-pointer text-2xl ${
                card.likes.includes(user?._id + "")
                  ? "text-red-500 hover:text-red-300"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            />
            <span>{card.likes.length} {card.likes.length === 1 ? 'like' : 'likes'}</span>
          </div>
          <Button color="gray" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CardDetails;
