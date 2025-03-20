import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  APIError,
  AuthInputData,
  AuthRequestType,
  LoginFormData,
  RegisterFormData,
} from "../models/Auth";
import { useForm } from "react-hook-form";
import logo from "../assets/library-logo.png";
import { useTranslation } from "react-i18next";
import FormInput from "./FormInput";
import { PATHS } from "../routes/paths";
import axios, { AxiosError, AxiosResponse } from "axios";
import { authApi } from "../api/auth";
import { useNotification } from "../hooks/useNotification";
import { useAuthStore } from "../store/useAuthStore";
import { jwtDecode } from "jwt-decode";

interface AuthFormProps {
  mode: AuthRequestType;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const { t } = useTranslation();
  const notify = useNotification();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData | LoginFormData>({ mode: "onChange" });
  const { incrementLoginAttempts, resetLoginAttempts, setUser } =
    useAuthStore.getState();
  // const failedLogin = mode === "login" && loginAttempts >= 5;

  const modeToNavigate: "login" | "register" =
    mode === "login" ? "register" : "login";
  const navigateMessage: string = t(
    `auth.messages.${
      modeToNavigate === "login" ? "navigateToLogin" : "navigateToRegister"
    }`
  );

  const formInputs: AuthInputData[] =
    mode === "login"
      ? [
          {
            id: "email",
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
          {
            id: "password",
            type: "password",
            placeholder: t("auth.formData.password"),
            validation: {
              required: t("auth.messages.validation.required", {
                field: t("auth.formData.password"),
              }),
            },
          },
        ]
      : [
          {
            id: "last_name",
            placeholder: t("auth.formData.lastName"),
            validation: {
              required: t("auth.messages.validation.required", {
                field: t("auth.formData.lastName"),
              }),
            },
          },
          {
            id: "first_name",
            placeholder: t("auth.formData.firstName"),
            validation: {
              required: t("auth.messages.validation.required", {
                field: t("auth.formData.firstName"),
              }),
            },
          },
          {
            id: "email",
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
          {
            id: "password",
            type: "password",
            placeholder: t("auth.formData.password"),
            validation: {
              required: t("auth.messages.validation.required", {
                field: t("auth.formData.password"),
              }),
              minLength: {
                value: 8,
                message: t("auth.messages.validation.length.password"),
              },
              validate: {
                onlyLatin: (value: string) => {
                  const nonLatin = /[^\d\s!@#$%^&*(),.?":{}|<>A-Za-z]/.test(
                    value
                  );
                  return !nonLatin || t("auth.messages.validation.latinOnly");
                },
                hasSpecial: (value: string) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  t("auth.messages.validation.specialRequired"),
                hasNumber: (value: string) =>
                  /\d/.test(value) ||
                  t("auth.messages.validation.numberRequired"),
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
              validate: (value) =>
                value === watch("password") ||
                t("auth.messages.validation.confirmPassword"),
            },
          },
        ];

  useEffect(() => {
    return () => {
      reset();
    };
  }, [mode, reset]);

  const onSubmit = async (formData: RegisterFormData | LoginFormData) => {
    const response: AxiosResponse | AxiosError<APIError> =
      mode === "register"
        ? await authApi.register(formData as RegisterFormData)
        : await authApi.login(formData as LoginFormData);

    if (!axios.isAxiosError(response)) {
      if (mode === "register") {
        notify(
          {
            type: "success",
            message: t("notifications.register.success.message"),
            description: t("notifications.register.success.description"),
          },
          5000
        );

        setTimeout(() => {
          navigate(PATHS.AUTH.link);
        }, 5000);
      } else {
        resetLoginAttempts();

        const { access_token, refresh_token } = response.data;
        setUser(jwtDecode(access_token), access_token, refresh_token);

        navigate(PATHS.HOME.link);
      }
    } else {
      if (mode === "login") {
        incrementLoginAttempts();
      }

      notify(
        {
          type: "error",
          message: t(`notifications.${mode}.error.message`),
          description: response.response?.data.detail
            ? response.response.data.detail + ""
            : t(`notifications.${mode}.error.description`),
        },
        5000
      );
    }
  };

  return (
    <div className="flex min-h-screen justify-center bg-base-bg">
      <div className="w-full max-w-md h-full space-y-6 rounded-xl bg-white mx-5 my-5 sm:my-30 p-8 shadow-lg">
        <div className="flex justify-center items-center">
          <img src={logo} alt="Logo" className="max-w-15" />
          <h1 className="text-center text-4xl font-semibold text-primary-500">
            {t("appName")}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {formInputs.map(({ id, type, placeholder, validation }) => (
            <FormInput
              key={id}
              inputProps={{
                ...register(id, validation),
                id,
                type,
                placeholder,
              }}
              errorProp={errors[id as keyof (RegisterFormData | LoginFormData)]}
            />
          ))}

          <button
            type="submit"
            className="w-full rounded-lg bg-primary-400 px-4 py-2 text-white cursor-pointer transition hover:bg-primary-500"
          >
            {t(`auth.${mode}`)}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          {navigateMessage}{" "}
          <Link
            to={`${PATHS.AUTH.link}?mode=${modeToNavigate}`}
            className="text-primary-500 hover:text-primary-600"
          >
            {t(`auth.${modeToNavigate}`)}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
