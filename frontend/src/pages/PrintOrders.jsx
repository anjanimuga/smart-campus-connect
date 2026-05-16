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
  Files,
  Eye,
} from "lucide-react";

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

    <div className="min-h-screen bg-[#f8f5ef] px-8 py-10 font-['Outfit'] overflow-hidden relative">

      {/* BACKGROUND */}

      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-orange-100/40 blur-3xl" />

      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-yellow-100/40 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="mb-16">

          <div className="inline-flex items-center gap-3 bg-white border border-[#ece7df] px-5 py-3 rounded-full shadow-sm mb-6">

            <Printer
              size={18}
              className="text-[#c27c2c]"
            />

            <p className="text-[#7a6d5b] font-medium text-sm">

              Campus Printing Services

            </p>

          </div>

          <h1 className="text-[65px] lg:text-[85px] leading-[0.95] font-black tracking-tight text-[#1f1f1f] mb-6">

            Print
            <br />

            <span className="text-[#c27c2c]">

              Requests

            </span>

          </h1>

          <p className="text-xl text-[#6f6659] leading-relaxed max-w-2xl">

            Track your uploaded print, xerox and document requests in real time.

          </p>

        </div>

        {/* EMPTY */}

        {

          requests.length === 0 ? (

            <div className="bg-white border border-[#ece7df] rounded-[36px] p-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)]">

              <div className="w-24 h-24 rounded-3xl bg-[#f8f5ef] border border-[#ece7df] flex items-center justify-center mx-auto mb-8">

                <Files
                  size={40}
                  className="text-[#c27c2c]"
                />

              </div>

              <h2 className="text-4xl font-black tracking-tight text-[#1f1f1f] mb-5">

                No Print Requests

              </h2>

              <p className="text-[#6f6659] text-lg">

                Your uploaded print requests will appear here.

              </p>

            </div>

          ) : (

            <div className="space-y-8">

              {requests.map(
                (
                  request,
                  index
                ) => (

                  <motion.div
                    key={request._id}
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
                    className="bg-white border border-[#ece7df] rounded-[36px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
                  >

                    {/* TOP */}

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 mb-8">

                      <div className="flex items-start gap-5">

                        <div className="w-20 h-20 rounded-3xl bg-[#f8f5ef] border border-[#ece7df] flex items-center justify-center shrink-0">

                          <FileText
                            size={34}
                            className="text-[#c27c2c]"
                          />

                        </div>

                        <div>

                          <h2 className="text-3xl font-black tracking-tight text-[#1f1f1f] mb-3 break-all">

                            {request.fileName}

                          </h2>

                          <p className="text-[#7a6d5b]">

                            {new Date(
                              request.createdAt
                            ).toLocaleString()}

                          </p>

                        </div>

                      </div>

                      <div className="bg-[#1f1f1f] text-white px-6 py-3 rounded-full font-semibold w-fit">

                        {request.status}

                      </div>

                    </div>

                    {/* DETAILS */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                      <div className="bg-[#fcfaf6] border border-[#f0e8dc] rounded-3xl p-5">

                        <p className="text-sm text-[#8a7c67] mb-3 font-medium">

                          Copies

                        </p>

                        <h3 className="text-3xl font-black text-[#1f1f1f]">

                          {request.copies}

                        </h3>

                      </div>

                      <div className="bg-[#fcfaf6] border border-[#f0e8dc] rounded-3xl p-5">

                        <p className="text-sm text-[#8a7c67] mb-3 font-medium">

                          Print Type

                        </p>

                        <h3 className="text-2xl font-black text-[#1f1f1f]">

                          {request.printType}

                        </h3>

                      </div>

                      <div className="bg-[#fcfaf6] border border-[#f0e8dc] rounded-3xl p-5">

                        <p className="text-sm text-[#8a7c67] mb-3 font-medium">

                          Side Type

                        </p>

                        <h3 className="text-2xl font-black text-[#1f1f1f]">

                          {request.sideType}

                        </h3>

                      </div>

                    </div>

                    {/* BUTTON */}

                    <a
                      href={`https://smart-campus-connect-cuef.onrender.com${request.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 bg-[#1f1f1f] text-white px-7 py-4 rounded-2xl font-semibold hover:bg-[#2f2f2f] transition duration-300"
                    >

                      <Eye size={18} />

                      View Uploaded File

                    </a>

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