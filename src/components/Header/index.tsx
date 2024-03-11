import { useRouter } from "next/navigation";
import { Inria_Sans } from "next/font/google";

const inria = Inria_Sans({ subsets: ["latin"], weight: "700" });

export default function Header({
  onClick,
  buttonName,
}: {
  onClick: () => void;
  buttonName: string;
}) {
  const router = useRouter();

  function navigate(ref: string) {
    router.push(ref);
  }
  return (
    <header className="flex fixed min-w-full h-24 bg-[#1e1e1e] items-center justify-between px-14">
      <img
        alt="discord"
        width={50}
        height={50}
        src={
          "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png"
        }
      />
      <div>
        <button
          onClick={() => navigate("/about")}
          className={`${inria.className} duration-500 hover:scale-[1.1]`}
        >
          Sobre
        </button>
      </div>
      <button
        onClick={onClick}
        className={`${inria.className} duration-500 hover:scale-[1.1]`}
      >
        {buttonName}
      </button>
    </header>
  );
}
