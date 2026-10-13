import Image from "next/image";
import "./SearchField.css";

type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchField({ value, onChange }: SearchFieldProps) {
  return (
    <label className="search-field">
      <Image
        src="/search-icon.png"
        alt=""
        width={18}
        height={18}
        className="search-field-icon"
      />
      <input
        type="search"
        aria-label="Search this collection"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search titles, descriptions, or places…"
      />
    </label>
  );
}
