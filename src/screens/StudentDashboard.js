import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Grid, Button } from "@mui/material";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
  useParams,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import pdf from "../assets/images/pdf.png";

import axios from "axios";
const StudentDashboard = () => {
  const userdetails = JSON.parse(localStorage.getItem("userdetails"));
  const SelectedCatByStudent = JSON.parse(
    localStorage.getItem("SelectedCatByStudent")
  );
  const navigate = useNavigate();
  const [MentorLecture, setMentorLecture] = useState([]);
  const [showLectures, setshowLectures] = useState(false);

  useEffect(() => {
    const getSelectedCatLecture = async () => {
      const cat = {
        category: SelectedCatByStudent,
      };

      try {
        const result = await axios.post(
          "http://localhost:3000/lecture/getLecturesByCategory",
          cat
        );
        const originalArray = result?.data?.data;

        localStorage.setItem("Lectures", JSON.stringify(result?.data?.data));
        if (result?.data?.data.length > 3) {
          setMentorLecture(originalArray.slice(0, 3));
        } else {
          setMentorLecture(result?.data?.data);
        }
        setshowLectures(true);
      } catch (err) {
        console.log(err?.response?.data?.message);
      }
    };
    getSelectedCatLecture();
  }, []);

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

  const CreateConversation = async (receiver) => {
    const usersIds = {
      senderId: userdetails?._id,
      receiverId: receiver,
    };
    try {
      const result = await axios.post(
        "http://localhost:3000/conversation",
        usersIds
      );

      console.log(result);
      navigate("/Messenger");
    } catch (err) {
      console.log(err);
    }
  };

  const typographyStyles = {
    marginTop: 20,
    marginLeft: 70,
    fontSize: 18,
    color: "#212A3E",
    fontWeight: "500",
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
      <div>
        <Typography style={typographyStyles}>Code Guider</Typography>
      </div>
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
              <Typography variant="h6">
                {MentorLecture ? MentorLecture.length : 0}
              </Typography>
              <Typography variant="body2">Lecture available</Typography>
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
              <Typography variant="h6">
                {SelectedCatByStudent?.length}
              </Typography>
              <Typography variant="body2">Languages Selected</Typography>
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
              <Typography variant="h6">4</Typography>
              <Typography variant="body2">People</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {showLectures ? (
        MentorLecture.length < 1 ? (
          <p>No Lecture available in these categories</p>
        ) : (
          <>
            <Button
              onClick={() => navigate("/ViewAll")}
              style={{
                display: "flex",
                marginLeft: "auto",
                marginRight: 70,
                marginTop: 30,
              }}>
              View All
            </Button>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              style={{ marginTop: 40 }}>
              {MentorLecture.map((data) => {
                return (
                  <Grid item xs={12} sm={6} md={4}>
                    <Card
                      style={{
                        width: 350,
                        height: 250,
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}>
                      <CardContent>
                        <Typography variant="h6">{data?.MentorName}</Typography>
                        <Typography variant="body2">
                          {data?.lectureName}
                        </Typography>
                        <Typography variant="body2">
                          {data?.lectureDescription}
                        </Typography>
                        <img
                          onClick={() =>
                            handleDownloadPDF(
                              data.pdfData,
                              data.lecturePdfLocation
                            )
                          }
                          src={pdf}
                          alt="PDF"
                          style={{
                            width: 80,
                            height: 80,
                            cursor: "pointer",
                            marginTop: 25,
                          }}
                        />
                        <Button
                          onClick={() => {
                            CreateConversation(data?.refOfUser);
                          }}
                          style={{
                            display: "flex",
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: 15,
                          }}>
                          Message
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </>
        )
      ) : (
        <p>Please wait</p>
      )}
    </div>
  );
};

export default StudentDashboard;
