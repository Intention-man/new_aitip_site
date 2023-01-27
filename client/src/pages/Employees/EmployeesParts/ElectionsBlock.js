import React from 'react';

const ElectionsBlock = ({elections}) => {
    return (
        <div>
            <h1>Выборы</h1>
            {elections.map(election =>
                <div key={election.id}>{election.name} {election.eventDate} {election.eventTime}</div>
            )}
        </div>
    );
};

export default ElectionsBlock;
