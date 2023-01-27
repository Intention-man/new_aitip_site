import React from 'react';

const ContestsBlock = ({contests}) => {
    return (
        <div>
            <h1>Конкурсы</h1>
            {contests.map(contest =>
                <div key={contest.id}>{contest.name} {contest.eventDate} {contest.eventTime}</div>
            )}
        </div>
    );
};

export default ContestsBlock;
