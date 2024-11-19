import { useState } from "react";
import Layout from "../components/Layout";

import { InstitutionsTableAdmin } from "../components/Admin/Institutions/InstitutionsTableAdmin";
import { UsersTableAdmin } from "../components/Admin/Users/UsersTableAdmin";

const EducadoAdmin = () => {
  const [selectedTable, setSelectedTable] = useState<"users" | "institutions">(
    "users"
  );

  const activeTable =
    selectedTable === "users" ? (
      <UsersTableAdmin />
    ) : (
      <InstitutionsTableAdmin />
    );

  return (
    <Layout meta="Educado Admin">
      <div className="container mx-auto flex-col space-y-8 shadow-md rounded-xl bg-white p-10 m-10 font-['Montserrat']">
        <div className="btn-group flex text-center text-base font-semibold text-white bg-[#166276] border-b-2 border-b-[#166276]">
          <button
            className={`flex-1 py-3 ${
              selectedTable === "users"
                ? ""
                : "bg-white text-normal font-normal text-[#166276]"
            }`}
            onClick={() => setSelectedTable("users")}
          >
            <span>Users</span>
          </button>
          <button
            id="InstitutionsButton"
            className={`flex-1 py-3 ${
              selectedTable === "institutions"
                ? ""
                : "bg-white text-normal font-normal text-[#166276]"
            }`}
            onClick={() => setSelectedTable("institutions")}
          >
            <span>Institutions</span>
          </button>
        </div>
        {activeTable}
      </div>
    </Layout>
  );
};

export default EducadoAdmin;
