import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, Grid, Button } from "@mui/material";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import pdf from "../assets/images/pdf.png";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LecturerDashboard = () => {
  const userdetails = JSON.parse(localStorage.getItem("userdetails"));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [lectureName, setLectureName] = useState("");
  const [lectureDescription, setLectureDescription] = useState("");
  const [attachments, setAttachments] = useState("");

  const [MentorLecture, setMentorLecture] = useState([]);
  const [getLectureAgain, setgetLectureAgain] = useState(true);
  const [pdfURL, setPdfURL] = useState("");

  //Getting Mentor Lectures

  useEffect(() => {
    const getMentorLectures = async () => {
      const userId = {
        id: userdetails?._id,
      };

      try {
        const result = await axios.post(
          "http://localhost:3000/lecture/getMentorLectures",
          userId
        );
        console.log(result?.data?.data);
        setMentorLecture(result?.data?.data);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    };
    getMentorLectures();
  }, [getLectureAgain]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownloadPDF = async (pdfData, pdfFileName) => {
    const pdfName = {
      pdfFileName: pdfFileName,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/lecture/downloadLeacture",
        pdfName,
        { responseType: "blob" }
      );
      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfFileName; // Set the filename for the download
      document.body.appendChild(a);
      a.click();

      // Clean up the URL object
      window.URL.revokeObjectURL(url);

      // window.location.href = url;
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  const handleUpload = async () => {
    console.log("Lecture Name:", lectureName);
    console.log("Lecture Description:", lectureDescription);
    console.log("Attachments:", attachments);

    if (
      lectureName.trim() === "" ||
      lectureDescription.trim() === "" ||
      attachments === ""
    ) {
      toast.error("Please enter all fields");
    } else {
      const lectureDetails = new FormData();
      lectureDetails.append("pdfFile", attachments);
      lectureDetails.append("lectureName", lectureName);
      lectureDetails.append("lectureDescription", lectureDescription);
      lectureDetails.append("refOfUser", userdetails?._id);
      lectureDetails.append("category", userdetails?.subject);
      lectureDetails.append("MentorName", userdetails?.name);

      try {
        const result = await axios.post(
          "http://localhost:3000/lecture/addLecture",
          lectureDetails
        );

        console.log(result);

        toast.success("Lecture added successfully");
        setgetLectureAgain(!getLectureAgain);
        setLectureName("");
        setLectureDescription("");
        setAttachments("");
        setOpen(false);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    }

    // setOpen(false);
  };
  const iconStyles = {
    fontSize: 24,
    color: "blue",
    marginLeft: 10,
  };

  const handleOpenChat = () => {
    navigate("/Messenger");
  };
  return (
    <div style={{ marginBottom: 30 }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Typography
        style={{
          marginTop: 50,
          marginLeft: 70,
          fontSize: 18,
          color: "#212A3E",
          fontWeight: "500",
        }}>
        Code Guider
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          style={{
            marginTop: 10,
            marginLeft: 70,
            fontSize: 25,
            fontFamily: "Roboto",
          }}>
          Welcome, {userdetails?.name}
          <div>
            <Button
              onClick={handleOpenChat}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 20,
                marginTop: 20,
              }}>
              Chat <FontAwesomeIcon icon={faComments} style={iconStyles} />
            </Button>
          </div>
        </Typography>

        <div>
          <Button
            style={{
              marginTop: 10,
              marginRight: 80,
              fontSize: 17,
              fontFamily: "Roboto",
            }}
            onClick={handleOpen}>
            Upload Lecture
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="upload-lecture-modal"
            aria-describedby="upload-lecture-description">
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "20px",
                width: "400px",
              }}>
              <Typography variant="h6">Upload Lecture</Typography>
              <TextField
                label="Lecture Name"
                fullWidth
                value={lectureName}
                onChange={(e) => setLectureName(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Lecture Description"
                fullWidth
                multiline
                rows={4}
                value={lectureDescription}
                onChange={(e) => setLectureDescription(e.target.value)}
                margin="normal"
              />
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setAttachments(e.target.files[0])}
                style={{ marginTop: "16px" }}
              />
              <Button
                onClick={handleUpload}
                variant="contained"
                color="primary"
                style={{ marginTop: "16px" }}>
                Upload
              </Button>
            </div>
          </Modal>
        </div>
      </div>

      <Typography
        style={{ marginLeft: 70, fontSize: 25, marginTop: 40, color: "red" }}>
        Lectures
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: 40 }}>
        {MentorLecture.length > 0 ? (
          MentorLecture.map((data, index) => {
            return (
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  style={{
                    width: 350,
                    height: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}>
                  <CardContent>
                    <Typography variant="h6">
                      Lecture {index + 1}: {data?.lectureName}
                    </Typography>
                    <Typography variant="body2">
                      {data?.lectureDescription}
                    </Typography>
                  </CardContent>
                  <img
                    onClick={() =>
                      handleDownloadPDF(data.pdfData, data.lecturePdfLocation)
                    }
                    src={pdf}
                    alt="PDF"
                    style={{ width: 80, height: 80, cursor: "pointer" }}
                  />
                </Card>
              </Grid>
            );
          })
        ) : (
          <p>No Lecture yet :(</p>
        )}
      </Grid>

      <Typography
        style={{ marginLeft: 70, fontSize: 25, marginTop: 40, color: "red" }}>
        Reviews
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: 10 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            style={{
              width: 350,
              height: 150,
              marginLeft: "auto",
              marginRight: "auto",
            }}>
            <CardContent>
              <Typography variant="h6">Reviewer Name 1</Typography>
              <Typography variant="body2">Detaild Review</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            style={{
              width: 350,
              height: 150,
              marginLeft: "auto",
              marginRight: "auto",
            }}>
            <CardContent>
              <Typography variant="h6">Reviewer Name 2</Typography>
              <Typography variant="body2">Detailed Review</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            style={{
              width: 350,
              height: 150,
              marginLeft: "auto",
              marginRight: "auto",
            }}>
            <CardContent>
              <Typography variant="h6">Reviewer Name 3</Typography>
              <Typography variant="body2">Deatiled Review</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default LecturerDashboard;
