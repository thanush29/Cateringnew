import { Contact } from '../components/Contact';
import { useEffect } from 'react';

export function ContactPage() {
  // Ensure the page scrolls to the top when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen">
      <Contact isStandalone={true} />
    </div>
  );
}
