import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormData, UserSchema } from "@/lib/types";
import { SERVER_URL } from "@/lib/helpers/environment";

// TODO: implement oauth login with google and facebook
const LoginButton = () => {
  const [isLogin, setIsLogin] = useState(true);
  const endpoint = isLogin ? "login" : "signup";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/auth/${endpoint}`,
        data
      );
      console.log(response);
      if (response.status === 200) {
        (document.getElementById("login") as HTMLDialogElement).close();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    (document.getElementById("login") as HTMLDialogElement).close();
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <button
        className="btn bg-primary text-secondary w-full"
        onClick={() =>
          (document.getElementById("login") as HTMLDialogElement).showModal()
        }
      >
        Log In / Sign Up
      </button>
      <dialog id="login" className="modal">
        <div className="modal-box bg-white">
          <form
            method="dialog"
            className="space-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <button
              className="btn btn-sm btn-circle btn-ghost absolute text-primary right-2 top-2"
              onClick={handleClose}
            >
              ✕
            </button>
            <div className="text-center">
              <p className="text-2xl font-semibold leading-5 text-primary">
                {isLogin ? "Login to your account" : "Create an account"}
              </p>
              <p className="text-sm leading-4 text-slate-600 mt-2 mb-5">
                {isLogin
                  ? "You must be logged in to perform this action."
                  : "Sign up to get started."}
              </p>
            </div>
            <button className="btn flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md max-w-lg w-full px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
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
              <span>Continue with Google</span>
            </button>
            <button className="btn flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md w-full max-w-lg px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
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
              <span>Continue with Facebook</span>
            </button>
            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div>OR
              <div className="h-px w-full bg-slate-200"></div>
            </div>
            <div className="w-full">
              <div className=" text-accent">E-mail</div>
              <div className="mb-3">
                <input
                  {...register("email")}
                  name="email"
                  type="email"
                  className="block w-full text-black bg-white rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400"
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="text-accent mt-3">Password</div>
              <input
                {...register("password")}
                name="password"
                type="password"
                autoComplete="current-password"
                className="mt-2 block w-full text-black bg-white rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 "
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
              {!isLogin && (
                <div className="text-accent mt-3">Confirm Password</div>
              )}
              {!isLogin && (
                <input
                  {...register("password")}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="mt-2 block w-full text-black bg-white rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 "
                  placeholder="Enter password"
                />
              )}
              {!isLogin && <div className="text-accent mt-3">Phone</div>}
              {!isLogin && (
                <input
                  {...register("phone_number")}
                  name="phone_number"
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  autoComplete="current-password"
                  className="mt-2 block w-full text-black bg-white rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 "
                  placeholder="081 234 5678"
                />
              )}
              {!isLogin && errors.phone_number && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone_number.message}
                </p>
              )}
              <p className="mb-3 mt-2 text-sm text-gray-500 mt-3">
                <a href="/forgot-password" className="text-primary">
                  Reset your password?
                </a>
              </p>
              <button
                type="submit"
                className="btn border-none w-full bg-primary text-secondary"
              >
                {isLogin ? "Log In" : "Sign Up"}{" "}
              </button>
            </div>
            <div className="mt-6 text-center text-sm text-slate-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleForm}
                className="font-medium text-primary ml-1"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default LoginButton;
