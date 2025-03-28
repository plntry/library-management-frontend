import { useForm, FieldError, RegisterOptions } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormInput from "./FormInput";
import { useEffect } from "react";
import { authApi } from "../api/auth";
import { useNotification } from "../hooks/useNotification";
import { useNavigate } from "react-router";
import { PATHS } from "../routes/paths";
import axios from "axios";
import {
  RequestResetPasswordFormData,
  ResetPasswordFormData,
} from "../models/Auth";
import { jwtDecode } from "jwt-decode";
import GoBackButton from "./GoBackButton";

type FormData = RequestResetPasswordFormData | ResetPasswordFormData;

interface FormInput {
  id: string;
  type: string;
  placeholder: string;
  validation: RegisterOptions<FormData, keyof FormData>;
}

interface DecodedToken {
  sub: string; // email
  exp: number;
}

const ResetPasswordForm: React.FC<{
  mode?: "requestPasswordReset" | "resetPassword";
  token?: string;
}> = ({ mode = "requestPasswordReset", token }) => {
  const { t } = useTranslation();
  const notify = useNotification();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [mode, reset]);

  const requestResetInputs: FormInput[] = [
    {
      id: "email",
      type: "email",
      placeholder: t("auth.formData.email"),
      validation: {
        required: t("auth.messages.validation.required", {
          field: t("auth.formData.email"),
        }),
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: t("auth.messages.validation.format.email"),
        },
      },
    },
  ];

  const resetPasswordInputs: FormInput[] = [
    {
      id: "password",
      type: "password",
      placeholder: t("auth.messages.passwordReset.newPassword"),
      validation: {
        required: t("auth.messages.validation.required", {
          field: t("auth.formData.password"),
        }),
        minLength: {
          value: 8,
          message: t("auth.messages.validation.length.password"),
        },
        validate: {
          noSpaces: (value: string) =>
            !/\s/.test(value) ||
            t("auth.messages.validation.noSpaces", {
              field: t("auth.formData.password"),
            }),
          onlyLatin: (value: string) => {
            const nonLatin = /[^\d!@#$%^&*(),.?":{}|<>A-Za-z]/.test(value);
            return !nonLatin || t("auth.messages.validation.latinOnly");
          },
          hasLatin: (value: string) =>
            /[A-Za-z]/.test(value) ||
            t("auth.messages.validation.latinRequired"),
          hasSpecial: (value: string) =>
            /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
            t("auth.messages.validation.specialRequired"),
          hasNumber: (value: string) =>
            /\d/.test(value) || t("auth.messages.validation.numberRequired"),
        },
      },
    },
    {
      id: "confirm",
      type: "password",
      placeholder: t("auth.formData.confirmPassword"),
      validation: {
        required: t("auth.messages.validation.required", {
          field: t("auth.formData.confirmPassword"),
        }),
        validate: (value: string) =>
          value === watch("password") ||
          t("auth.messages.validation.confirmPassword"),
      },
    },
  ];

  const formInputs =
    mode === "requestPasswordReset" ? requestResetInputs : resetPasswordInputs;

  const successNotification = {
    type: "success" as const,
    message: t(`notifications.${mode}.success.message`),
    description: t(`notifications.${mode}.success.description`),
  };

  const errorNotification = {
    type: "error" as const,
    message: t(`notifications.${mode}.error.message`),
    description: t(`notifications.${mode}.error.description`),
  };

  const handleFormSubmit = async (formData: FormData) => {
    try {
      if (mode === "requestPasswordReset") {
        const response = await authApi.requestResetPassword(formData.email);
        if (!axios.isAxiosError(response)) {
          notify(successNotification, 5000);
          setTimeout(() => {
            navigate(PATHS.AUTH.link);
          }, 5000);
        } else {
          notify(
            {
              ...errorNotification,
              description: response.response?.data.detail
                ? response.response.data.detail
                : errorNotification.description,
            },
            5000
          );
        }
      } else {
        if (!token) {
          notify(errorNotification, 5000);
          return;
        }

        try {
          const decodedToken = jwtDecode<DecodedToken>(token);
          const resetData = formData as ResetPasswordFormData;
          const response = await authApi.resetPassword(
            decodedToken.sub,
            resetData.password,
            resetData.confirm
            // token
          );
          if (!axios.isAxiosError(response)) {
            notify(errorNotification, 5000);
            setTimeout(() => {
              navigate(PATHS.AUTH.link);
            }, 5000);
          } else {
            notify(
              {
                ...errorNotification,
                description: response.response?.data.detail
                  ? response.response.data.detail
                  : errorNotification.description,
              },
              5000
            );
          }
        } catch {
          notify(errorNotification, 5000);
        }
      }
    } catch {
      notify(
        {
          type: "error",
          message: t("notifications.default.error.message"),
          description: t("notifications.default.error.description"),
        },
        5000
      );
    }
  };

  return (
    <div className="flex min-h-screen justify-center bg-base-bg">
      <div className="w-full max-w-md h-full space-y-6 rounded-xl bg-white mx-5 my-5 sm:my-30 p-8 shadow-lg">
        <div className="flex justify-center items-center">
          <h1 className="text-center text-3xl font-semibold text-primary-500">
            {t(`auth.messages.passwordReset.${mode}`)}
          </h1>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {formInputs.map(({ id, type, placeholder, validation }) => (
            <FormInput
              key={id}
              inputProps={{
                ...register(id as keyof FormData, validation),
                id,
                type,
                placeholder,
              }}
              errorProp={errors[id as keyof FormData] as FieldError}
            />
          ))}
          <button type="submit" className="w-full button button--primary">
            {t("additionalButtons.send")}
          </button>
        </form>
        {mode === "requestPasswordReset" && (
          <div className="flex gap-0 w-full justify-center items-center">
            {t("additionalButtons.orGoBack")} <GoBackButton styled={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
