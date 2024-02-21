/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { useEffect } from "react";
import "./MyJobs.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UpdateJobModal from "../UpdateJobModal/UpdateJobModal";
// import UpdateJobModal from "../UpdateJobModal/UpdateJobModal";

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  console.log(jobs);
  const [searchText, setSearchText] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [control, setControl] = useState(false);
  const user1 = { email: "S@gmail.com" };
  // useEffect(() => {
  //   fetch(`http://localhost:5000/myJobs/${user?.email}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setJobs(data);
  //     });
  // }, [user, control]);
  useEffect(() => {
    fetch(`http://localhost:3000/myJobs/${user1?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        console.log(data);
      });
  }, [user1?.email, control]);

  // const handleSearch = () => {
  //   fetch(`http://localhost:5000/getJobsByText/${searchText}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setJobs(data);
  //     });
  // };

  const handleSearch = () => {
    fetch(`http://localhost:3000/searchTitleAndCategory/${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  };

  const handleJobUpdate = (data) => {
    console.log(data);
    fetch(`http://localhost:3000/updateJob/${data?.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.modifiedCount > 0) {
          setControl(!control);
          setModalShow(false);
        }
      });
  };

  // const handleJobUpdate = (data) => {
  //   console.log(data);
  //   fetch(`http://localhost:5000/updateJob/${data._id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       if (result.modifiedCount > 0) {
  //         setControl(!control);
  //       }
  //       console.log(result);
  //     });
  // };

  return (
    <div>
      <div className="my-jobs-container">
        <h1 className="text-center p-4 ">ALL My Jobs</h1>
        <div className="search-box p-2 text-center">
          <input
            // onChange={(e) => setSearchText(e.target.value)}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            type="text"
            className="p-1"
          />{" "}
          <button onClick={handleSearch}>Search</button>
        </div>
        {/* <Table striped bordered hover className="container">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>vacancy</th>
              <th>salary</th>
              <th>Edit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs?.map((job, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{job.title}</td>
                <td>{job.category}</td>
                <td>{job.vacancy}</td>
                <td>{job.salary}</td>
                <td>
                  <Button variant="primary" onClick={() => setModalShow(true)}>
                    Edit
                  </Button>
                  <UpdateJobModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    job={job}
                    handleJobUpdate={handleJobUpdate}
                  />
                </td>
                <td>
                  {" "}
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table> */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Vacancy</th>
              <th scope="col">Salary</th>
              <th scope="col">Edit</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{job.title}</td>
                <td>{job.category}</td>
                <td>{job.vacancy}</td>
                <td>{job.category}</td>
                <td>
                  <Button variant="primary" onClick={() => setModalShow(true)}>
                    Edit
                  </Button>
                </td>
                <td>
                  <button>Delete</button>
                </td>
                <UpdateJobModal
                  show={modalShow}
                  job={job}
                  handleJobUpdate={handleJobUpdate}
                  onHide={() => setModalShow(true)}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyJobs;
