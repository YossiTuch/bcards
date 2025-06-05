import { joiResolver } from "@hookform/resolvers/joi";
import { Button, Card, Checkbox, Label, Spinner } from "flowbite-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { RegisterSchema } from "../validations/register.joi";
import { RiResetLeftFill } from "react-icons/ri";
import { FormField } from "../components/FormField";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getRegisterFields } from "../config/registerFields";

type FormData = {
  name: { first: string; middle: string; last: string };
  phone: string;
  email: string;
  password: string;
  image: { url: string; alt: string };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    zip: string;
    isBusiness: boolean;
  };
};

const defaultValues: FormData = {
  name: { first: "", middle: "", last: "" },
  phone: "",
  email: "",
  password: "",
  image: { url: "", alt: "" },
  address: {
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    isBusiness: false,
  },
};

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues,
    resolver: joiResolver(RegisterSchema),
    mode: "onChange",
  });

  const imageUrl = watch("image.url");
  useEffect(() => setImagePreview(imageUrl || ""), [imageUrl]);

  const fields = getRegisterFields(errors);

  const submitForm = async (data: FormData) => {
    try {
      setIsLoading(true);
      await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
        data,
      );
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed..", error);
      toast.error("Registration failed. Please try again.");
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

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-900">
      <Card className="mx-auto max-w-6xl">
        <form
          className="flex flex-col gap-8 px-4"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold">Register</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Create your account to get started
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

            {renderSection("Address Information", fields.address)}

            <section className="flex flex-col items-center gap-8 pt-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="is-business"
                  {...register("address.isBusiness")}
                  className="h-5 w-5 rounded border-gray-300"
                />
                <Label htmlFor="is-business" className="text-lg font-medium">
                  Register as Business Account
                </Label>
              </div>

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
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
                <Button
                  color="warning"
                  onClick={() => reset()}
                  className="w-36"
                  size="lg"
                >
                  <RiResetLeftFill size={20} className="mr-2" />
                  Reset
                </Button>
              </div>
            </section>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Register;
