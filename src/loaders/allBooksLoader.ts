export async function loader() {
  // const response = await booksApi.getAll();

  // if (response.status === 200) {
  //   return response.data.map((el: Book) => ({
  //     ...el,
  //     key: el.id,
  //   }));
  // }

  // return [];

  return [
    {
      id: 1,
      key: 1,
      title: "Chop Chop",
      desription: "Cooking the Food of Nigeria",
      author: "Ozoz Sokoh",
      publication_year: 2003,
      genre: "Cooking",
      is_reserved: true,
    },
    {
      id: 2,
      key: 2,
      title: "How to Cook the Finest Things in the Sea",
      desription:
        "Broil, Bake, Poach & Grill Your Way to Exceptional Fish & Shellfish",
      author: "Ari Kolender",
      publication_year: 2003,
      genre: "Cooking",
      is_reserved: false,
    },
    {
      id: 3,
      key: 3,
      title:
        "test tes tse t set se ts t se t set set  tes tse tsetestsets test",
      desription: "test1",
      author: "test1",
      publication_year: 2003,
      genre: "test1",
      is_reserved: false,
    },
  ];
}
