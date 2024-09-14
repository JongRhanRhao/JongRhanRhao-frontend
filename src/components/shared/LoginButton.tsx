import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { SERVER_URL } from "@/lib/variables";
import { useUser } from "@/hooks/useUserStore";
import { LoginSchema, RegisterSchema } from "@/lib/types";

interface FormDataProps {
  user_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number: string;
}
const LoginButton = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser, setIsAuthenticated } = useUser();
  const schema = isLogin ? LoginSchema : RegisterSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    trigger,
  } = useForm<FormDataProps>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const endpoint = isLogin ? "login" : "register";

  const handleAuth = async (data: FormDataProps) => {
    setErrorMessage("");
    try {
      const response = await axios.post(
        `${SERVER_URL}/users/auth/${endpoint}`,
        {
          ...data,
          role: "user",
        }
      );
      if (response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        closeModal();
      }
    } catch (error) {
      setErrorMessage("Invalid credentials.");
    }
  };

  const closeModal = () => {
    setErrorMessage("");
    (document.getElementById("login") as HTMLDialogElement).close();
  };

  const handleOAuthLogin = (provider: "google" | "facebook") => {
    window.location.href = `${SERVER_URL}/users/auth/${provider}`;
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
    reset();
  };

  return (
    <>
      <button
        className="w-full py-3 rounded-md btn bg-primary text-secondary hover:bg-secondary hover:text-primary"
        onClick={() => {
          const dialog = document.getElementById("login") as HTMLDialogElement;
          if (dialog) {
            dialog.showModal();
          }
        }}
      >
        Log In / Sign Up
      </button>

      <dialog id="login" className="modal">
        <div className="p-8 rounded-lg shadow-lg modal-box bg-bg border-secondary/75 border-2">
          <form className="space-y-4" onSubmit={handleSubmit(handleAuth)}>
            <button
              className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>

            <div className="text-center">
              <h2 className="mb-2 text-2xl font-bold text-primary">
                {isLogin ? "Login to your account" : "Create an account"}
              </h2>
              <p className="text-sm text-white">
                {isLogin
                  ? "You must be logged in to continue."
                  : "Sign up to get started."}
              </p>
            </div>
            <button
              onClick={() => handleOAuthLogin("google")}
              className="flex items-center justify-center w-full py-3 text-white rounded-md shadow-sm btn bg-secondary hover:bg-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <svg
                className="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 0 48 48"
                version="1.1"
              >
                <g id="Icons" stroke="none" fill="none">
                  <g
                    id="Color-"
                    transform="translate(-401.000000, -860.000000)"
                  >
                    <g
                      id="Google"
                      transform="translate(401.000000, 860.000000)"
                    >
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      ></path>
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
              Continue with Google
            </button>

            <button
              onClick={() => handleOAuthLogin("facebook")}
              className="flex items-center justify-center w-full py-3 text-white border rounded-md shadow-sm btn bg-secondary hover:bg-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 0 48 48"
                className="w-6 h-6 mr-2"
              >
                <linearGradient
                  id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                  x1="9.993"
                  x2="40.615"
                  y1="9.993"
                  y2="40.615"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#2aa4f4"></stop>
                  <stop offset="1" stopColor="#007ad9"></stop>
                </linearGradient>
                <path
                  fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                  d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                ></path>
                <path
                  fill="#fff"
                  d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                ></path>
              </svg>
              Continue with Facebook
            </button>

            <div className="flex items-center my-4 text-sm gap-2 text-neutral-700">
              <div className="w-full h-px bg-neutral-700"></div>OR
              <div className="w-full h-px bg-neutral-700"></div>
            </div>

            {/* email & pass */}
            <div className="flex flex-col w-full space-y-8">
              {!isLogin && (
                <div className="relative">
                  <input
                    {...register("user_name", {
                      required: "* Username is required",
                    })}
                    type="text"
                    id="username"
                    className="mb-2 block px-2.5 pb-2.5 pt-4 w-full text-sm text-text bg-secondary rounded-lg border border-secondary appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="username"
                    className="absolute text-sm text-text duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-secondary px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Username
                  </label>
                  {errors.user_name && (
                    <p className="text-sm text-red-600">
                      {errors.user_name.message}
                    </p>
                  )}
                </div>
              )}

              {!isLogin && (
                <>
                  <PhoneInput
                    defaultCountry="th"
                    className="w-full"
                    placeholder="+66 81 234 5678"
                    value={watch("phone_number") || ""}
                    onChange={(phone) => {
                      setValue("phone_number", phone);
                    }}
                    onBlur={() => trigger("phone_number")}
                  />
                  {errors.phone_number && (
                    <p className="text-sm text-red-600">
                      {errors.phone_number.message}
                    </p>
                  )}
                </>
              )}

              <div className="relative">
                <input
                  {...register("email", { required: "* Email is required" })}
                  type="email"
                  id="email"
                  className="mb-2 block px-2.5 pb-2.5 pt-4 w-full text-sm text-text bg-secondary rounded-lg border border-secondary appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-text duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-secondary px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  E-mail
                </label>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="relative">
                <input
                  {...register("password", {
                    required: "* Password is required",
                  })}
                  type="password"
                  id="password"
                  className="mb-2 block px-2.5 pb-2.5 pt-4 w-full text-sm text-text bg-secondary rounded-lg border border-secondary appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="mb-2 absolute text-sm text-text duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-secondary px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Password
                </label>
                {errors.password && (
                  <p className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {!isLogin && (
                <div className="relative">
                  <input
                    {...register("confirm_password")}
                    type="password"
                    id="confirm_password"
                    className="mb-2 block px-2.5 pb-2.5 pt-4 w-full text-sm text-text bg-secondary rounded-lg border border-secondary appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="confirm_password"
                    className="absolute text-sm text-text duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-secondary px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Confirm Password
                  </label>
                  {errors.confirm_password && (
                    <p className="text-sm text-red-600">
                      {errors.confirm_password.message}
                    </p>
                  )}
                </div>
              )}
            </div>
            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-lg mt- btn bg-primary text-secondary hover:bg-secondary hover:text-primary"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
            <p className="text-sm text-center text-text">
              {isLogin ? "New here? " : "Already have an account? "}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={toggleForm}
              >
                {isLogin ? "Create an account" : "Login"}
              </button>
            </p>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default LoginButton;
