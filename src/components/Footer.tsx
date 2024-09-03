import React from 'react';

interface FooterProps {
  incompleteCount: number;
}

const Footer: React.FC<FooterProps> = ({ incompleteCount }) => {
  return (
    <footer>
      <p>You have {incompleteCount} task{incompleteCount !== 1 ? 's' : ''} left.</p>
    </footer>
  );
};

export default Footer;

  
  
  