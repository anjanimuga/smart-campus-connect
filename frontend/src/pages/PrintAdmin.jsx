import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Printer,
  FileText,
  Clock3,
  CheckCircle2,
  Eye,
  Layers3,
  User2,
} from "lucide-react";

import API from "../services/api";

export default function PrintAdmin() {

  const [requests, setRequests] =
    useState([]);

  // FETCH REQUESTS

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

  // STATS

  const processing =
    requests.filter(
      (r) =>
        r.status ===
        "Processing"
    ).length;

  const completed =
    requests.filter(
      (r) =>
        r.status ===
        "Completed"
    ).length;

  return (

    <div className="min-h-screen bg-[#f6f7fb] px-8 py-8 font-['Outfit'] text-[#111111]">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-14">

          <p className="text-[#7a7a7a] mb-3 font-medium">

            Campus Print Management

          </p>

          <h1 className="text-6xl font-black tracking-tight mb-4">

            Print Admin

          </h1>

          <p className="text-[#6d6d6d] text-lg">

            Manage print requests and xerox services.

          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">

          <div className="bg-white border border-[#ececec] rounded-[32px] p-8 shadow-sm">

            <div className="w-16 h-16 rounded-3xl bg-[#eef2ff] flex items-center justify-center mb-6">

              <Printer
                size={28}
                className="text-blue-600"
              />

            </div>

            <p className="text-[#7a7a7a] mb-3">

              Total Requests

            </p>

            <h2 className="text-5xl font-black tracking-tight">

              {requests.length}

            </h2>

          </div>

          <div className="bg-white border border-[#ececec] rounded-[32px] p-8 shadow-sm">

            <div className="w-16 h-16 rounded-3xl bg-[#fff4e8] flex items-center justify-center mb-6">

              <Clock3
                size={28}
                className="text-orange-500"
              />

            </div>

            <p className="text-[#7a7a7a] mb-3">

              Processing

            </p>

            <h2 className="text-5xl font-black tracking-tight">

              {processing}

            </h2>

          </div>

          <div className="bg-white border border-[#ececec] rounded-[32px] p-8 shadow-sm">

            <div className="w-16 h-16 rounded-3xl bg-[#ecfdf3] flex items-center justify-center mb-6">

              <CheckCircle2
                size={28}
                className="text-green-600"
              />

            </div>

            <p className="text-[#7a7a7a] mb-3">

              Completed

            </p>

            <h2 className="text-5xl font-black tracking-tight">

              {completed}

            </h2>

          </div>

        </div>

        {/* REQUESTS */}

        <div className="space-y-8">

          {requests.map(
            (request) => (

              <motion.div
                key={request._id}
                whileHover={{
                  y: -4,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="bg-white border border-[#ececec] rounded-[36px] p-8 shadow-sm"
              >

                {/* TOP */}

                <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-8 mb-8">

                  <div className="flex gap-5">

                    <div className="w-16 h-16 rounded-3xl bg-[#f4f4f4] flex items-center justify-center flex-shrink-0">

                      <FileText
                        size={28}
                      />

                    </div>

                    <div>

                      <div className="flex items-center gap-2 mb-3">

                        <User2
                          size={18}
                          className="text-[#7a7a7a]"
                        />

                        <p className="text-[#7a7a7a]">

                          {
                            request.userName
                          }

                        </p>

                      </div>

                      <h2 className="text-3xl font-black tracking-tight mb-3">

                        {
                          request.fileName
                        }

                      </h2>

                      <p className="text-[#7a7a7a]">

                        {new Date(
                          request.createdAt
                        ).toLocaleString()}

                      </p>

                    </div>

                  </div>

                  <div className="bg-[#111111] text-white px-5 py-3 rounded-2xl font-semibold w-fit">

                    {request.status}

                  </div>

                </div>

                {/* DETAILS */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                  <div className="bg-[#fafafa] border border-[#ececec] rounded-3xl p-5">

                    <p className="text-[#8a8a8a] text-sm mb-3">

                      Copies

                    </p>

                    <h3 className="text-3xl font-black tracking-tight">

                      {request.copies}

                    </h3>

                  </div>

                  <div className="bg-[#fafafa] border border-[#ececec] rounded-3xl p-5">

                    <p className="text-[#8a8a8a] text-sm mb-3">

                      Print Type

                    </p>

                    <h3 className="text-xl font-black tracking-tight">

                      {
                        request.printType
                      }

                    </h3>

                  </div>

                  <div className="bg-[#fafafa] border border-[#ececec] rounded-3xl p-5">

                    <div className="flex items-center gap-2 text-[#8a8a8a] text-sm mb-3">

                      <Layers3 size={15} />

                      <p>
                        Side Type
                      </p>

                    </div>

                    <h3 className="text-xl font-black tracking-tight">

                      {
                        request.sideType
                      }

                    </h3>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-6">

                  <a
                    href={`https://smart-campus-connect-cuef.onrender.com${request.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-100 text-blue-700 px-6 py-4 rounded-2xl font-semibold flex items-center gap-3 w-fit hover:bg-blue-200 transition"
                  >

                    <Eye size={18} />

                    View File

                  </a>

                  <div className="flex flex-wrap gap-3">

                    <button
                      onClick={() =>
                        updateStatus(
                          request._id,
                          "Processing"
                        )
                      }
                      className="bg-amber-100 text-amber-700 px-5 py-3 rounded-2xl font-semibold hover:bg-amber-200 transition"
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
                      className="bg-blue-100 text-blue-700 px-5 py-3 rounded-2xl font-semibold hover:bg-blue-200 transition"
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
                      className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl font-semibold hover:bg-green-200 transition flex items-center gap-2"
                    >

                      <CheckCircle2 size={18} />

                      Completed

                    </button>

                  </div>

                </div>

              </motion.div>

            )
          )}

        </div>

      </div>

    </div>

  );

}