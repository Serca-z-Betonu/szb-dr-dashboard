import Header from "./header.component";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export default function Layout({ children }: Props) {
  return (
    <div className="h-full grid grid-rows-[100px_1fr] bg-white">
      <Header />
      <main>{children}</main>
    </div>
  );
}
