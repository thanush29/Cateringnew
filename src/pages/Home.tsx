import { Hero } from '../components/Hero';
import { OurStory } from '../components/OurStory';
import { CateringServices } from '../components/CateringServices';
import { OurMenus } from '../components/OurMenus';
import { GalleryPreview } from '../components/GalleryPreview';
import { Testimonials } from '../components/Testimonials';
import { PlanYourEvent } from '../components/PlanYourEvent';

export function Home() {
  return (
    <>
      <Hero />
      <OurStory />
      <CateringServices />
      <OurMenus />
      <GalleryPreview />
      <Testimonials />
      <PlanYourEvent />
    </>
  );
}
