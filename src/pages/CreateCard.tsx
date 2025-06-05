import { Button, Card, Label, Textarea, Spinner } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { TCard } from "../types/TCard";
import { joiResolver } from "@hookform/resolvers/joi";
import { CreateCardSchema } from "../validations/createCard.joi";
import { useState, useEffect } from "react";
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
    reset,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: joiResolver(CreateCardSchema),
  });

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

      await axios.post<TCard>(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        cardData,
        { headers },
      );

      toast.success("Card created successfully");
      reset();
      navigate("/my-cards");
    } catch (error: any) {
      console.error("Error creating card:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create card";
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

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-900">
      <Card className="mx-auto max-w-6xl">
        <form
          className="flex flex-col gap-8 px-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold">Create New Business Card</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Fill in the details for your business card
            </p>
          </div>

          <div className="space-y-8">
            {renderSection(fields.cardDetails)}

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                className="resize-none"
                {...register("description")}
                color={errors.description ? "failure" : "gray"}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {renderSection(fields.contact, 3)}

            <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
              {fields.image.map((field) => (
                <div key={field.id}>
                  <FormField register={register} {...field} />
                  {field.id === "imageUrl" && imagePreview && (
                    <div className="mt-4 flex justify-center rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-40 w-auto object-contain"
                        onError={() => setImagePreview("")}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {renderSection(fields.address, 3)}

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={!isValid || isLoading}
                className="w-44"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" className="mr-3" />
                    Creating...
                  </>
                ) : (
                  "Create Card"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateCard;
