import { joiResolver } from "@hookform/resolvers/joi";
import {
  Button,
  Checkbox,
  FloatingLabel,
  HelperText,
  Label,
} from "flowbite-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { RegisterSchema } from "../validations/register.joi";
import { RiResetLeftFill } from "react-icons/ri";

type formData = {
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
const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<formData>({
    defaultValues: {
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
    },
    resolver: joiResolver(RegisterSchema),
    mode: "onChange",
  });

  const submitForm = async (data: formData) => {
    try {
      await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
        data,
      );
      console.log("register Successful");
    } catch (error) {
      console.error("register Failed..", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <form
        className="mt-5 flex w-9/12 flex-col items-center gap-10 rounded-3xl bg-gray-100 p-20 shadow-2xl max-md:mb-20 max-md:gap-10 dark:bg-slate-800"
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className="mb-5 text-center text-4xl">Register</h1>
        <div className="flex w-full flex-wrap justify-center gap-22 max-md:flex-col max-md:content-center max-md:gap-10">
          <div className="flex flex-col">
            <FloatingLabel
              className="w-50 rounded-md"
              id="first-name"
              variant="filled"
              label="first Name"
              type="text"
              {...register("name.first")}
              color={errors.name?.first ? "error" : "default"}
            />
            <HelperText className="w-50 text-left" color="failure">
              {errors.name?.first?.message}
            </HelperText>
          </div>
          <div className="flex flex-col">
            <FloatingLabel
              className="w-50 rounded-md"
              id="middle-name"
              variant="filled"
              label="Middle Name"
              type="text"
              {...register("name.middle")}
              color={errors.name?.middle ? "error" : "default"}
            />
            <HelperText className="w-50 text-left" color="failure">
              {errors.name?.middle?.message}
            </HelperText>
          </div>
          <div className="flex flex-col">
            <FloatingLabel
              className="w-50 rounded-md"
              id="last-name"
              variant="filled"
              label="Last Name"
              type="text"
              {...register("name.last")}
              color={errors.name?.last ? "error" : "default"}
            />
            <HelperText className="w-50 text-left" color="failure">
              {errors.name?.last?.message}
            </HelperText>
          </div>
        </div>
        <div className="flex w-full flex-wrap justify-center gap-22 max-md:flex-col max-md:content-center max-md:gap-10">
          <div className="flex flex-col">
            <FloatingLabel
              className="w-50 rounded-md"
              id="email"
              variant="filled"
              label="Email"
              type="email"
              {...register("email")}
              color={errors.email ? "error" : "default"}
            />
            <HelperText className="w-50 text-left" color="failure">
              {errors.email?.message}
            </HelperText>
          </div>
          <div className="flex flex-col">
            <FloatingLabel
              className="w-50 rounded-md"
              id="password"
              variant="filled"
              label="Password"
              type="password"
              {...register("password")}
              color={errors.password ? "error" : "default"}
            />
            <HelperText className="w-50 text-left" color="failure">
              {errors.password?.message}
            </HelperText>
          </div>
        </div>
        <div className="flex w-full flex-wrap justify-center gap-22 max-md:flex-col max-md:content-center max-md:gap-10">
          <div className="flex flex-col">
            <FloatingLabel
              className="w-50 rounded-md"
              id="phone"
              variant="filled"
              label="Phone"
              type="text"
              {...register("phone")}
              color={errors.phone ? "error" : "default"}
            />
            <HelperText className="w-50 text-left" color="failure">
              {errors.phone?.message}
            </HelperText>
          </div>
          <div className="flex flex-col">
            <FloatingLabel
              className="w-50 rounded-md"
              id="image-url"
              variant="filled"
              label="Image URL"
              type="text"
              {...register("image.url")}
              color={errors.image?.url ? "error" : "default"}
            />
            <HelperText className="w-50 text-left" color="failure">
              {errors.image?.url?.message}
            </HelperText>
          </div>
          <div className="flex flex-col">
            <FloatingLabel
              className="w-50 rounded-md"
              id="image-alt"
              variant="filled"
              label="Image Alt Text"
              type="text"
              {...register("image.alt")}
              color={errors.image?.alt ? "error" : "default"}
            />
            <HelperText className="w-50 text-left" color="failure">
              {errors.image?.alt?.message}
            </HelperText>
          </div>
        </div>
        <div className="flex w-full flex-wrap justify-center gap-22 max-md:flex-col max-md:content-center max-md:gap-10">
          <div className="flex flex-col">
            <FloatingLabel
              className="w-50 rounded-md"
              id="state"
              variant="filled"
              label="State"
              type="text"
              {...register("address.state")}
              color={errors.address?.state ? "error" : "default"}
            />
            <HelperText className="w-50 text-left" color="failure">
              {errors.address?.state?.message}
            </HelperText>
          </div>
          <div className="flex flex-col">
            <FloatingLabel
              className="w-50 rounded-md"
              id="country"
              variant="filled"
              label="Country"
              type="text"
              {...register("address.country")}
              color={errors.address?.country ? "error" : "default"}
            />
            <HelperText className="w-50 text-left" color="failure">
              {errors.address?.country?.message}
            </HelperText>
          </div>
          <div className="flex flex-col">
            <FloatingLabel
              className="w-50 rounded-md"
              id="city"
              variant="filled"
              label="City"
              type="text"
              {...register("address.city")}
              color={errors.address?.city ? "error" : "default"}
            />
            <HelperText className="w-50 text-left" color="failure">
              {errors.address?.city?.message}
            </HelperText>
          </div>
        </div>
        <div className="flex w-full flex-wrap justify-center gap-22 max-md:flex-col max-md:content-center max-md:gap-10">
          <div className="flex flex-col">
            <FloatingLabel
              className="w-50 rounded-md"
              id="street"
              variant="filled"
              label="Street"
              type="text"
              {...register("address.street")}
              color={errors.address?.street ? "error" : "default"}
            />
            <HelperText className="w-50 text-left" color="failure">
              {errors.address?.street?.message}
            </HelperText>
          </div>
          <div className="flex flex-col">
            <FloatingLabel
              className="w-50 rounded-md"
              id="house-number"
              variant="filled"
              label="House Number"
              type="text"
              {...register("address.houseNumber")}
              color={errors.address?.houseNumber ? "error" : "default"}
            />
            <HelperText className="w-50 text-left" color="failure">
              {errors.address?.houseNumber?.message}
            </HelperText>
          </div>
          <div className="flex flex-col">
            <FloatingLabel
              className="w-50 rounded-md"
              id="zip"
              variant="filled"
              label="ZIP Code"
              type="text"
              {...register("address.zip")}
              color={errors.address?.zip ? "error" : "default"}
            />
            <HelperText className="w-50 text-left" color="failure">
              {errors.address?.zip?.message}
            </HelperText>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="is-business"
            {...register("address.isBusiness")}
            className="size-5 h-4 w-4 rounded border-gray-400 text-blue-600 focus:ring-blue-500"
          />
          <Label
            htmlFor="is-business"
            className="text-xl font-medium text-gray-700"
          >
            Is Business
          </Label>
        </div>
        <Button
          className="w-[50%] max-md:w-50"
          disabled={!isValid}
          type="submit"
        >
          Submit
        </Button>
        <Button
          className="gap-3 bg-amber-500 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-700"
          onClick={() => reset()}
        >
          <RiResetLeftFill size={20} />
          <span>Reset</span>
        </Button>
      </form>
    </div>
  );
};

export default Register;
