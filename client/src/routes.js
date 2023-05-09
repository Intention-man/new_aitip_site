// Сопоставление ссылки на страницу и загружающейся JS страницы (компонента)

import {
    ADMIN, ADMISSION_APE, ADMISSION_BAC, AUTH, CONTACTS, COUNTERING, DOCUMENTS, EDUCATIONAL_P,
    EMPLOYERS_P,PARTNERS,
    HISTORY, INDUSTRIAL_P, INFO_EDU_ORG, INTERNATIONAL_ACT,
    LEGAL_CLINIC,
    MAIN_ROUTE, PERSONALITIES_PAGE, SCIENCE, SCIENCE_P, STAFF,
    STRUCTURE, STUDENTS, SUPERADMIN, TEST
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
import Students from "./pages/Students/Students";
import SciencePartners from "./pages/Partners/SciencePartners";
import Auth from "./pages/Auth";
import SuperAdminPage from "./pages/SuperAdminPage";
import Test from "./pages/Test";
import Partners from "./pages/Partners/Partners";


export const publicRoutes = [
    {
        path: PARTNERS,
        Component: <Partners/>,
        name: "Партнёры"
    },
    {
        path: TEST,
        Component: <Test/>,
        name: "Тесты всякие"
    },
    {
        path: MAIN_ROUTE,
        Component: <Main/>,
        name: "Главная"
    },
    {
        path: CONTACTS,
        Component: <Contacts/>,
        name: "Контакты"
    },
    {
        path: INDUSTRIAL_P,
        Component: <IndustrialPartners/>,
        name: "Индустриальные партнёры"
    },
    {
        path: EDUCATIONAL_P ,
        Component: <EducationalPartners/>,
        name: "Образовательные партнёры"
    },
    {
        path: EMPLOYERS_P,
        Component: <EmployersPartners/>,
        name: "Партнёры-работодатели"
    },
    {
        path: SCIENCE_P,
        Component: <SciencePartners/>,
        name: "Научные партнёры"
    },
    {
        path: HISTORY,
        Component: <History/>,
        name: "История"
    },
    {
        path: PERSONALITIES_PAGE,
        Component: <PersonalitiesPage/>,
        name: "Персоналии"
    },
    {
        path: STRUCTURE,
        Component: <Structure/>,
        name: "Структура"
    },
    {
        path: INFO_EDU_ORG,
        Component: <InfoAboutEducationalOrganization/>,
        name: "Сведения об образовательной организации"
    },
    {
        path: INTERNATIONAL_ACT ,
        Component: <InternationalCooperation/>,
        name: "Международное сотрудничество"
    },
    {
        path: COUNTERING,
        Component: <Countering/>,
        name: "Противодействие угрозам"
    },
    {
        path: LEGAL_CLINIC,
        Component: <LegalClinic/>,
        name: "Юридическая клиника"
    },
    {
        path: ADMISSION_BAC,
        Component: <AdmissionBac/>,
        name: "Поступление - Бакалавриат"
    },
    {
        path: ADMISSION_APE,
        Component: <AdmissionAdd/>,
        name: "Поступление - ДПО"
    },
    {
        path: DOCUMENTS,
        Component: <Documents/>,
        name: "Документы"
    },

    {
        path: SCIENCE,
        Component: <Science/>,
        name: "Наука"
    },
    {
        path: STAFF,
        Component: <Employees/>,
        name: "Сотрудникам"
    },
    {
        path: STUDENTS,
        Component: <Students/>,
        name: "Студентам"
    },
    {
        path: AUTH,
        Component: <Auth/>, 
        name: "Авторизация"
    },
]

export const authRoutes = [
    {
        path: ADMIN,
        Component: <Admin/>,
        name: "Страница администратора"
    },
    {
        path: SUPERADMIN,
        Component: <SuperAdminPage/>,
        name: "СуперАдмин"
    },
]