import pricingImg from '../assets/pricingImg.webp';

export default function ProductContent() {
  return (
    <div className="grid grid-cols-1 gap-12 px-4 py-10 md:h-3/4 md:grid-cols-2 md:px-0 md:py-0">
      {/* <div className="flex h-full flex-col items-center justify-center gap-8">
        <h1 className="text-8xl">Simple pricing.</h1>
        <h1 className="text-8xl">Just $9/month.</h1>
        <p className="text-center text-4xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
          labore mollitia iusto. Recusandae quos provident, laboriosam fugit
          voluptatem iste.
        </p>
      </div> */}

      <div className="flex flex-col items-center justify-center gap-6 md:h-full md:gap-8">
        <h1 className="text-4xl font-bold md:text-8xl">Simple pricing.</h1>
        <h1 className="text-4xl font-bold text-green-700 md:text-8xl">
          One journey. One price.
        </h1>

        <p className="max-w-4xl text-center text-lg leading-snug text-green-200 md:text-4xl">
          No hidden fees. No complicated plans. Just one simple monthly price
          that gives you access to your entire travel story — every city, every
          memory, every connection with fellow
          <span className="font-semibold"> roaming souls</span>.
        </p>

        <p className="text-center text-xl font-semibold text-white md:text-4xl">
          $9 / month. Cancel anytime.
        </p>
      </div>

      <div className="flex items-center justify-center overflow-hidden md:h-full">
        <div className="h-64 overflow-hidden rounded-2xl md:h-3/4">
          <img
            src={pricingImg}
            className="h-full w-full object-cover duration-500 hover:scale-125"
          />
        </div>
      </div>
    </div>
  );
}
