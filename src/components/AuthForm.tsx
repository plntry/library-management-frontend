import React, { useEffect } from "react";
import { Link } from "react-router";
import {
  AuthInputData,
  AuthRequestType,
  LoginFormData,
  RegisterFormData,
} from "../models/Auth";
import { useForm } from "react-hook-form";
import logo from "../assets/library-logo.png";
import { useTranslation } from "react-i18next";
import AuthFormInput from "./AuthFormInput";
import { PATHS } from "../routes/paths";

interface AuthFormProps {
  mode: AuthRequestType;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData | LoginFormData>();

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
            id: "username",
            placeholder: t("auth.formData.username"),
            validation: {
              required: t("auth.messages.validation.required", {
                field: t("auth.formData.username"),
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
            id: "first_name",
            placeholder: t("auth.formData.firstName"),
          },
          {
            id: "last_name",
            placeholder: t("auth.formData.lastName"),
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

  const modeToNavigate: "login" | "register" =
    mode === "login" ? "register" : "login";
  const navigateMessage: string = t(
    `auth.messages.${
      modeToNavigate === "login" ? "navigateToLogin" : "navigateToRegister"
    }`
  );

  useEffect(() => {
    return () => {
      reset();
    };
  }, [mode, reset]);

  const onSubmit = async (formData: RegisterFormData | LoginFormData) => {
    console.log("form Data:", formData);
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
            <AuthFormInput
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
            to={`${PATHS.AUTH}?mode=${modeToNavigate}`}
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
