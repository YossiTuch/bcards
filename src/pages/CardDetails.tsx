import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { TCard } from "../types/TCard";
import { Button, Card, Spinner } from "flowbite-react";
import { FaHeart, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { CardHeader } from "../components/CardHeader";
import { CardInfoSection } from "../components/CardInfoSection";

const CardDetails = () => {
  const [card, setCard] = useState<TCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, requireAuth, getAuthHeaders } = useAuth();

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        );
        setCard(response.data || null);
      } catch (error: any) {
        setError(
          error.response?.status === 404
            ? "Card not found"
            : "Failed to load card details",
        );
      } finally {
        setIsLoading(false);
      }
    };

    id ? fetchCardDetails() : setError("No card ID provided");
  }, [id]);

  const likeOrUnlikeCard = async () => {
    try {
      if (!card || !requireAuth("Please login to like cards")) return;
      const headers = getAuthHeaders();
      if (!headers) return;

      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`,
        {},
        { headers },
      );

      const isLiked = card.likes.includes(user!._id);
      setCard((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          likes: isLiked
            ? prev.likes.filter((like) => like !== user!._id)
            : [...prev.likes, user!._id],
        };
      });

      toast.success(
        isLiked ? "Card unliked successfully" : "Card liked successfully",
      );
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
      <Card className="mx-auto max-w-4xl">
        <CardHeader card={card} />
        <h2 className="mb-3 text-xl font-semibold">About</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          {card.description}
        </p>
        <CardInfoSection card={card} />
        <div className="mt-6 flex items-center justify-between border-t pt-6">
          <div className="flex items-center gap-2">
            <FaHeart
              onClick={likeOrUnlikeCard}
              className={`cursor-pointer text-2xl ${
                card.likes.includes(user?._id + "")
                  ? "text-red-500 hover:text-red-300"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            />
            <span>
              {card.likes.length} {card.likes.length === 1 ? "like" : "likes"}
            </span>
          </div>
          {user && card.user_id === user._id && (
            <FaEdit
              onClick={() => navigate(`/edit-card/${card._id}`)}
              className="cursor-pointer text-2xl text-gray-500 hover:text-gray-700"
            />
          )}
          <Button color="gray" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CardDetails;
