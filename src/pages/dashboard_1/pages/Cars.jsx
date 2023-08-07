import React from "react";
import AddCars from "../../create/AddCars";

function Cars() {
  return (
    <div className="flex flex-col m-auto min-h-full min-w-full Z-0">
      <div className="min-h-[6vh]">
        <h1>CARS</h1>
      </div>
      <div className=" p-0 border-2 text-black bg-slate-300 rounded-lg mt-2 min-h-[91vh] max-h-[91vh] overflow-auto">
        <AddCars />
      </div>
    </div>
  );
}

export default Cars;
