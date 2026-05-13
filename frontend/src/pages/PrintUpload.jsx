import {
  useState,
} from "react";

import API from "../services/api";

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

        alert(
          "Print request submitted"
        );

        setFile(null);

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-[#151312] text-white px-8 py-10">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">

          <h1 className="text-5xl font-semibold mb-3">

            Print / Xerox Upload

          </h1>

          <p className="text-gray-400">

            Upload files for printing and xerox services.

          </p>

        </div>

        {/* FORM */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">

          <input
            type="file"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
            className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4"
          />

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
            className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <select
            value={printType}
            onChange={(e) =>
              setPrintType(
                e.target.value
              )
            }
            className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
          >

            <option>
              Black & White
            </option>

            <option>
              Color
            </option>

          </select>

          <select
            value={sideType}
            onChange={(e) =>
              setSideType(
                e.target.value
              )
            }
            className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
          >

            <option>
              Single Side
            </option>

            <option>
              Double Side
            </option>

          </select>

          <button
            onClick={
              submitRequest
            }
            className="w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-gray-200 transition"
          >

            Submit Print Request

          </button>

        </div>

      </div>

    </div>

  );

}