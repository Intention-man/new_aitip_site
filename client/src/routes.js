// Сопоставление ссылки на страницу и загружающейся JS страницы (компонента)

import {
    ADMIN,
    ADMISSION_APE,
    ADMISSION_BAC,
    AUTH,
    AVAILABLE_ENVIRONMENT,
    CONTACTS,
    COUNTERING,
    DOCUMENTS,
    EDUCATION,
    FINANCIAL_ACTIVITY,
    HISTORY,
    INFO_EDU_ORG,
    INTERNATIONAL_ACT,
    LEGAL_CLINIC,
    MAIN_ROUTE,
    NEWS,
    PAID_SERVICES,
    PARTNERS,
    PERSONALITIES_PAGE,
    PHOTO_GALLERY,
    SCIENCE,
    STAFF,
    STRUCTURE,
    STUDENTS,
    SUPERADMIN,
    SUPPORT_AND_EQUIPMENT,
    VACANT_PLACES
} from "./consts/pageConsts";
import Main from "./pages/Main";
import InternationalCooperation from "./pages/Institute/InternationalCooperation";
import Admin from "./pages/Admin";
import Personalities from "./pages/Institute/Personalities";
import AdmissionBac from "./pages/Admission/AdmissionBac";
import AdmissionAdd from "./pages/Admission/AdmissionAdd";
import Employees from "./pages/Employees";
import Students from "./pages/Students";
import Auth from "./pages/Auth";
import SuperAdminPage from "./pages/SuperAdminPage";
import Partners from "./pages/Partners";
import News from "./pages/News";
import UsualPage from "./pages/UsualPage";


export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: <Main/>,
        name: "Главная"
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
        path: INTERNATIONAL_ACT ,
        Component: <InternationalCooperation/>,
        name: "Международное сотрудничество"
    },
    {
        path: NEWS,
        Component: <News/>,
        name: "Новости"
    },

    {
        path: PARTNERS,
        Component: <Partners/>,
        name: "Научные партнёры"
    },
    {
        path: PERSONALITIES_PAGE,
        Component: <Personalities/>,
        name: "Персоналии"
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
        path: AVAILABLE_ENVIRONMENT,
        Component: <UsualPage/>,
        name: "Доступная среда"
    },
    {
        path: CONTACTS,
        Component: <UsualPage/>,
        name: "Контакты"
    },
    {
        path: COUNTERING,
        Component: <UsualPage/>,
        name: "Противодействие угрозам"
    },
    {
        path: DOCUMENTS,
        Component: <UsualPage/>,
        name: "Документы"
    },
    {
        path: EDUCATION,
        Component: <UsualPage/>,
        name: "Образование"
    },
    {
        path: FINANCIAL_ACTIVITY,
        Component: <UsualPage/>,
        name: "Финансово-хозяйственная деятельность"
    },
    {
        path: HISTORY,
        Component: <UsualPage/>,
        name: "История"
    },
    {
        path: INFO_EDU_ORG,
        Component: <UsualPage/>,
        name: "Сведения об образовательной организации"
    },

    {
        path: LEGAL_CLINIC,
        Component: <UsualPage/>,
        name: "Юридическая клиника"
    },
    {
        path: PAID_SERVICES,
        Component: <UsualPage/>,
        name: "Платные образовательные услуги"
    },
    {
        path: PHOTO_GALLERY,
        Component: <UsualPage/>,
        name: "Фотогалерея"
    },
    {
        path: SCIENCE,
        Component: <UsualPage/>,
        name: "Наука"
    },
    {
        path: STRUCTURE,
        Component: <UsualPage/>,
        name: "Структура"
    },
    {
        path: SUPPORT_AND_EQUIPMENT,
        Component: <UsualPage/>,
        name: "Материально-техническое обеспечение и оснащенность образовательного процесса"
    },
    {
        path: VACANT_PLACES,
        Component: <UsualPage/>,
        name: "Вакантные места для приема (перевода) обучающихся"
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