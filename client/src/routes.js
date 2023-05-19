// Сопоставление ссылки на страницу и загружающейся JS страницы (компонента)

import {
    ADMIN, ADMISSION_APE, ADMISSION_BAC, AUTH, CONTACTS, COUNTERING, DOCUMENTS,
    HISTORY, INFO_EDU_ORG, INTERNATIONAL_ACT,
    LEGAL_CLINIC,
    MAIN_ROUTE, PERSONALITIES_PAGE, SCIENCE, PARTNERS, STAFF,
    STRUCTURE, STUDENTS, SUPERADMIN, TEST, NEWS
} from "./consts/pageConsts";
import Main from "./pages/Main";
import Contacts from "./pages/Institute/Contacts";
import History from "./pages/Institute/History";
import Structure from "./pages/Institute/Structure";
import InfoAboutEducationalOrganization from "./pages/Institute/InfoAboutEducationalOrganization";
import InternationalCooperation from "./pages/Institute/InternationalCooperation";
import Countering from "./pages/Institute/Countering";
import Admin from "./pages/Admin";
import PersonalitiesPage from "./pages/Institute/PersonalitiesPage";
import AdmissionBac from "./pages/Admission/AdmissionBac";
import AdmissionAdd from "./pages/Admission/AdmissionAdd";
import Documents from "./pages/Institute/Documents";
import Employees from "./pages/Employees/Employees";
import Students from "./pages/Students/Students";
import Auth from "./pages/Auth";
import SuperAdminPage from "./pages/SuperAdminPage";
import Partners from "./pages/Partners";
import LegalClinic from "./pages/LegalClinic";
import Science from "./pages/Science";
import News from "./pages/News";


export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: <Main/>,
        name: "Главная"
    },
    {
        path: NEWS,
        Component: <News/>,
        name: "Новости"
    },
    {
        path: CONTACTS,
        Component: <Contacts/>,
        name: "Контакты"
    },

    {
        path: PARTNERS,
        Component: <Partners/>,
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