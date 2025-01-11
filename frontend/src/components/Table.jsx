// Importing libraries, functional components for using them in a table which will show data from server
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import EditUserModal from "./modals/EditUserModal";
import CreateUserModal from "./modals/CreateUserModal";
import DeleteUserModal from "./modals/DeleteUserModal";

// Creation of the parent functional component which will be passed to app.jsx
function Table() {
  // Using useState, useRef for state variables and ref to track if fetch has already been attempted
  const [users, setUsers] = useState([]);
  const hasFetchedUsers = useRef(false);

  // Async await useEffect function for fetching data from server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Use the REACT_APP_BACKEND_URL from environment variables
        const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";
        const response = await axios.get(`${backendUrl}/users`);
        
        // Setting the empty array as a JSON object of users got from the server
        setUsers(response.data);

        // Using the useRef current which is the same as initialized until changes
        if (!hasFetchedUsers.current) {
          toast.success("Data Fetched");
          hasFetchedUsers.current = true; // Set the ref to true after first fetch
        }
      } catch (error) {
        console.log("There was an error fetching the users!", error);

        // If we haven't fetched it, stay as it is
        if (!hasFetchedUsers.current) {
          toast.error("Error Fetching Data");
          hasFetchedUsers.current = true; // Set the ref to true after first fetch attempt
        }
      }
    };

    // Calling the function here
    fetchUsers();
  }, []);

  // After adding or creating a new user, we normally would have to manually reload the page but with this function, we just add the created user at the last of the fetched JSON object which we saved as an array
  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  // Using bootstrap pre-built components and modal components
  return (
    <>
      <Toaster richColors closeButton />
      <div className="container mt-5">
        <h1 className="mb-4" id="h1">
          User Table
        </h1>
        <CreateUserModal addUser={addUser} />
        <EditUserModal />
        <DeleteUserModal />

        {users.length === 0 ? (
          <h3 id="h3">No Users in Database</h3>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

// Exporting the component to be using it in the app.jsx
export default Table;
