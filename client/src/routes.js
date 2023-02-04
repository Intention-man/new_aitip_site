// Сопоставление ссылки на страницу и загружающейся JS страницы (компонента)

import {
    ADMIN, ADMISSION_APE, ADMISSION_BAC, AUTH, CONTACTS, COUNTERING, DOCUMENTS, EDUCATIONAL_P,
    EMPLOYERS_P,
    HISTORY, INDUSTRIAL_P, INFO_EDU_ORG, INTERNATIONAL_ACT,
    LEGAL_CLINIC,
    MAIN_ROUTE, PERSONALITIES_PAGE, SCIENCE, SCIENCE_P, STAFF,
    STRUCTURE, STUDENTS_APE, STUDENTS_BAC
} from "./consts/pageConsts";
import Main from "./pages/Main";
import Contacts from "./pages/Institute/Contacts";
import IndustrialPartners from "./pages/Partners/IndustrialPartners";
import EducationalPartners from "./pages/Partners/EducationalPartners";
import EmployersPartners from "./pages/Partners/EmployersPartners";
import History from "./pages/Institute/History";
import Structure from "./pages/Institute/Structure";
import InfoAboutEducationalOrganization from "./pages/Institute/InfoAboutEducationalOrganization";
import InternationalCooperation from "./pages/Institute/InternationalCooperation";
import Countering from "./pages/Institute/Countering";
import Admin from "./pages/Admin";
import PersonalitiesPage from "./pages/Institute/PersonalitiesPage";
import LegalClinic from "./pages/Partners/LegalClinic";
import AdmissionBac from "./pages/Admission/AdmissionBac";
import AdmissionAdd from "./pages/Admission/AdmissionAdd";
import Documents from "./pages/Institute/Documents";
import Science from "./pages/Science/Science";
import Employees from "./pages/Employees/Employees";
import StudentsBac from "./pages/Students/StudentsBac";
import StudentsAdd from "./pages/Students/StudentsAdd";
import SciencePartners from "./pages/Partners/SciencePartners";
import Auth from "./pages/Auth";


export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: <Main/>
    },
    {
        path: CONTACTS,
        Component: <Contacts/>
    },
    {
        path: INDUSTRIAL_P,
        Component: <IndustrialPartners/>
    },
    {
        path: EDUCATIONAL_P ,
        Component: <EducationalPartners/>
    },
    {
        path: EMPLOYERS_P,
        Component: <EmployersPartners/>
    },
    {
        path: SCIENCE_P,
        Component: <SciencePartners/>
    },
    {
        path: HISTORY,
        Component: <History/>
    },
    {
        path: PERSONALITIES_PAGE,
        Component: <PersonalitiesPage/>
    },
    {
        path: STRUCTURE,
        Component: <Structure/>
    },
    {
        path: INFO_EDU_ORG,
        Component: <InfoAboutEducationalOrganization/>
    },
    {
        path: INTERNATIONAL_ACT ,
        Component: <InternationalCooperation/>
    },
    {
        path: COUNTERING,
        Component: <Countering/>
    },
    {
        path: LEGAL_CLINIC,
        Component: <LegalClinic/>
    },
    {
        path: ADMISSION_BAC,
        Component: <AdmissionBac/>
    },
    {
        path: ADMISSION_APE,
        Component: <AdmissionAdd/>
    },
    {
        path: DOCUMENTS,
        Component: <Documents/>
    },

    {
        path: SCIENCE,
        Component: <Science/>
    },
    {
        path: STAFF,
        Component: <Employees/>
    },
    {
        path: STUDENTS_BAC,
        Component: <StudentsBac/>
    },
    {
        path: STUDENTS_APE,
        Component: <StudentsAdd/>
    },
    {
        path: AUTH,
        Component: <Auth/>
    },
]

export const authRoutes = [
    {
        path: ADMIN,
        Component: <Admin/>
    },
]