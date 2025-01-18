import { Metadata } from "@/components/meta-tags";

export default function Home() {
  return (
    <>
      <div className="relative overflow-hidden h-screen bg-gray-100 flex items-center justify-center">
        <div className="absolute inset-0 top-1/4 md:-top-32 blur-md">
          <img
            width={1300}
            height={1300}
            className="absolute right-2/3"
            src="/gradient.png"
            alt="grad"
          />
          <img
            width={1300}
            height={1300}
            className="absolute left-2/3"
            src="/gradient.png"
            alt="grad"
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-7xl md:text-9xl font-poppin text-gray-600">
            DPin
          </h1>
          <h3 className="text-3xl font-poppin text-gray-800">
            only place to share your photos & Earn
          </h3>
        </div>
      </div>
    <Meta/>
    </>
  );
}


function Meta() {
  return (
    <Metadata
      title="home page"
    />
  )
}