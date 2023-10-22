import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
var url = process.env.REACT_APP_API_KEY;
function ProtectedRoutes() {
  const navigate = useNavigate();
  const [RunUseEffectFirst, setRunUseEffectFirst] = useState(false);

  useEffect(() => {
    const userdetails = JSON.parse(localStorage.getItem("userdetails"));
    console.log(userdetails);
    if (userdetails) {
      console.log("Inside if", userdetails);
      const userCredentials = {
        email: userdetails?.email,
        password: userdetails?.password,
      };

      const CheckUserIsValid = async () => {
        try {
          const result = await axios.post(
            `${url}users/signin`,
            userCredentials
          );
          setRunUseEffectFirst(true);
          if (userdetails?.role === "Mentor") {
            if (userdetails?.subject) {
              navigate("/lecturerDashboard");
            } else {
              navigate("/mentotSubjectReg");
            }
          } else if (userdetails?.role === "Student") {
            navigate("/studentChooseLang");
          } else {
            navigate("/chooseSubject");
          }
        } catch (err) {
          navigate("/login");
        }
      };
      CheckUserIsValid();
    } else {
      navigate("/login");
    }
  }, []);
  return RunUseEffectFirst ? <Outlet /> : null;
}

export default ProtectedRoutes;
