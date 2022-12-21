import { createBrowserRouter } from "react-router-dom";

import Home from '@pages/Home';
import Login from '@pages/Login';
import Register from '@pages/Register';
import VacanciesList from "@pages/Admin/Vacancies/List";
import VacanciesNew from "@pages/Admin/Vacancies/New";
import VacanciesEdit from "@pages/Admin/Vacancies/Edit";
import CandidatesList from "@pages/Admin/Candidates/List";
import CandidatesNew from "@pages/Admin/Candidates/New";
import CandidatesEdit from "@pages/Admin/Candidates/Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    children: [
      {
        path: "vacancies",
        element: <VacanciesList />,
      },
      {
        path: "vacancies/new",
        element: <VacanciesNew />,
      },
      {
        path: "vacancies/edit/:id",
        element: <VacanciesEdit />,
      },
      {
        path: "candidates",
        element: <CandidatesList />,
      },
      {
        path: "candidates/new",
        element: <CandidatesNew />,
      },
      {
        path: "candidates/edit/:id",
        element: <CandidatesEdit />,
      },
    ],
  },
]);

export default router;