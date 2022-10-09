import Image from "next/image";
import Link from "next/link";
import Logo from "../public/logo_pink.png";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-teal-800 flex justify-between items-center px-8 border-t-8 rounded-b-2xl border-teal-900">
      <div className="flex items-center gap-4">
        <Link href="/">
          <a>
            <div className="group w-16 h-16 relative ">
              <Image
                src={Logo}
                className="group-hover:opacity-75"
                layout="fill"
                alt="logo"
              />
            </div>
          </a>
        </Link>
        <h1 className="font-serif font-medium text-4xl text-[#f2a7ba]">
          Dr. Dashboard
        </h1>
      </div>
      <div className="flex gap-12">
        <div className="flex items-center gap-4">
          <span className="material-icons text-5xl text-teal-500 ">
            account_circle
          </span>
          <h3 className="text-teal-400">Witaj, Marek!</h3>
        </div>
      </div>
    </header>
  );
}
