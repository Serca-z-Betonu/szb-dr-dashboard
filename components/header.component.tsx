import Image from "next/image";
import Link from "next/link";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export default function Header() {
  return (
    <header className="bg-teal-800 flex justify-between items-center px-8 border-t-8 rounded-b-2xl border-teal-900">
      <div className="flex items-center gap-4">
        <Link href="/">
          <a>
            <div className="group w-16 h-16 relative ">
              <Image
                src="/../public/logo.png"
                className="group-hover:opacity-75"
                layout="fill"
                alt="logo"
              />
            </div>
          </a>
        </Link>
        <h1 className="font-serif font-medium text-2xl text-teal-500">
          Dr. Dashboard
        </h1>
      </div>
      <div className="flex gap-12">
        <div className="flex items-center gap-2">
          <span className="material-icons text-5xl text-teal-500 ">
            account_circle
          </span>
          <h3 className="text-teal-500">Witaj, Marek!</h3>
        </div>
      </div>
    </header>
  );
}
