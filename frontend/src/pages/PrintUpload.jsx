import {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Upload,
  Printer,
  FileText,
  Layers3,
} from "lucide-react";

import API from "../services/api";

import toast from "react-hot-toast";

export default function PrintUpload() {

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const [file, setFile] =
    useState(null);

  const [copies, setCopies] =
    useState(1);

  const [printType, setPrintType] =
    useState(
      "Black & White"
    );

  const [sideType, setSideType] =
    useState(
      "Single Side"
    );

  // SUBMIT
  const submitRequest =
    async () => {

      try {

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        formData.append(
          "userId",
          user._id
        );

        formData.append(
          "userName",
          user.name
        );

        formData.append(
          "copies",
          copies
        );

        formData.append(
          "printType",
          printType
        );

        formData.append(
          "sideType",
          sideType
        );

        await API.post(
          "/print-requests",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

       toast.success("Print request submitted")

        setFile(null);

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-[#f8f5ef] px-8 py-10 font-['Outfit'] overflow-hidden relative">

      {/* BACKGROUND */}

      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-orange-100/40 blur-3xl" />

      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-yellow-100/40 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* HEADER */}

        <div className="mb-16">

          <div className="inline-flex items-center gap-3 bg-white border border-[#ece7df] px-5 py-3 rounded-full shadow-sm mb-6">

            <Printer
              size={18}
              className="text-[#c27c2c]"
            />

            <p className="text-[#7a6d5b] font-medium text-sm">

              Campus Print Services

            </p>

          </div>

          <h1 className="text-[65px] lg:text-[85px] leading-[0.95] font-black tracking-tight text-[#1f1f1f] mb-6">

            Print
            <br />

            <span className="text-[#c27c2c]">

              Upload

            </span>

          </h1>

          <p className="text-xl text-[#6f6659] leading-relaxed max-w-2xl">

            Upload your files for printing and xerox services directly from campus.

          </p>

        </div>

        {/* FORM */}

        <motion.div
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
          }}
          className="bg-white border border-[#ece7df] rounded-[36px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] space-y-8"
        >

          {/* FILE */}

          <div>

            <label className="flex items-center gap-3 text-[#1f1f1f] font-bold mb-4">

              <Upload
                size={18}
                className="text-[#c27c2c]"
              />

              Upload File

            </label>

            <div className="bg-[#fcfaf6] border border-[#ece7df] rounded-3xl p-6">

              <input
                type="file"
                onChange={(e) =>
                  setFile(
                    e.target.files[0]
                  )
                }
                className="w-full text-[#1f1f1f]"
              />

              {

                file && (

                  <p className="mt-4 text-[#7a6d5b] font-medium break-all">

                    Selected:
                    {" "}
                    {file.name}

                  </p>

                )

              }

            </div>

          </div>

          {/* COPIES */}

          <div>

            <label className="flex items-center gap-3 text-[#1f1f1f] font-bold mb-4">

              <FileText
                size={18}
                className="text-[#c27c2c]"
              />

              Number Of Copies

            </label>

            <input
              type="number"
              min="1"
              value={copies}
              onChange={(e) =>
                setCopies(
                  e.target.value
                )
              }
              placeholder="Copies"
              className="w-full bg-[#fcfaf6] border border-[#ece7df] rounded-3xl px-6 py-5 outline-none text-[#1f1f1f] text-lg"
            />

          </div>

          {/* PRINT OPTIONS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* PRINT TYPE */}

            <div>

              <label className="flex items-center gap-3 text-[#1f1f1f] font-bold mb-4">

                <Printer
                  size={18}
                  className="text-[#c27c2c]"
                />

                Print Type

              </label>

              <select
                value={printType}
                onChange={(e) =>
                  setPrintType(
                    e.target.value
                  )
                }
                className="w-full bg-[#fcfaf6] border border-[#ece7df] rounded-3xl px-6 py-5 outline-none text-[#1f1f1f]"
              >

                <option>
                  Black & White
                </option>

                <option>
                  Color
                </option>

              </select>

            </div>

            {/* SIDE TYPE */}

            <div>

              <label className="flex items-center gap-3 text-[#1f1f1f] font-bold mb-4">

                <Layers3
                  size={18}
                  className="text-[#c27c2c]"
                />

                Side Type

              </label>

              <select
                value={sideType}
                onChange={(e) =>
                  setSideType(
                    e.target.value
                  )
                }
                className="w-full bg-[#fcfaf6] border border-[#ece7df] rounded-3xl px-6 py-5 outline-none text-[#1f1f1f]"
              >

                <option>
                  Single Side
                </option>

                <option>
                  Double Side
                </option>

              </select>

            </div>

          </div>

          {/* BUTTON */}

          <button
            onClick={
              submitRequest
            }
            className="w-full bg-[#1f1f1f] text-white py-5 rounded-3xl font-semibold text-lg hover:bg-[#2f2f2f] transition duration-300"
          >

            Submit Print Request

          </button>

        </motion.div>

      </div>

    </div>

  );

}