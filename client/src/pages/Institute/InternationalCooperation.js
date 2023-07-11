import React from 'react';
import Block from "../../components/display/Block";
import Card from "../../components/lines/Card";
import "../../css/page_styles/internationalCooperation.css"
//Картинки
import city from "../../local_assets/international-city.png";
import city2 from "../../local_assets/international-city2.png";
import city3 from "../../local_assets/international-city3.png";
import globus from "../../local_assets/icons/global.svg";
import denis from "../../local_assets/international-denis.png";
import eduard from "../../local_assets/international-eduard.png";
import germany from "../../local_assets/background-germany.png";
import germany2 from "../../local_assets/background-germany2.png";

const InternationalCooperation = () => {
    const internationalStudents = 3;
    const internationalTeachers = 1;

    return (
        <>
            <h1 className="page_title">Международное сотрудничество</h1>
            {/*<h2 className="block_title">Общие данные</h2>*/}
            <Block header="Общие данные">
                <Card imgType="fading" imgSrc={city} className="international_info">
                    <p className="card_title">Международное сотрудничество в <span
                        style={{color: "var(--aitip_blue)"}}>АИТиП</span>:</p>
                    <p className="international_cooperators">
                        <span>{internationalStudents}</span>
                        {"иностранны" + (internationalStudents > 1 ? "х" : "й") + " обучающи" + (internationalStudents > 1 ? "хся" : "йся")}
                    </p>
                    <p className="international_cooperators">
                        <span>{internationalTeachers}</span>
                        {internationalTeachers > 1 ? "иностранных педагогов и научных работников" : "иностранный педагог и научный работник"}
                    </p>
                    <p style={{margin: "10px 25px"}}>Алтайский институт труда и права осуществляет международное
                        сотрудничество на базе ОУП ВО
                        «Академия труда и социальных отношений». В настоящее время Академией подписано множество
                        договоров о международном сотрудничестве.</p>
                    <a href="https://atiso.ru/sveden/inter/" style={{marginLeft: "25px", marginBottom: "10px"}}><img
                        src={globus} alt="" height="27" style={{marginRight: "5px"}}></img>https://atiso.ru/sveden/inter/</a>
                </Card>
            </Block>
            {/*<h2 className="block_title">Иностранные студенты и выпускники</h2>*/}
            <Block header="Иностранные студенты и выпускники">
                <div style={{background: "url(" + germany + ")  left top no-repeat", backgroundSize: "350px"}}
                     className="card_no_background">
                    <Card imgType="rounded" imgSrc={denis} className="international_stud">
                        <p className="card_title" style={{marginTop: "auto"}}>Денис Вальтер<br/>
                            (Аугсбург, Германия)</p>
                        <p style={{marginBottom: "auto"}}>
                            международный специалист по оценке, экспертизе и управлению недвижимостью, сертифицированный
                            эксперт РП ФРГ, сертифицированный эксперт ТПП ФРГ, сертифицированный маклер ТПП ФРГ
                        </p>
                    </Card>
                    <Card imgType="fading" imgSrc={city2} imgPos="right" className="international_info">
                        <p>Денис является бакалавром юриспруденции (Алтайский институт труда и права (филиал) ОУП ВО
                            «АТиСО»), также он прошел обучение в рамках специальной программы ДПО "Фундаментальная
                            экономика и общество" на базе Алтайского института труда и права.
                        </p>
                    </Card>
                </div>
            </Block>
            {/*<h2 className="block_title">Иностранные педагоги и научные работники</h2>*/}
            <Block header="Иностранные педагоги и научные работники">
                <div style={{background: "url(" + germany2 + ")  right top no-repeat", backgroundSize: "350px", paddingBottom: "1px"}}
                     className="card_no_background">
                    <Card imgType="rounded" imgSrc={eduard} className="international_stud" imgPos="right">
                        <p className="card_title" style={{marginTop: "auto"}}>Эдуард Иванович Рау<br/>
                            (Франкфурт-на-Майне, Германия)</p>
                        <p  style={{marginBottom: "auto"}}>
                            кандидат экономических наук, доцент
                        </p>
                    </Card>
                    <Card imgType="fading" imgSrc={city3} className="international_info">
                        <p>Эдуард Иванович является единственным специалистом высшей квалификации, занимающимся
                            исследованием рынка ценных бумаг в Алтайском крае. Кандидатская диссертация Эдуарда
                            Ивановича по теме «Диагностика регионального развивающегося рынка ценных бумаг (на примере
                            Алтайского края)» была защищена им в 2004 г. по специальности 08.00.10 - «Финансы, денежное
                            обращение, кредит» в Новосибирской государственной академии экономики и управления.
                        </p>
                    </Card>
                    <p className="extended_teacher_info">
                        На базе Алтайского института труда и права Эдуард Иванович участвовал в подготовке заявки и реализации крупного гранта Российского гуманитарного научного фонда (РГНФ), Научный проект № 11-03-00681а «Права работника в случае несостоятельности (банкротства) работодателя».
                        <br/><br/>
                        В настоящее время Эдуард Иванович является научным консультантом по развитию программ Дополнительного профессионального образования в Институте.
                    </p>
                </div>
            </Block>
        </>
    );
};

export default InternationalCooperation;
