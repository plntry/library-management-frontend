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
      title: "test1",
      desription: "test1",
      author: "test1",
      publication_year: 2003,
      genre: "test1",
      is_reserved: false,
    },
    {
      id: 2,
      key: 2,
      title: "test1",
      desription: "test1",
      author: "test1",
      publication_year: 2003,
      genre: "test1",
      is_reserved: false,
    },
    {
      id: 3,
      key: 3,
      title: "test1",
      desription: "test1",
      author: "test1",
      publication_year: 2003,
      genre: "test1",
      is_reserved: false,
    },
  ];
}
