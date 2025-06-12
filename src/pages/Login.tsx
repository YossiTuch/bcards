import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel, HelperText, Checkbox } from "flowbite-react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../validations/login.joi";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { TToken } from "../types/TToken";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

type formData = { email: string; password: string };
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<formData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: joiResolver(LoginSchema),
    mode: "onChange",
  });

  const submitForm = async (data: formData) => {
    try {
      const token = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        data,
      );

      if (rememberMe) {
        localStorage.setItem("token", token.data);
      } else {
        sessionStorage.setItem("token", token.data);
      }

      const parsedToken = jwtDecode(token.data) as TToken;

      axios.defaults.headers.common["x-auth-token"] = token.data;

      const res = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" +
          parsedToken._id,
      );

      dispatch(userActions.login(res.data));
      toast.success("Logged in Successfully");
      navigate("/profile");
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <form
        className="flex w-2/6 flex-col items-center gap-6 rounded-3xl bg-gray-100 p-20 shadow-2xl max-md:w-11/12 dark:bg-slate-800"
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className="mb-5 text-center text-4xl">Login</h1>
        <FloatingLabel
          className="w-80 rounded-md"
          id="email"
          variant="filled"
          label="Email"
          {...register("email")}
          color={errors.email ? "error" : "default"}
        />
        <HelperText className="w-80 text-left" color="failure">
          {errors.email?.message}
        </HelperText>
        <FloatingLabel
          className="w-80 rounded-md"
          id="password"
          variant="filled"
          label="Password"
          type="password"
          {...register("password")}
          color={errors.password ? "error" : "default"}
        />
        <HelperText className="w-80 text-left" color="failure">
          {errors.password?.message}
        </HelperText>
        <div className="flex w-80 items-center">
          <Checkbox
            id="remember"
            className="rounded-full border-black"
            color="blue"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember" className="ml-2 text-sm">
            Remember me
          </label>
        </div>
        <Button className="w-80" disabled={!isValid} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
