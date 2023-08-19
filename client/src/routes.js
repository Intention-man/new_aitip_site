// Сопоставление ссылки на страницу и загружающейся JS страницы (компонента)

import {
    ADMIN,
    ADMISSION_APE,
    ADMISSION_BAC,
    ARTICLE,
    AUTH,
    AVAILABLE_ENVIRONMENT, COMMON_INFO,
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
    PHOTO_GALLERY, SCHOLARSHIPS_AND_OTHER_SUPPORT,
    SCIENCE,
    STAFF, STANDARDS_AND_REQUIREMENTS,
    STRUCTURE,
    STUDENTS,
    SUPERADMIN,
    SUPPORT_AND_EQUIPMENT,
    VACANT_PLACES, WORKING_PROGRAMS
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
import NewsPage from "./pages/NewsPage";
import UsualPage from "./pages/UsualPage";
import DefinedNews from "./pages/DefinedNews";


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
        name: "Поступление - Дополнительное профессиональное образование"
    },
    {
        path: INTERNATIONAL_ACT,
        Component: <InternationalCooperation/>,
        name: "Международное сотрудничество"
    },
    {
        path: NEWS,
        Component: <NewsPage/>,
        name: "Новости"
    },
    {
        path: ARTICLE + "/:id",
        Component: <DefinedNews/>,
        name: "Новость"
    },
    {
        path: PARTNERS,
        Component: <Partners/>,
        name: "Партнёры"
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


    // Конструкторские страницы

    {
        path: HISTORY,
        Component: <UsualPage/>,
        name: "История"
    },
    {
        path: LEGAL_CLINIC,
        Component: <UsualPage/>,
        name: "Юридическая клиника"
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


    // Сведения об образовательной организации

    {
        path: INFO_EDU_ORG,
        Component: <UsualPage/>,
        name: "Сведения об образовательной организации"
    },

    {
        path: COMMON_INFO,
        Component: <UsualPage/>,
        name: "Основные сведения"
    },
    {
        path: STRUCTURE,
        Component: <UsualPage/>,
        name: "Структура и органы управления образовательной организацией"
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
        path: STANDARDS_AND_REQUIREMENTS,
        Component: <UsualPage/>,
        name: "Образовательные стандарты и требования"
    },
    {
        path: SUPPORT_AND_EQUIPMENT,
        Component: <UsualPage/>,
        name: "Материально-техническое обеспечение и оснащенность образовательного процесса"
    },
    {
        path: SCHOLARSHIPS_AND_OTHER_SUPPORT,
        Component: <UsualPage/>,
        name: "Стипендии и иные виды материальной поддержки"
    },
    {
        path: PAID_SERVICES,
        Component: <UsualPage/>,
        name: "Платные образовательные услуги"
    },
    {
        path: FINANCIAL_ACTIVITY,
        Component: <UsualPage/>,
        name: "Финансово-хозяйственная деятельность"
    },
    {
        path: VACANT_PLACES,
        Component: <UsualPage/>,
        name: "Вакантные места для приема (перевода) обучающихся"
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
        path: WORKING_PROGRAMS,
        Component: <UsualPage/>,
        name: "Рабочие программы"
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