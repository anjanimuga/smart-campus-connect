import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Library,
  BookOpen,
  Plus,
  Trash2,
  MapPinned,
  Layers3,
} from "lucide-react";

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

    <div className="min-h-screen bg-[#f6f7fb] px-8 py-8 font-['Outfit'] text-[#111111]">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-14">

          <p className="text-[#7a7a7a] mb-3 font-medium">

            Campus Library Management

          </p>

          <h1 className="text-6xl font-black tracking-tight mb-4">

            Book Inventory

          </h1>

          <p className="text-[#6d6d6d] text-lg">

            Manage books, shelves and library locations.

          </p>

        </div>

        {/* ADD BOOK */}

        <div className="bg-white border border-[#ececec] rounded-[36px] p-8 shadow-sm mb-14">

          <div className="flex items-center gap-4 mb-8">

            <div className="w-16 h-16 rounded-3xl bg-[#eef2ff] flex items-center justify-center">

              <Plus
                size={28}
                className="text-blue-600"
              />

            </div>

            <div>

              <h2 className="text-3xl font-black tracking-tight">

                Add New Book

              </h2>

              <p className="text-[#7a7a7a]">

                Create and organize your library inventory

              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

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
              className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
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
              className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
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
              className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
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
              className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
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
              className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
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
              className="bg-[#f8f8f8] border border-[#ececec] rounded-2xl px-5 py-4 outline-none"
            />

          </div>

          <button
            onClick={addBook}
            className="mt-8 bg-[#111111] text-white px-8 py-4 rounded-2xl font-semibold hover:opacity-90 transition"
          >

            Add Book

          </button>

        </div>

        {/* BOOK LIST */}

        <div>

          <div className="flex items-center gap-4 mb-10">

            <div className="w-16 h-16 rounded-3xl bg-[#eef2ff] flex items-center justify-center">

              <Library
                size={28}
                className="text-blue-600"
              />

            </div>

            <div>

              <h2 className="text-5xl font-black tracking-tight">

                Library Books

              </h2>

              <p className="text-[#7a7a7a] mt-1">

                {books.length} Books Available

              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {books.map(
              (book) => (

                <motion.div
                  key={book._id}
                  whileHover={{
                    y: -4,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="bg-white border border-[#ececec] rounded-[32px] p-8 shadow-sm"
                >

                  {/* TOP */}

                  <div className="flex justify-between items-start mb-8">

                    <div className="flex gap-4">

                      <div className="w-16 h-16 rounded-3xl bg-[#f4f4f4] flex items-center justify-center flex-shrink-0">

                        <BookOpen
                          size={28}
                          className="text-[#111111]"
                        />

                      </div>

                      <div>

                        <h2 className="text-3xl font-black tracking-tight leading-tight mb-2">

                          {
                            book.bookName
                          }

                        </h2>

                        <p className="text-[#6d6d6d]">

                          {
                            book.author
                          }

                        </p>

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        deleteBook(
                          book._id
                        )
                      }
                      className="bg-red-50 hover:bg-red-100 transition text-red-600 w-12 h-12 rounded-2xl flex items-center justify-center"
                    >

                      <Trash2 size={18} />

                    </button>

                  </div>

                  {/* DETAILS */}

                  <div className="grid grid-cols-2 gap-5">

                    <div className="bg-[#fafafa] border border-[#ececec] rounded-3xl p-5">

                      <p className="text-[#8a8a8a] text-sm mb-3">

                        Department

                      </p>

                      <h3 className="text-xl font-black tracking-tight">

                        {
                          book.department
                        }

                      </h3>

                    </div>

                    <div className="bg-[#fafafa] border border-[#ececec] rounded-3xl p-5">

                      <div className="flex items-center gap-2 text-[#8a8a8a] text-sm mb-3">

                        <Layers3 size={15} />

                        <p>
                          Floor
                        </p>

                      </div>

                      <h3 className="text-xl font-black tracking-tight">

                        {
                          book.floor
                        }

                      </h3>

                    </div>

                    <div className="bg-[#fafafa] border border-[#ececec] rounded-3xl p-5">

                      <div className="flex items-center gap-2 text-[#8a8a8a] text-sm mb-3">

                        <MapPinned size={15} />

                        <p>
                          Section
                        </p>

                      </div>

                      <h3 className="text-xl font-black tracking-tight">

                        {
                          book.section
                        }

                      </h3>

                    </div>

                    <div className="bg-[#fafafa] border border-[#ececec] rounded-3xl p-5">

                      <p className="text-[#8a8a8a] text-sm mb-3">

                        Shelf

                      </p>

                      <h3 className="text-xl font-black tracking-tight">

                        {
                          book.shelf
                        }

                      </h3>

                    </div>

                  </div>

                </motion.div>

              )
            )}

          </div>

        </div>

      </div>

    </div>

  );

}