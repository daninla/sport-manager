import { useState } from 'react';

import style from './Accordion.module.css';

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={style.accordion}>
      <div className={style.accordionHeader} onClick={toggleAccordion}>
        <h3>{title}</h3>

        <span>{isOpen ? '-' : '+'}</span>
      </div>

      {isOpen && (
        <div className={style.accordionContent}>
          <div className={style.accordionItem}>{children}</div>
        </div>
      )}
    </div>
  );
}

export default Accordion;
