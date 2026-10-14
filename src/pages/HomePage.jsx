import HomeHeroSequence from '../components/home/HomeHeroSequence';
import HomeFeaturedLoans from '../components/home/HomeFeaturedLoans';
import ApplicationSteps from '../components/ApplicationSteps';
import HomeEmiPreview from '../components/home/HomeEmiPreview';
import HomeWhyFinora from '../components/home/HomeWhyFinora';
import Faq from '../components/Faq';
import HomeCta from '../components/home/HomeCta';

export default function HomePage() {
  return (
    <>
      <HomeHeroSequence />
      <HomeFeaturedLoans />
      <ApplicationSteps />
      <HomeEmiPreview />
      <HomeWhyFinora />
      <Faq />
      <HomeCta />
    </>
  );
}
