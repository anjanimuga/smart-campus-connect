import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

export default function PrintAdmin() {

  const [requests, setRequests] =
    useState([]);

  const fetchRequests =
    async () => {

      try {

        const res =
          await API.get(
            "/print-requests"
          );

        setRequests(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchRequests();

  }, []);

  // UPDATE STATUS
  const updateStatus =
    async (
      id,
      status
    ) => {

      try {

        await API.put(
          `/print-requests/${id}`,
          {
            status,
          }
        );

        fetchRequests();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-[#151312] text-white px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">

          <h1 className="text-5xl font-semibold mb-3">

            Print Requests Admin

          </h1>

          <p className="text-gray-400">

            Manage uploaded print and xerox requests.

          </p>

        </div>

        {/* REQUESTS */}
        <div className="space-y-8">

          {requests.map(
            (request) => (

              <div
                key={request._id}
                className="bg-white/5 border border-white/10 rounded-3xl p-8"
              >

                <div className="flex justify-between items-start mb-6">

                  <div>

                    <h2 className="text-2xl font-semibold">

                      {request.userName}

                    </h2>

                    <p className="text-gray-400 mt-2">

                      {request.fileName}

                    </p>

                  </div>

                  <div className="bg-white text-black px-5 py-2 rounded-full font-semibold">

                    {request.status}

                  </div>

                </div>

                <div className="space-y-3 mb-6">

                  <p>

                    Copies:
                    {" "}
                    {request.copies}

                  </p>

                  <p>

                    Print Type:
                    {" "}
                    {request.printType}

                  </p>

                  <p>

                    Side Type:
                    {" "}
                    {request.sideType}

                  </p>

                </div>

                <a
                  href={`https://smart-campus-connect-cuef.onrender.com${request.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-blue-500 text-white px-6 py-3 rounded-2xl font-semibold mb-6"
                >

                  View File

                </a>

                <div className="flex gap-4">

                  <button
                    onClick={() =>
                      updateStatus(
                        request._id,
                        "Processing"
                      )
                    }
                    className="bg-yellow-500 text-black px-4 py-2 rounded-xl font-semibold"
                  >

                    Processing

                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        request._id,
                        "Ready"
                      )
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold"
                  >

                    Ready

                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        request._id,
                        "Completed"
                      )
                    }
                    className="bg-green-500 text-black px-4 py-2 rounded-xl font-semibold"
                  >

                    Completed

                  </button>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}