import Logo from './Logo';
import PageNavLinks from './PageNavLinks';
import TravelText from './TravelText';

export default function PageNav() {
  return (
    <div className="flex h-1/4 justify-between p-8">
      <Logo />
      <TravelText />
      <PageNavLinks />
    </div>
  );
}
