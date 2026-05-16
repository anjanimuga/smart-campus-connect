import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Search,
  BookOpen,
  MapPinned,
  LibraryBig,
} from "lucide-react";

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

    <div className="min-h-screen bg-[#f6f7fb] px-8 py-10 font-['Outfit'] overflow-hidden relative">

      {/* BACKGROUND LIGHTS */}

      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl" />

      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-violet-100/40 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-16">

          <div className="inline-flex items-center gap-3 bg-white border border-[#e5e7eb] px-5 py-3 rounded-full shadow-sm mb-6">

            <LibraryBig
              size={18}
              className="text-[#4f46e5]"
            />

            <p className="text-[#6b7280] font-medium text-sm">

              Smart Library Navigation

            </p>

          </div>

          <h1 className="text-[65px] lg:text-[90px] leading-[0.95] font-black tracking-tight text-[#111827] mb-6">

            Book
            <br />

            <span className="bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">

              Search

            </span>

          </h1>

          <p className="text-xl text-[#6b7280] leading-relaxed max-w-2xl">

            Instantly locate books, shelves and library sections across the campus library.

          </p>

        </div>

        {/* SEARCH BAR */}

        <div className="mb-14">

          <div className="relative">

            <Search
              size={22}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-[#9ca3af]"
            />

            <input
              type="text"
              placeholder="Search by book name..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full bg-white/80 backdrop-blur-2xl border border-white rounded-[30px] pl-16 pr-6 py-6 outline-none text-[#111827] text-lg shadow-[0_15px_50px_rgba(0,0,0,0.05)] focus:border-[#c4b5fd] transition"
            />

          </div>

        </div>

        {/* RESULTS */}

        {

          search.trim() === "" ? (

            <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[36px] p-14 text-center shadow-[0_15px_50px_rgba(0,0,0,0.05)]">

              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#eef2ff] to-[#ede9fe] flex items-center justify-center mx-auto mb-8">

                <Search
                  size={40}
                  className="text-[#4f46e5]"
                />

              </div>

              <h2 className="text-4xl font-black tracking-tight text-[#111827] mb-5">

                Search For A Book

              </h2>

              <p className="text-[#6b7280] text-lg">

                Enter a book name to instantly locate it inside the library.

              </p>

            </div>

          ) : filteredBooks.length === 0 ? (

            <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[36px] p-14 text-center shadow-[0_15px_50px_rgba(0,0,0,0.05)]">

              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center mx-auto mb-8">

                <BookOpen
                  size={40}
                  className="text-red-500"
                />

              </div>

              <h2 className="text-4xl font-black tracking-tight text-[#111827] mb-5">

                No Books Found

              </h2>

              <p className="text-[#6b7280] text-lg">

                Try searching with another book title.

              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {filteredBooks.map(
                (
                  book,
                  index
                ) => (

                  <motion.div
                    key={book._id}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay:
                        index * 0.05,
                    }}
                    whileHover={{
                      y: -8,
                    }}
                    className="bg-white/80 backdrop-blur-2xl border border-white rounded-[34px] p-8 shadow-[0_15px_50px_rgba(0,0,0,0.05)] transition duration-500"
                  >

                    {/* TOP */}

                    <div className="flex items-start gap-5 mb-8">

                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#eef2ff] to-[#ede9fe] flex items-center justify-center shrink-0">

                        <BookOpen
                          size={34}
                          className="text-[#4f46e5]"
                        />

                      </div>

                      <div>

                        <h2 className="text-4xl font-black tracking-tight text-[#111827] mb-3 leading-tight">

                          {
                            book.bookName
                          }

                        </h2>

                        <p className="text-[#6b7280] mb-2">

                          Author:
                          {" "}
                          {
                            book.author
                          }

                        </p>

                        <p className="text-[#9ca3af]">

                          Department:
                          {" "}
                          {
                            book.department
                          }

                        </p>

                      </div>

                    </div>

                    {/* LOCATION */}

                    <div className="space-y-5">

                      <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-2xl p-5">

                        <div className="flex items-center gap-3 mb-3">

                          <MapPinned
                            size={18}
                            className="text-[#4f46e5]"
                          />

                          <p className="text-[#9ca3af] text-sm font-medium">

                            Floor

                          </p>

                        </div>

                        <h3 className="text-2xl font-black text-[#111827]">

                          {
                            book.floor
                          }

                        </h3>

                      </div>

                      <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-2xl p-5">

                        <div className="flex items-center gap-3 mb-3">

                          <MapPinned
                            size={18}
                            className="text-[#7c3aed]"
                          />

                          <p className="text-[#9ca3af] text-sm font-medium">

                            Section

                          </p>

                        </div>

                        <h3 className="text-2xl font-black text-[#111827]">

                          {
                            book.section
                          }

                        </h3>

                      </div>

                      <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-2xl p-5">

                        <div className="flex items-center gap-3 mb-3">

                          <MapPinned
                            size={18}
                            className="text-pink-500"
                          />

                          <p className="text-[#9ca3af] text-sm font-medium">

                            Shelf Number

                          </p>

                        </div>

                        <h3 className="text-2xl font-black text-[#111827]">

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

          )

        }

      </div>

    </div>

  );

}