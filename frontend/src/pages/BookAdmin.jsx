import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

export default function BookAdmin() {

  const [books, setBooks] =
    useState([]);

  const [newBook, setNewBook] =
    useState({
      bookName: "",
      author: "",
      department: "",
      floor: "",
      section: "",
      shelf: "",
    });

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

  // ADD BOOK
  const addBook =
    async () => {

      try {

        await API.post(
          "/books",
          newBook
        );

        setNewBook({
          bookName: "",
          author: "",
          department: "",
          floor: "",
          section: "",
          shelf: "",
        });

        fetchBooks();

      } catch (error) {

        console.log(error);

      }

    };

  // DELETE BOOK
  const deleteBook =
    async (id) => {

      try {

        await API.delete(
          `/books/${id}`
        );

        fetchBooks();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-[#151312] text-white px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-14">

          <h1 className="text-5xl font-semibold mb-3">
            Book Inventory
          </h1>

          <p className="text-gray-400 text-lg">
            Manage library books and locations.
          </p>

        </div>

        {/* ADD BOOK */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-14">

          <h2 className="text-3xl font-semibold mb-8">
            Add Book
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            <input
              type="text"
              placeholder="Book Name"
              value={newBook.bookName}
              onChange={(e) =>
                setNewBook({
                  ...newBook,
                  bookName:
                    e.target.value,
                })
              }
              className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({
                  ...newBook,
                  author:
                    e.target.value,
                })
              }
              className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Department"
              value={newBook.department}
              onChange={(e) =>
                setNewBook({
                  ...newBook,
                  department:
                    e.target.value,
                })
              }
              className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Floor"
              value={newBook.floor}
              onChange={(e) =>
                setNewBook({
                  ...newBook,
                  floor:
                    e.target.value,
                })
              }
              className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Section"
              value={newBook.section}
              onChange={(e) =>
                setNewBook({
                  ...newBook,
                  section:
                    e.target.value,
                })
              }
              className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Shelf"
              value={newBook.shelf}
              onChange={(e) =>
                setNewBook({
                  ...newBook,
                  shelf:
                    e.target.value,
                })
              }
              className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

          </div>

          <button
            onClick={addBook}
            className="mt-8 bg-white text-black px-7 py-4 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Add Book
          </button>

        </div>

        {/* BOOK LIST */}
        <div>

          <h2 className="text-4xl font-semibold mb-8">
            Library Books
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {books.map(
              (book) => (

                <div
                  key={book._id}
                  className="bg-white/5 border border-white/10 rounded-3xl p-7"
                >

                  <h2 className="text-3xl font-semibold mb-3">

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

                  <p className="text-gray-400 mb-2">

                    Floor:
                    {" "}
                    {
                      book.floor
                    }

                  </p>

                  <p className="text-gray-400 mb-2">

                    Section:
                    {" "}
                    {
                      book.section
                    }

                  </p>

                  <p className="text-gray-400 mb-6">

                    Shelf:
                    {" "}
                    {
                      book.shelf
                    }

                  </p>

                  <button
                    onClick={() =>
                      deleteBook(
                        book._id
                      )
                    }
                    className="bg-red-500 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-red-600 transition"
                  >

                    Delete

                  </button>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </div>

  );

}