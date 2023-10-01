import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./screens/Signup";
import Login from "./screens/Login";
import AppHeader from "../src/components/AppHeader";
import ChooseSubject from "./screens/ChooseType";
import StudentWelcome from "./screens/StudentWelcome";
import StudentChooseLan from "./screens/StudentChooseLan";
import Mentor from "./screens/MentorWelcome";
import StudentDashboard from "./screens/StudentDashboard";
import MentorRegistrationForm from "./screens/MentorSubjectRegForm";
import LecturerDashboard from "./screens/LecturerDashboard";
import ViewAllMentors from "./screens/ViewAllMentors";
import PublicRoutes from "./components/PublicRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Messenger from "./screens/Messenger";
export default function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<SignUpPage />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="studentChooseLang" element={<StudentChooseLan />} />

          <Route path="chooseSubject" element={<ChooseSubject />} />
          <Route path="mentorWelcome" element={<Mentor />} />
          <Route path="studentWelcome" element={<StudentWelcome />} />
          {/* <Route path="studentWelcome" element={<StudentWelcome />} /> */}
          <Route path="studentDashboard" element={<StudentDashboard />} />
          <Route path="mentotSubjectReg" element={<MentorRegistrationForm />} />
          <Route path="lecturerDashboard" element={<LecturerDashboard />} />
          <Route path="ViewAll" element={<ViewAllMentors />} />
          <Route path="Messenger" element={<Messenger />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
