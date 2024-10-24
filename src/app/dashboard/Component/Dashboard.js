// "use client";
// import React, { useEffect, useState } from "react";
// import style from "./Dashboard.module.css";
// import { ic_Client, ic_CreatForma, ic_Delete, ic_EditBody, ic_EditYello, ic_Page } from "@/src/Utils/svg";
// import Heading2Fonts from "@/src/Typography/text/Heading2Fonts";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import moment from "moment";
// import Modal from '@/src/Component/FormElement/Modal';
// import { useRouter } from "next/navigation";

// function Dashboard() {
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [taxModal, setTaxModal] = useState(false);
//   const router = useRouter();

//   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjY2ZmZiODViZTgyNDI4MDU1MzVjYWIyZiIsImVtYWlsIjoiQmhhdmRpcEBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImlhdCI6MTcyODAzNDk0MiwiZXhwIjoxNzI4NjM5NzQyfQ.SvcWJJbrJi5JgXdzXb2zdMRHO7UB988qlto6GU_RCCk"

//   const fetchProfiles = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/v1/auth/get-profile-datatable",
//         {
//           "draw": 1,
//           "start": 0,
//           "length": 10,
//           "order": [{ "column": 0, "dir": "asc" }],
//           "search": { "value": "", "regex": false },
//           "columns": [
//             { "name": "first_name", "search": { "value": "", "regex": false } },
//             { "name": "createdAt", "search": { "value": "", "regex": false } },
//             { "name": "updatedAt", "search": { "value": "", "regex": false } },
//             { "name": "resident_state", "search": { "value": "", "regex": false } },

//           ]
//         },
//         {
//           headers: { "Authorization": `Bearer ${token}` },
//         }
//       );

//       const data = response.data.info.data;
//       console.log("Data fetched:", data);
//       setProfiles(data);
//     } catch (error) {
//       console.error("Error fetching profiles:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfiles();
//   }, []);


//   const handleCreateProFormaClick = () => {
//     router.push("/taxproforma");
//   }


//   const handleEditProFormaClick = () => {
//     router.push("/taxproforma");

//   }

//   const handleHouseholdDetailsEditClick = () => {
//     router.push("/clientprofile");
//   }

//   const handleHouseholdDetailsDeleteClick = () => {
//     setTaxModal(!taxModal);
//   }
//   const columns = [
//     { name: "Name", selector: profiles => profiles.spouse_first_name ? `${profiles.first_name} And ${profiles.spouse_first_name}` : profiles.first_name, sortable: true, searchable: true }, { name: "Date Created", selector: profiles => moment(profiles.createdAt).format("MM/DD/YYYY"), sortable: true, searchable: true },
//     { name: "Date Created", selector: profiles => moment(profiles.createdAt).format("MM/DD/YYYY"), sortable: true, searchable: true },
//     { name: "Last Updated", selector: profiles => moment(profiles.updatedAt).format("MM/DD/YYYY"), sortable: true, searchable: true },
//     { name: "State", selector: profiles => profiles.resident_state, sortable: true, searchable: true },
//     {
//       name: "Pro Forma",
//       cell: profiles => (
//         <div className={style.MainDivForProFormaButton}>
//           <button className={style.CreateProFormaButton} onClick={() => handleCreateProFormaClick(profiles)}>
//             {ic_CreatForma.icon()} Create
//           </button>
//           <button className={style.EditFormaButton} onClick={() => handleEditProFormaClick(profiles)}>
//             {ic_EditYello.icon()} Edit
//           </button>
//         </div>
//       ),
//     },
//     {
//       name: "HouseHold Details",
//       cell: profiles => (
//         <div className={style.MainDivForHouseHoldDetailsButton}>
//           <button className={style.EditHouseHoldButton} onClick={() => handleHouseholdDetailsEditClick(profiles)}>
//             {ic_EditBody.icon()} Edit
//           </button>
//           <button className={style.DeleteFormaButton} onClick={() => handleHouseholdDetailsDeleteClick(profiles)}>
//             {ic_Delete.icon()}
//           </button>
//         </div>
//       ),
//     },
//   ];
//   const filteredProfiles = profiles.filter(profile => {
//     return (
//       profile.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       profile.resident_state.toLowerCase().includes(searchTerm.toLowerCase())
//       // profile.spouse_first_name.toLowerCase().includes(searchTerm.toLowerCase()) 
//       // profile.dob.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       // profile.gender.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });
//   const handleCloseModal = () => {
//     setTaxModal(!taxModal);
//   };
//   return (
//     <>{taxModal && <Modal isOpen={taxModal} onClose={handleCloseModal} onClick={handleHouseholdDetailsDeleteClick} />}

//       <Heading2Fonts text={"Dashboard"} />
//       <div className={style.DashboardMainContainer}>
//         <div className={style.InnerCardDiv}>
//           <div className={style.RightsideDiv}>
//             <div className={style.svgDiv}>{ic_Client.icon()}</div>
//             <div className={style.TextDiv}>Total clients </div>
//           </div>
//           <div className={style.LeftsideDiv}>
//             <div className={style.PriceDiv}>254</div>
//             <p className={style.PriceTextDiv}>in last month</p>
//           </div>
//         </div>
//         <div className={style.InnerCardDiv}>
//           <div className={style.RightsideDiv}>
//             <div className={style.RightsideSvgDiv}>{ic_Page.icon()}</div>
//             <div className={style.TextDiv}>Total Pro Formas Created </div>
//           </div>
//           <div className={style.LeftsideDiv}>
//             <div className={style.PriceDiv}>254</div>
//             <p className={style.PriceTextDiv}>in last month</p>
//           </div>
//         </div>
//       </div>
//       <div className={style.MainDivFordatatable}>
//         <div className={style.MainDivForDataTableNev}>
//           <div className={style.TotalClientProfiles}>Total Client Profiles (50)</div>
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className={style.SearchInput}
//           />
//           <div className={style.AddNewHousehold} onClick={() => handleHouseholdDetailsEditClick()}>Add New Household</div>
//         </div>

//         <DataTable
//           keyField="_id"
//           title="Profiles List"
//           columns={columns}
//           data={filteredProfiles}
//           progressPending={loading}
//           pagination
//           paginationPerPage={2}
//           paginationRowsPerPageOptions={[5, 10, 20]}
//         />
//       </div>
//     </>
//   );
// }

// export default Dashboard;



"use client";
import React, { useEffect, useState } from "react";
import style from "./Dashboard.module.css";
import { ic_Client, ic_CreatForma, ic_Delete, ic_EditBody, ic_EditYello, ic_Page, ic_ViewIcon } from "@/src/Utils/svg";
import Heading2Fonts from "@/src/Typography/text/Heading2Fonts";
import DataTable from "react-data-table-component";
import axios from "axios";
import moment from "moment";
import Modal from '@/src/Component/FormElement/Modal';
import { useRouter } from "next/navigation";

function Dashboard() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [taxModal, setTaxModal] = useState(false);
  const router = useRouter();

  const dummyProfiles = [
    {
      _id: "1",
      first_name: "John",
      spouse_first_name: "Jane",
      createdAt: new Date(),
      updatedAt: new Date(),
      resident_state: "Florida",
    },
    {
      _id: "9",
      first_name: "Steve",
      spouse_first_name: "Bob",
      createdAt: new Date(),
      updatedAt: new Date(),
      resident_state: "Maryland",
    },
    {
      _id: "2",
      first_name: "Pat",
      spouse_first_name: "Cummins",
      createdAt: new Date(),
      updatedAt: new Date(),
      resident_state: "New Hampshire",
    },
    {
      _id: "3",
      first_name: "Rouge",
      spouse_first_name: "Jeffy",
      createdAt: new Date(),
      updatedAt: new Date(),
      resident_state: "Texas",
    },
    {
      _id: "4",
      first_name: "David",
      spouse_first_name: "Stokes",
      createdAt: new Date(),
      updatedAt: new Date(),
      resident_state: "California",
    },
    {
      _id: "5",
      first_name: "John",
      spouse_first_name: "Jane",
      createdAt: new Date(),
      updatedAt: new Date(),
      resident_state: "Georgia",
    },
    {
      _id: "6",
      first_name: "Alice",
      spouse_first_name: "Bob",
      createdAt: new Date(),
      updatedAt: new Date(),
      resident_state: "Texas",
    },
    {
      _id: "7",
      first_name: "Steve",
      spouse_first_name: "Walmer",
      createdAt: new Date(),
      updatedAt: new Date(),
      resident_state: "Pennsylvania",
    }, {
      _id: "8",
      first_name: "Roman",
      spouse_first_name: "Jency",
      createdAt: new Date(),
      updatedAt: new Date(),
      resident_state: "Los Angeles",
    },
  ];

  const fetchProfiles = async () => {
    setLoading(true);
    try {

      const data = dummyProfiles;
      console.log("Data fetched:", data);
      setProfiles(data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleCreateProFormaClick = () => {
    router.push("/taxproforma");
  };

  const handleEditProFormaClick = () => {
    router.push("/taxproforma");
  };

  const handleHouseholdDetailsEditClick = () => {
    router.push("/addhousehold");
  };

  const handleHouseholdDetailsDeleteClick = () => {
    setTaxModal(!taxModal);
  };

  const columns = [
    { name: "Name", selector: profiles => profiles.spouse_first_name ? `${profiles.first_name} And ${profiles.spouse_first_name}` : profiles.first_name, sortable: true, searchable: true },
    { name: "Date Created", selector: profiles => moment(profiles.createdAt).format("MM/DD/YYYY"), sortable: true, searchable: true },
    { name: "Last Updated", selector: profiles => moment(profiles.updatedAt).format("MM/DD/YYYY"), sortable: true, searchable: true },
    { name: "State", selector: profiles => profiles.resident_state, sortable: true, searchable: true },
    {
      name: "Pro Forma",
      cell: profiles => (
        <div className={style.MainDivForProFormaButton}>
          <button className={style.CreateProFormaButton} onClick={() => handleCreateProFormaClick(profiles)}>
            {ic_ViewIcon.icon()} View
          </button>
          <button className={style.EditFormaButton} onClick={() => handleEditProFormaClick(profiles)}>
            {ic_EditYello.icon()} Edit
          </button>
        </div>
      ),
    },
    {
      name: "HouseHold Details",
      cell: profiles => (
        <div className={style.MainDivForHouseHoldDetailsButton}>
          <button className={style.EditHouseHoldButton} onClick={() => handleHouseholdDetailsEditClick(profiles)}>
            {ic_EditBody.icon()} Edit
          </button>
          <button className={style.DeleteFormaButton} onClick={() => handleHouseholdDetailsDeleteClick(profiles)}>
            {ic_Delete.icon()}
          </button>
        </div>
      ),
    },
  ];

  const filteredProfiles = profiles.filter(profile => {
    return (
      profile.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.resident_state.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleCloseModal = () => {
    setTaxModal(!taxModal);
  };

  return (
    <>{taxModal && <Modal Heading={'Are you sure you want to delete this client?'} Caption={'Please type the clients first name to confirm:'} inputtext={true} isOpen={taxModal} onClose={handleCloseModal} onClick={handleHouseholdDetailsDeleteClick} />}

      <Heading2Fonts text={"Dashboard"} />
      <div className={style.DashboardMainContainer}>
        <div className={style.InnerCardDiv}>
          <div className={style.RightsideDiv}>
            <div className={style.svgDiv}>{ic_Client.icon()}</div>
            <div className={style.TextDiv}>Total clients </div>
          </div>
          <div className={style.LeftsideDiv}>
            <div className={style.PriceDiv}>254</div>
            <p className={style.PriceTextDiv}>in last month</p>
          </div>
        </div>
        <div className={style.InnerCardDiv}>
          <div className={style.RightsideDiv}>
            <div className={style.RightsideSvgDiv}>{ic_Page.icon()}</div>
            <div className={style.TextDiv}>Total Pro Formas Created </div>
          </div>
          <div className={style.LeftsideDiv}>
            <div className={style.PriceDiv}>254</div>
            <p className={style.PriceTextDiv}>in last month</p>
          </div>
        </div>
      </div>
      <div className={style.MainDivFordatatable}>
        <div className={style.MainDivForDataTableNev}>
          <div className={style.TotalClientProfiles}>Total Client Profiles (50)</div>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={style.SearchInput}
          />
          <div className={style.AddNewHousehold} onClick={() => handleHouseholdDetailsEditClick()}>Add New Household</div>
        </div>

        <DataTable
          keyField="_id"
          title="Profiles List"
          columns={columns}
          data={filteredProfiles}
          progressPending={loading}
          pagination
          paginationPerPage={6}
          paginationRowsPerPageOptions={[5, 10, 20]}
        />
      </div>
    </>
  );
}

export default Dashboard;