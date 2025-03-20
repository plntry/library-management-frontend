import { Params } from "react-router";

export async function loader({ params }: { params: Params }) {
  // const response = await bookApi.getById(params.courseId || "");

  // if (response.status === 200) {
  //   return response.data;
  // }

  // return null;

  return {
    id: 1,
    title: "Chop Chop",
    description: "Cooking the Food of Nigeria",
    author: "Ozoz Sokoh",
    publication_year: 2003,
    genre: "Cooking",
    is_reserved: true,
  };
}
