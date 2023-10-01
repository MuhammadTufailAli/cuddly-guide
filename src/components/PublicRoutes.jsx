import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

function PublicRoutes() {
  const navigate = useNavigate();
  const [RunUseEffectFirst, setRunUseEffectFirst] = useState(false);
  useEffect(() => {
    const userdetails = JSON.parse(localStorage.getItem("userdetails"));
    console.log(userdetails);
    if (userdetails) {
      console.log("Inside if");
      const userCredentials = {
        email: userdetails?.email,
        password: userdetails?.password,
      };

      const CheckUserIsValid = async () => {
        try {
          const result = await axios.post(
            "http://localhost:3000/users/signin",
            userCredentials
          );

          console.log(result);
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
          setRunUseEffectFirst(true);
        }
      };
      CheckUserIsValid();
    } else {
      setRunUseEffectFirst(true);
    }
  }, []);
  return RunUseEffectFirst ? <Outlet /> : null;
}

export default PublicRoutes;
