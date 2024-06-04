import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUse } from "./store";

export default function User() {
  const [isLoading, setIsLoading] = useState(true); // State to track loading state
  const users = useSelector((state) => state.user.users);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch user data after 3 seconds
    const fetchDataTimeout = setTimeout(() => {
      setIsLoading(false); // After 3 seconds, set isLoading to false
      dispatch(fetchUse());
    }, 5000); // 3000 milliseconds = 3 seconds

    // Cleanup function to clear the timeout
    return () => clearTimeout(fetchDataTimeout);
  }, []); // Dispatch dependency ensures useEffect runs only once

  return (
    <>
      <div className="container">
       
        {isLoading && <h2>Loading data, please wait...</h2>}
        {!isLoading && status === "loading" && (
          <h2>Getting the data, please wait...</h2>
        )}

        {status === "completed" && (
          <>
           <h2 className="text-primary text-center m-5">
          User data using Redux Toolkit
        </h2>
          <table className="table table-border w-75">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </>
        )}
        {error && <h2>404 not found</h2>}
      </div>
    </>
  );
}
