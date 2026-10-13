import Link from "next/link";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <Link href="/">LOGO</Link>

      <nav>
        <Link href="/films">Films</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
