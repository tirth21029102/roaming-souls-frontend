import productImg from '../assets/productImg.webp';

export default function ProductContent() {
  return (
    <div className="grid grid-cols-1 gap-12 px-4 py-10 md:h-3/4 md:grid-cols-2 md:px-0 md:py-0">
      <div className="flex items-center justify-center overflow-hidden md:h-full">
        <div className="h-64 overflow-hidden rounded-2xl md:h-3/4">
          <img
            src={productImg}
            className="h-full w-full object-cover duration-300 hover:scale-y-125"
          />
        </div>
      </div>
      {/* <div className="flex h-full flex-col items-center justify-center gap-8">
        <h1 className="text-8xl">About WorldWide.</h1>
        <p className="text-4xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
          dicta illum vero culpa cum quaerat architecto sapiente eius non
          soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
          perspiciatis?
        </p>
        <p className="text-4xl">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
          doloribus libero sunt expedita ratione iusto, magni, id sapiente sequi
          officiis et.
        </p>
      </div> */}

      <div className="flex flex-col items-center justify-center gap-6 md:h-full md:gap-8">
        <h1 className="text-4xl font-bold md:text-8xl">About Travel List</h1>

        <p className="text-lg leading-snug text-green-200 md:text-4xl">
          <strong>Roamly</strong> was created for those who don’t just travel —
          they wander with purpose. For people who believe that every city
          leaves a mark, and every journey deserves to be remembered.
        </p>

        <p className="text-lg leading-snug text-green-200 md:text-4xl">
          With <strong>Roamly</strong>, you can pin the places you’ve been,
          write the stories behind each visit, upload the moments that mattered
          most, and connect with fellow <strong>roaming souls </strong>
          who share the same love for the road. It’s not just a map — it’s your
          travel story, told your way.
        </p>
      </div>
    </div>
  );
}
