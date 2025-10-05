import { Hero } from '../components/Hero';
import { OurStory } from '../components/OurStory';
import { CateringServices } from '../components/CateringServices';
import { GalleryPreview } from '../components/GalleryPreview';
import { Testimonials } from '../components/Testimonials';
import { PlanYourEvent } from '../components/PlanYourEvent';
import { useEffect } from 'react';

export function Home() {
  // Handle scroll to contact section if coming from package selection
  useEffect(() => {
    const shouldScrollToContact = sessionStorage.getItem('scrollToContact');
    
    if (shouldScrollToContact === 'true') {
      // Clear the flag
      sessionStorage.removeItem('scrollToContact');
      
      // Give the page time to render before scrolling
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, []);

  return (
    <>
      <Hero />
      <OurStory />
      <CateringServices />
      <GalleryPreview />
      <Testimonials />
      <PlanYourEvent />
    </>
  );
}
