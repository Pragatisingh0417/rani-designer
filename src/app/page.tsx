import Banner from "./components/Banner";
import CategoryCollage from "./components/CategoryCollage";
import DualJewelleryBanner from "./components/DualJewelleryBanner";
import HeroGrid from "./components/HeroGrid";
import HomeBanner from "./components/HomeBanner";
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
    <Banner />
    {/* <HomeBanner /> */}
        {/* <HeroGrid /> */}
        {/* <LuxuryProductCarousel /> */}
        <CategoryCollage />

<ShopByCatalog limit={8} />

<ReligiousJewellery />
<VideoSection />
<PerfectMatch />
<TrendingNow />
<DualJewelleryBanner />
<NecklaceShowcase />
<InstagramSection />
<NewsletterSection />
    </>
  )
}