import CategoryCollage from "./components/CategoryCollage";
import DualJewelleryBanner from "./components/DualJewelleryBanner";
import HeroGrid from "./components/HeroGrid";
import InstagramSection from "./components/InstagramSection";
import LuxuryProductCarousel from "./components/LuxuryProductCarousel";
import NecklaceShowcase from "./components/NecklaceShowcase";
import NewsletterSection from "./components/NewsletterSection";
import PerfectMatch from "./components/PerfectMatch";
import ReligiousJewellery from "./components/ReligiousJewellery";
import ShopByCatalog from "./components/ShopbyCatalog";
import TrendingNow from "./components/TrendingNow";
import VideoSection from "./components/VideoFrame";

export default function Home() {
  return (
    <>
        <HeroGrid />
        <LuxuryProductCarousel />
<ShopByCatalog limit={8} />
<ReligiousJewellery />
<VideoSection />
<PerfectMatch />
<TrendingNow />
<DualJewelleryBanner />
<CategoryCollage />
<NecklaceShowcase />
<InstagramSection />
<NewsletterSection />
    </>
  )
}