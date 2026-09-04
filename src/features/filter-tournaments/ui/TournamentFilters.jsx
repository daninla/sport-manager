import { useState } from 'react';

import Accordion from '@/shared/ui/Accordion/Accordion';

function TournamentFilters({ handleFilterChange }) {
  const [activeFilters, setActiveFilters] = useState([]);

  const handleFilterClick = (filterValue) => {
    const newFilters = activeFilters.includes(filterValue)
      ? activeFilters.filter((f) => f !== filterValue)
      : [...activeFilters, filterValue];

    setActiveFilters(newFilters);
    handleFilterChange(newFilters);
  };

  return (
    <div
      style={{
        marginTop: '20px',
        marginLeft: '10px',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '5px',
        width: '250px',
        position: 'absolute',
        zIndex: 99,
      }}
    >
      <Accordion title="Tournament Status">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <label>
            <input
              type="checkbox"
              value="upcoming"
              onChange={() => handleFilterClick('upcoming')}
            />
            Upcoming
          </label>

          <label>
            <input
              type="checkbox"
              value="ongoing"
              onChange={() => handleFilterClick('ongoing')}
            />
            Ongoing
          </label>

          <label>
            <input
              type="checkbox"
              value="completed"
              onChange={() => handleFilterClick('completed')}
            />
            Completed
          </label>
        </div>
      </Accordion>

      <Accordion title="BracketFormat">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <label>
            <input
              type="checkbox"
              value="Round Robin"
              onChange={() => handleFilterClick('Round Robin')}
            />
            Round Robin
          </label>

          <label>
            <input
              type="checkbox"
              value="Swiss System"
              onChange={() => handleFilterClick('Swiss System')}
            />
            Swiss System
          </label>

          <label>
            <input
              type="checkbox"
              value="Mixed System"
              onChange={() => handleFilterClick('Mixed System')}
            />
            Mixed System
          </label>
        </div>
      </Accordion>
    </div>
  );
}

export default TournamentFilters;
