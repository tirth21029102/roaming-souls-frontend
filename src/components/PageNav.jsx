import Logo from './Logo';
import PageNavLinks from './PageNavLinks';
import TravelText from './TravelText';

export default function PageNav() {
  return (
    <div className="flex h-auto flex-col items-center gap-6 p-4 md:h-1/4 md:flex-row md:justify-between md:p-8">
      <Logo />
      <div className="hidden md:block">
        <TravelText />
      </div>
      <PageNavLinks />
    </div>
  );
}
