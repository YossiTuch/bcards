import { joiResolver } from "@hookform/resolvers/joi";
import { Button, Card, Spinner } from "flowbite-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { EditProfileSchema } from "../validations/editProfile.joi";
import { FormField } from "../components/FormField";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getEditProfileFields } from "../config/editProfileFields";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";

type FormData = {
  name: { first: string; middle: string; last: string };
  phone: string;
  image: { url: string; alt: string };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    zip: string;
  };
};

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const { user, getAuthHeaders } = useAuth();
    const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: joiResolver(EditProfileSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }    // Reset form with all user data at once
    reset({
      name: {
        first: user.name.first || "",
        middle: user.name.middle || "",
        last: user.name.last || "",
      },
      phone: user.phone || "",
      image: {
        url: user.image?.url || "",
        alt: user.image?.alt || "",
      },
      address: {
        state: user.address?.state || "",
        country: user.address?.country || "",
        city: user.address?.city || "",
        street: user.address?.street || "",
        houseNumber: user.address?.houseNumber?.toString() || "",
        zip: user.address?.zip?.toString() || "",
      },
    });

    setImagePreview(user.image?.url || "");
  }, [user, reset, navigate]);

  useEffect(() => {
    const imageUrl = watch("image.url");
    setImagePreview(imageUrl || "");
  }, [watch("image.url")]);

  const submitForm = async (data: FormData) => {
    try {
      setIsLoading(true);
      const headers = getAuthHeaders();
      if (!headers) return;

      // Create update data with only allowed fields
      const updateData = {
        name: data.name,
        phone: data.phone,
        image: {
          url: data.image.url || user?.image?.url || "",
          alt: data.image.alt || user?.image?.alt || "",
        },
        address: {
          state: data.address.state,
          country: data.address.country,
          city: data.address.city,
          street: data.address.street,
          houseNumber: parseInt(data.address.houseNumber),
          zip: parseInt(data.address.zip)
        }
      };

      const response = await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user?._id}`,
        updateData,
        { headers }
      );

      dispatch(userActions.updateUser(response.data));
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error: any) {
      console.error('Update error:', error.response?.data || error);
      toast.error(error.response?.data?.message || "Update failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderSection = (title: string, fields: any[], columns = 2) => (
    <section>
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      <div className={`grid gap-x-8 gap-y-6 md:grid-cols-${columns}`}>
        {fields.map((field) => (
          <FormField key={field.id} register={register} {...field} />
        ))}
      </div>
    </section>
  );

  const fields = getEditProfileFields(errors);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-900">
      <Card className="mx-auto max-w-6xl">
        <form
          className="flex flex-col gap-8 px-4"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold">Edit Profile</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Update your account information
            </p>
          </div>

          <div className="space-y-10">
            {renderSection("Personal Information", fields.name)}
            {renderSection("Contact Information", fields.contact)}
            <section>
              <h2 className="mb-4 text-xl font-semibold">Profile Image</h2>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                {fields.image.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <FormField register={register} {...field} />
                    {field.id === "image-url" && imagePreview && (
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
            </section>
            {renderSection("Address Information", fields.address)}{" "}
            <section className="flex flex-col items-center gap-8 pt-4">
              <div className="flex gap-6">
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
                    "Update Profile"
                  )}
                </Button>
                <Button
                  color="gray"
                  onClick={() => navigate("/profile")}
                  className="w-36"
                  size="lg"
                >
                  Cancel
                </Button>
              </div>
            </section>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditProfile;
