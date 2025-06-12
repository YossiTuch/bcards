import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { TCard } from "../types/TCard";
import { joiResolver } from "@hookform/resolvers/joi";
import { CreateCardSchema } from "../validations/createCard.joi";
import { CardForm } from "../components/CardForm";

type FormData = {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  imageUrl: string;
  imageAlt: string;
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
};

const EditCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getAuthHeaders } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: joiResolver(CreateCardSchema),
  });

  useEffect(() => {
    const fetchCard = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<TCard>(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        );
        const card = response.data;
        Object.entries({
          title: card.title,
          subtitle: card.subtitle,
          description: card.description,
          phone: card.phone,
          email: card.email,
          web: card.web,
          imageUrl: card.image.url,
          imageAlt: card.image.alt,
          state: card.address.state,
          country: card.address.country,
          city: card.address.city,
          street: card.address.street,
          houseNumber: card.address.houseNumber.toString(),
          zip: card.address.zip.toString(),
        }).forEach(([key, value]) => setValue(key as keyof FormData, value));

        setImagePreview(card.image.url);
      } catch (error) {
        toast.error("Failed to load card details");
        navigate("/my-cards");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCard();
  }, [id, setValue, navigate]);

  useEffect(() => {
    const imageUrl = watch("imageUrl");
    setImagePreview(imageUrl || "");
  }, [watch("imageUrl")]);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const headers = getAuthHeaders();
      if (!headers) {
        toast.error("Authorization required");
        return;
      }

      await axios.put<TCard>(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        {
          ...data,
          web: data.web || "",
          image: { url: data.imageUrl, alt: data.imageAlt },
          address: {
            ...data,
            houseNumber: data.houseNumber,
            zip: Number(data.zip),
          },
        },
        { headers },
      );

      toast.success("Card updated successfully");
      navigate("/my-cards");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update card");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardForm
        title="Edit Business Card"
        subtitle="Update your business card details"
        register={register}
        errors={errors}
        isValid={isValid}
        isLoading={isLoading}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        onCancel={() => navigate("/my-cards")}
        submitText="Update Card"
      />
    </form>
  );
};

export default EditCard;
