import pricingImg from '../assets/pricingImg.webp';

export default function ProductContent() {
  return (
    <div className="grid h-3/4 grid-cols-2">
      {/* <div className="flex h-full flex-col items-center justify-center gap-8">
        <h1 className="text-8xl">Simple pricing.</h1>
        <h1 className="text-8xl">Just $9/month.</h1>
        <p className="text-center text-4xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
          labore mollitia iusto. Recusandae quos provident, laboriosam fugit
          voluptatem iste.
        </p>
      </div> */}

      <div className="flex h-full flex-col items-center justify-center gap-8">
        <h1 className="text-8xl font-bold">Simple pricing.</h1>
        <h1 className="text-8xl font-bold text-green-700">
          One journey. One price.
        </h1>

        <p className="max-w-4xl text-center text-4xl leading-snug text-green-200">
          No hidden fees. No complicated plans. Just one simple monthly price
          that gives you access to your entire travel story — every city, every
          memory, every connection with fellow
          <span className="font-semibold"> roaming souls</span>.
        </p>

        <p className="text-center text-4xl font-semibold text-white">
          $9 / month. Cancel anytime.
        </p>
      </div>

      <div className="flex h-full items-center justify-center overflow-hidden">
        <div className="h-3/4 overflow-hidden rounded-2xl">
          <img
            src={pricingImg}
            className="h-full duration-500 hover:scale-125"
          />
        </div>
      </div>
    </div>
  );
}
