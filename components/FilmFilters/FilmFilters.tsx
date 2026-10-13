"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { FilmFilterValues } from "@/types/film";
import "./FilmFilters.css";

type FilmFiltersProps = {
  countries: string[];
  filters: FilmFilterValues;
  onChange: (name: keyof FilmFilterValues, value: string) => void;
};

export default function FilmFilters({ countries, filters, onChange }: FilmFiltersProps) {
  return (
    <div className="film-filters">
      <fieldset className="film-filter-countries" aria-label="Country">
        <div>
          {["", ...countries].map((country) => (
            <button
              key={country}
              type="button"
              aria-pressed={filters.country === country}
              onClick={() => onChange("country", country)}
            >
              {country || "All places"}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="film-filter-selects">
        <FilterDropdown
          label="Duration"
          value={filters.duration}
          onChange={(value) => onChange("duration", value)}
          options={[
            { value: "", label: "Any length" },
            { value: "short", label: "Under 30 min" },
            { value: "long", label: "30 min or more" },
          ]}
        />
        <FilterDropdown
          label="Theme"
          value={filters.theme}
          onChange={(value) => onChange("theme", value)}
          options={[
            { value: "", label: "All stories" },
            { value: "The craft", label: "The craft" },
            { value: "Life inside", label: "Life inside" },
          ]}
        />
      </div>
    </div>
  );
}

type FilterDropdownProps = {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

function FilterDropdown({ label, value, options, onChange }: FilterDropdownProps) {
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      const dropdown = dropdownRef.current;
      if (dropdown && !dropdown.contains(event.target as Node)) dropdown.open = false;
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return (
    <details
      ref={dropdownRef}
      className="film-filter-dropdown"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
      }}
      onKeyDown={(event) => {
        const dropdown = event.currentTarget;
        if (event.key === "Escape") {
          dropdown.open = false;
          dropdown.querySelector("summary")?.focus();
        }
        if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
          event.preventDefault();
          dropdown.open = true;
          const buttons = Array.from(dropdown.querySelectorAll("button"));
          const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
          let next = event.key === "ArrowUp" ? index - 1 : index + 1;
          if (event.key === "Home") next = 0;
          if (event.key === "End" || next < 0) next = buttons.length - 1;
          buttons[next % buttons.length]?.focus();
        }
      }}
    >
      <summary aria-label={`${label}: ${selected?.label ?? ""}`}>
        {selected?.label}
        <Image src="/arrow-down.png" alt="" width={16} height={16} className="film-filter-arrow" />
      </summary>
      <div className="film-filter-options" role="group" aria-label={`${label} options`}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => {
              onChange(option.value);
              if (dropdownRef.current) {
                dropdownRef.current.open = false;
                dropdownRef.current.querySelector("summary")?.focus();
              }
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </details>
  );
}
