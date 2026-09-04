import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import ThingsToSeeSection from '@/components/ThingsToSeeSection';
import StoriesSection from '@/components/StoriesSection';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import WeatherSection, { fetchWeather } from '@/components/WeatherSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import RouteSection from '@/components/RouteSection';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import HotelsSection from '@/components/HotelsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FAQSection from '@/components/FAQSection';
import SourcesSection from '@/components/SourcesSection';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Open-Meteo 天气（Server Component 侧获取，构建/ISR 时缓存）
  const weather = await fetchWeather();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <ThingsToSeeSection />
        <StoriesSection />
        <BasicInfo />
        <HoursSection />
        <WeatherSection data={weather} />
        <TicketsSection />
        <TransportSection />
        <FacilitiesSection />
        <RouteSection />
        <PhotoSpotsSection />
        <HotelsSection />
        <Gallery />
        <Reviews />
        <FAQSection />
        <SourcesSection />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
