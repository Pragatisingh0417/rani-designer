import CategoryCollage from "./components/CategoryCollage";
import HeroGrid from "./components/HeroGrid";
import ImageMarquee from "./components/ImageMarquee";
import LuxuryProductCarousel from "./components/LuxuryProductCarousel";
import NewsletterSection from "./components/NewsletterSection";
import PerfectMatch from "./components/PerfectMatch";
import ShopByCatalog from "./components/ShopbyCatalog";
import TestimonialMarquee from "./components/TestimonialMarquee";
import TrendingNow from "./components/TrendingNow";
import VideoSection from "./components/VideoFrame";

export default function Home() {
  return (
    <>
        <HeroGrid />
        <LuxuryProductCarousel />
<ShopByCatalog />
<VideoSection />
<PerfectMatch />
<TrendingNow />
<CategoryCollage />
<ImageMarquee />
<NewsletterSection />
    </>
  )
}