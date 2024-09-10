import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { SERVER_URL } from "@/lib/variables";
import { useUser } from "@/hooks/useUserStore";

type FormData = {
  user_name: string;
  email: string;
  password: string;
  phone_number: string;
  role: string;
  confirm_password: string;
};

const LoginButton = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser, setIsAuthenticated } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    mode: "onSubmit",
  });

  const handleAuth = async (data: FormData) => {
    setErrorMessage("");
    const endpoint = isLogin ? "login" : "register";
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
      setErrorMessage(
        axios.isAxiosError(error)
          ? `Error: ${error.response?.data}`
          : `Unknown error: ${error}`
      );
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
        className="btn bg-primary text-white w-full py-3 rounded-md"
        onClick={() =>
          (document.getElementById("login") as HTMLDialogElement).showModal()
        }
      >
        Log In / Sign Up
      </button>

      <dialog id="login" className="modal">
        <div className="modal-box bg-bg rounded-lg shadow-lg p-8 border-primary/30 border-2">
          <form
            method="dialog"
            className="space-y-4"
            onSubmit={handleSubmit(handleAuth)}
          >
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary mb-2">
                {isLogin ? "Login to your account" : "Create an account"}
              </h2>
              <p className="text-sm text-text">
                {isLogin
                  ? "You must be logged in to continue."
                  : "Sign up to get started."}
              </p>
            </div>

            {errorMessage && (
              <p className="text-red-600 text-center">{errorMessage}</p>
            )}

            <button
              onClick={() => handleOAuthLogin("google")}
              className="btn bg-secondary flex items-center justify-center rounded-md w-full py-3 hover:bg-opacity-50 text-text shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <svg
                className="h-6 w-6 mr-2"
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
              className="btn bg-secondary flex items-center justify-center border rounded-md w-full py-3 text-text shadow-sm hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                version="1.1"
              >
                <g id="Icons" stroke="none" fill="none">
                  <g
                    id="Color-"
                    transform="translate(-200.000000, -160.000000)"
                    fill="#4460A0"
                  >
                    <path
                      d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z"
                      id="Facebook"
                    ></path>
                  </g>
                </g>
              </svg>
              Continue with Facebook
            </button>

            <div className="flex items-center gap-2 text-sm my-4">
              <div className="h-px w-full bg-text"></div>OR
              <div className="h-px w-full bg-text"></div>
            </div>

            {/* email & pass login */}
            <div className="w-full space-y-3 flex flex-col">
              {!isLogin && (
                <>
                  <label className="text-text">Username</label>
                  <input
                    {...register("user_name", {
                      required: "* Username is required",
                    })}
                    type="text"
                    className="input bg-secondary"
                    placeholder="Enter username"
                  />
                  {errors.user_name && (
                    <p className="text-sm text-red-600">
                      {errors.user_name.message}
                    </p>
                  )}
                </>
              )}

              <label className="text-text">E-mail</label>
              <input
                {...register("email", { required: "* Email is required" })}
                type="email"
                className="input bg-secondary"
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}

              <label className="text-text">Password</label>
              <input
                {...register("password", {
                  required: "* Password is required",
                })}
                type="password"
                className="input bg-secondary"
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}

              {!isLogin && (
                <>
                  <label className="text-text">Confirm Password</label>
                  <input
                    {...register("confirm_password", {
                      required: "* Please confirm your password",
                    })}
                    type="password"
                    className="input bg-secondary"
                    placeholder="Confirm password"
                  />
                  {errors.confirm_password && (
                    <p className="text-sm text-red-600">
                      {errors.confirm_password.message}
                    </p>
                  )}
                </>
              )}
            </div>

            <button
              type="submit"
              className="btn w-full bg-primary text-white py-3 rounded-lg"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>

            <p className="text-center text-sm text-text">
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
