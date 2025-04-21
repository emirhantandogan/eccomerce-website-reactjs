import NavigationBar from '../components/NavigationBar';
import CampaignCarousel from '../components/CampaignCarousel';
import FilterableProductList from '../components/FilterableProductList';

export default function Home() {
  return (
    <>
      <NavigationBar />
      <div className="container">
        <CampaignCarousel />
        <FilterableProductList />
      </div>
    </>
  );
}
