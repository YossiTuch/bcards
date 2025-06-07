import { useEffect, useState } from "react";
import { Button, Card, Spinner } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { TCard } from "../types/TCard";
import { joiResolver } from "@hookform/resolvers/joi";
import { CreateCardSchema } from "../validations/createCard.joi";
import { FormField } from "../components/FormField";
import { getCardFields } from "../config/cardFields";

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
    reset,
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

        // Set form values
        setValue("title", card.title);
        setValue("subtitle", card.subtitle);
        setValue("description", card.description);
        setValue("phone", card.phone);
        setValue("email", card.email);
        setValue("web", card.web);
        setValue("imageUrl", card.image.url);
        setValue("imageAlt", card.image.alt);
        setValue("state", card.address.state);
        setValue("country", card.address.country);
        setValue("city", card.address.city);
        setValue("street", card.address.street);
        setValue("houseNumber", card.address.houseNumber.toString());
        setValue("zip", card.address.zip.toString());

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

  const imageUrl = watch("imageUrl");
  useEffect(() => setImagePreview(imageUrl || ""), [imageUrl]);

  const fields = getCardFields(errors);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const headers = getAuthHeaders();
      if (!headers) {
        toast.error("Authorization required");
        return;
      }

      // Transform the data to match the API structure
      const cardData = {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        phone: data.phone,
        email: data.email,
        web: data.web || "",
        image: {
          url: data.imageUrl,
          alt: data.imageAlt,
        },
        address: {
          state: data.state,
          country: data.country,
          city: data.city,
          street: data.street,
          houseNumber: data.houseNumber,
          zip: Number(data.zip),
        },
      };

      await axios.put<TCard>(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        cardData,
        { headers },
      );

      toast.success("Card updated successfully");
      navigate("/my-cards");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to update card";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSection = (fields: any[], columns = 2) => (
    <div className={`grid gap-x-8 gap-y-6 md:grid-cols-${columns}`}>
      {fields.map((field) => (
        <FormField key={field.id} register={register} {...field} />
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
      <Card className="mx-auto max-w-4xl">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center">
            <h1 className="text-4xl font-bold">Edit Business Card</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Update your business card details
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="mb-4 text-xl font-semibold">Card Information</h2>
              {renderSection(fields.cardDetails)}
              {renderSection(fields.info)}
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">Image</h2>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                {fields.image.map((field) => (
                  <div key={field.id}>
                    <FormField register={register} {...field} />
                  </div>
                ))}
                {imagePreview && (
                  <div className="col-span-2 mt-4 flex justify-center rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-40 w-auto object-contain"
                      onError={() => setImagePreview("")}
                    />
                  </div>
                )}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">Location</h2>
              {renderSection(fields.location)}
            </section>

            <div className="flex justify-center gap-4">
              <Button
                type="submit"
                disabled={!isValid || isLoading}
                className="w-44"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" className="mr-3" />
                    Updating...
                  </>
                ) : (
                  "Update Card"
                )}
              </Button>
              <Button
                color="gray"
                onClick={() => navigate("/my-cards")}
                size="lg"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditCard;
