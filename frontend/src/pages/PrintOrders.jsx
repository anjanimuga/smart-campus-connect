import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

export default function PrintOrders() {

  const [requests, setRequests] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const fetchRequests =
    async () => {

      try {

        const res =
          await API.get(
            `/print-requests/my/${user._id}`
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

  return (

    <div className="min-h-screen bg-[#151312] text-white px-8 py-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">

          <h1 className="text-5xl font-semibold mb-3">

            My Print Requests

          </h1>

          <p className="text-gray-400">

            Track your print and xerox requests.

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

                      {request.fileName}

                    </h2>

                    <p className="text-gray-400 mt-2">

                      {new Date(
                        request.createdAt
                      ).toLocaleString()}

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
                  className="inline-block bg-blue-500 text-white px-6 py-3 rounded-2xl font-semibold"
                >

                  View Uploaded File

                </a>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}