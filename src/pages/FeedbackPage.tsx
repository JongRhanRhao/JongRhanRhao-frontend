import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslation } from "react-i18next";

import { CUSTOM_BUTTON_CLASS } from "@/lib/variables";
import { zodResolver } from "@hookform/resolvers/zod";

type FeedbackProps = {
  name?: string;
  email?: string;
  message?: string;
  onClick?: () => void;
};
//TODO: implement feedback data submission
const FeedbackPage: React.FC<FeedbackProps> = () => {
  const titleClass = "mt-4 text-text font-semibold text-sm";
  const inputClass =
    "mt-2 input text-sm bg-secondary text-text placeholder-text/50 w-full";

  const { t } = useTranslation();

  const feedbackSchema = z.object({
    name: z.string().nonempty({ message: "* Name is required" }),
    email: z.string().email(),
    message: z.string().nonempty({ message: "* Message is required" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackProps>({
    resolver: zodResolver(feedbackSchema),
  });
  const onSubmit = (data: FeedbackProps) => {
    console.log(data);
  };

  return (
    <div className="flex w-4/5 min-w-full mx-auto">
      <div className="w-1/2 card card-body bg-secondary/30">
        <div>
          <h1 className="text-3xl font-bold text-text">
            {t("Customer Feedback")}
          </h1>
          <p className="mt-2 text-sm text-text/50">
            {t("Thank you for using our service. Please leave us a feedback.")}
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="https://formsubmit.co/el/rokase"
            method="POST"
            className="mt-10"
          >
            <div className={titleClass}>
              {t("Name")} <span className="text-rose-500">*</span>
            </div>
            <input
              {...register("name")}
              type="text"
              className={inputClass}
              placeholder={t("Enter your full name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
            <div className={titleClass}>
              {t("E-mail")} <span className="text-rose-500">*</span>
            </div>
            <input
              {...register("email")}
              type="email"
              className={inputClass}
              placeholder={t("Enter your email address")}
            />
            <div className={titleClass}>{t("Message")}</div>
            <textarea
              {...register("message")}
              name="message"
              id="message"
              className="w-full mt-2 text-sm textarea textarea-lg bg-secondary text-text placeholder-text/50"
              placeholder={t("Write your message...")}
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.message.message}
              </p>
            )}
            <button
              type="submit"
              className={`w-fit mt-4 ${CUSTOM_BUTTON_CLASS}`}
            >
              {t("Submit Feedback")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
