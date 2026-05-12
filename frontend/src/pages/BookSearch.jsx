import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

export default function BookSearch() {

  const [books, setBooks] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // FETCH BOOKS
  const fetchBooks =
    async () => {

      try {

        const res =
          await API.get(
            "/books"
          );

        setBooks(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchBooks();

  }, []);

  // FILTER BOOKS
  const filteredBooks =
    search.trim() === ""
      ? []
      : books.filter(
          (book) =>
            book.bookName
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );

  return (

    <div className="min-h-screen bg-[#151312] text-white px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">

          <h1 className="text-5xl font-semibold mb-3">
            Book Search
          </h1>

          <p className="text-gray-400">
            Find where books are located in the library.
          </p>

        </div>

        {/* SEARCH */}
        <div className="mb-12">

          <input
            type="text"
            placeholder="Search by book name..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none"
          />

        </div>

        {/* RESULTS */}
        {

          search.trim() === "" ? (

            <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">

              <h2 className="text-3xl font-semibold mb-4">

                Search For A Book

              </h2>

              <p className="text-gray-400">

                Enter a book name to find its location.

              </p>

            </div>

          ) : filteredBooks.length === 0 ? (

            <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">

              <h2 className="text-3xl font-semibold mb-4">

                No Books Found

              </h2>

              <p className="text-gray-400">

                Try searching another title.

              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {filteredBooks.map(
                (book) => (

                  <div
                    key={book._id}
                    className="bg-white/5 border border-white/10 rounded-3xl p-8"
                  >

                    <h2 className="text-4xl font-semibold mb-4">

                      {
                        book.bookName
                      }

                    </h2>

                    <p className="text-gray-400 mb-2">

                      Author:
                      {" "}
                      {
                        book.author
                      }

                    </p>

                    <p className="text-gray-400 mb-2">

                      Department:
                      {" "}
                      {
                        book.department
                      }

                    </p>

                    <div className="mt-8 space-y-4">

                      <div className="bg-black border border-white/10 rounded-2xl p-5">

                        <p className="text-gray-500 text-sm mb-2">
                          Floor
                        </p>

                        <h3 className="text-2xl font-semibold">

                          {
                            book.floor
                          }

                        </h3>

                      </div>

                      <div className="bg-black border border-white/10 rounded-2xl p-5">

                        <p className="text-gray-500 text-sm mb-2">
                          Section
                        </p>

                        <h3 className="text-2xl font-semibold">

                          {
                            book.section
                          }

                        </h3>

                      </div>

                      <div className="bg-black border border-white/10 rounded-2xl p-5">

                        <p className="text-gray-500 text-sm mb-2">
                          Shelf Number
                        </p>

                        <h3 className="text-2xl font-semibold">

                          {
                            book.shelf
                          }

                        </h3>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )

        }

      </div>

    </div>

  );

}