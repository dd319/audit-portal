import React, { useState } from 'react';

const AccordionSection = ({ caseItem }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion-sect">
            <button className="accordion" onClick={toggleAccordion}>
                <div className="data">
                    <div><strong>Audit Type:</strong> {caseItem.auditType}</div>
                    <div><strong>Barcode:</strong> {caseItem.barcode}</div>
                    <div><strong>Status:</strong> {caseItem.status}</div>
                    <div><strong>Submitted Date:</strong> {caseItem.submittedDate}</div>
                </div>
            </button>
            {isOpen && (
                <div className="panel">
                    {/* Add detailed case information here */}
                </div>
            )}
        </div>
    );
};

export default AccordionSection;