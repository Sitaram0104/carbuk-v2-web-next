import Image from "next/image";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Image
        src="/car-gray-2.jpg"
        layout="fill"
        objectFit="cover"
        style={{ filter: "blur(2px)" }}
        alt="background-image"
      />
      <NavBar />
    </main>
  );
}
