import React from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/library-logo.png";
import { useTranslation } from "react-i18next";
import FormInput from "./FormInput";
import { useNotification } from "../hooks/useNotification";
import {
  Book,
  BookInputData,
  BookStatus,
  BookCreateUpdateData,
} from "../models/Book";
import { booksApi } from "../api/books";
import { handleAxiosRequest } from "../utils/axiosUtils";

const BookForm: React.FC<{ book?: Book }> = ({ book }) => {
  const { t } = useTranslation();
  const notify = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookCreateUpdateData>({
    mode: "onChange",
    defaultValues: book || {},
  });

const mode = book ? "update" : "create";

const formInputs: BookInputData[] = [
  {
    id: "title",
    placeholder: t("book.title"),
    validation: {
      required: t("auth.messages.validation.required", {
        field: t("book.title"),
      }),
    },
  },
  {
    id: "description",
    type: "textarea",
    placeholder: t("book.description"),
    validation: {
      required: t("auth.messages.validation.required", {
        field: t("book.description"),
      }),
    },
  },
  {
    id: "author",
    placeholder: t("book.author"),
    validation: {
      required: t("auth.messages.validation.required", {
        field: t("book.author"),
      }),
    },
  },
  {
    id: "genre",
    placeholder: t("book.genre"),
    validation: {
      required: t("auth.messages.validation.required", {
        field: t("book.genre"),
      }),
    },
  },
  {
    id: "language",
    placeholder: t("book.language"),
    validation: {
      required: t("auth.messages.validation.required", {
        field: t("book.language"),
      }),
    },
  },
  {
    id: "publication_year",
    placeholder: t("book.publicationYear"),
    validation: {
      required: t("auth.messages.validation.required", {
        field: t("book.publicationYear"),
      }),
      pattern: {
        value: /^[1-9]\d*$/,
        message: t("auth.messages.validation.decimalNumber", {
          field: t("book.publicationYear"),
        }),
      },
    },
  },
];

const onSubmit = async (formData: BookCreateUpdateData) => {
  const finalData = {
    title: formData.title,
    description: formData.description,
    author: formData.author,
    genre: formData.genre,
    publication_year: formData.publication_year,
    language: formData.language,
    status: book?.status || BookStatus.AVAILABLE,
  };

  if (mode === "update" && book?.id) {
    await handleAxiosRequest(
      async () => await booksApi.update(book.id.toString(), finalData),
      notify,
      {
        message: t("notifications.book.update.success.message"),
        description: t("notifications.book.update.success.description"),
      }
    );
  } else {
    await handleAxiosRequest(
      async () => await booksApi.create(finalData),
      notify,
      {
        message: t("notifications.book.create.success.message"),
        description: t("notifications.book.create.success.description"),
      }
    );
  }
};

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md h-fit space-y-6 rounded-xl bg-white p-8 shadow-lg">
        <div className="flex justify-center items-center gap-3">
          <img src={logo} alt="Logo" className="max-w-15 hidden sm:block" />
          <h1 className="text-center text-3xl font-semibold text-primary-500">
            {t(`additionalButtons.${book ? "updateBook" : "addNewBook"}`)}
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
              errorProp={errors[id as keyof BookCreateUpdateData]}
            />
          ))}

          <button type="submit" className="w-full button button--primary">
            {t(`additionalButtons.${mode}`)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
