import { Spinner } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { TCard } from "../types/TCard";
import { joiResolver } from "@hookform/resolvers/joi";
import { CreateCardSchema } from "../validations/createCard.joi";
import { CardForm } from "../components/CardForm";
import { useState, useEffect } from "react";

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

const CreateCard = () => {
  const navigate = useNavigate();
  const { getAuthHeaders } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: joiResolver(CreateCardSchema),
  });

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

      await axios.post<TCard>(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
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

      toast.success("Card created successfully");
      navigate("/my-cards");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create card");
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
        title="Create New Business Card"
        subtitle="Fill in the details for your business card"
        register={register}
        errors={errors}
        isValid={isValid}
        isLoading={isLoading}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        onCancel={() => navigate("/my-cards")}
        submitText="Create Card"
      />
    </form>
  );
};

export default CreateCard;
