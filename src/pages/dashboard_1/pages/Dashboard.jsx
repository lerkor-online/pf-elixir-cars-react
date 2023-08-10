import React from "react";
import OffertMessenge from "../components/OfertMenssenge/OffertMessenge";

function Dashboard() {
  return (
    <div className=" flex flex-col m-0 min-h-full">
      <div className="min-h-[6vh]">
        <h1>DASHBOARD</h1>
      </div>
      <div className="border-2 text-black bg-slate-300 rounded-lg mt-2 min-h-[91vh] w-full items-start justify-center">
        <div className="w-full">
          <OffertMessenge />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
