import React from 'react';
import Card from '../../../components/card/Card';
import Content1Img from '../../../local_assets/Content1_photo.png'; // TODO: загрузка изображений с сервера

const AdmissionBacContent1 = () => {
    return (
        <Card
            // Здесь нет пропа title, так как заголовок у данной карточки содержит ссылку. Пришлось вручную прописать h1 с ссылкой в её теле ниже.
            imgSrc={Content1Img}
            imgPos='left'
            width={12}
        >
            <h1 className='Card-shiftedTitle'>Почему стоит поступать в <a href='' style={{color: '#076DB1'}}>АИТиП</a>?</h1>
            <h2>Потому что у нас:</h2>
            <ul className='Card-megaList'>
                <li>ведущие <a href='' style={{color: '#076DB1'}}>преподаватели</a> региона</li> {/* TODO: заменить ссылки */}
                <li>современные <a href='' style={{color: '#076DB1'}}>программы обучения</a></li>
                <li>углубленное изучение <a href='' style={{color: '#076DB1'}}>экономики</a> и <a href='' style={{color: '#076DB1'}}>права</a></li>
                <li>комфортные и уютные <a href='' style={{color: '#076DB1'}}>корпуса</a></li>
                <li>эффективное <a href='' style={{color: '#076DB1'}}>содействие в трудоустройстве</a></li>
            </ul>
        </Card>
    );
}

export default AdmissionBacContent1;
