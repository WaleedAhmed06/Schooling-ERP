"use client";
import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Role } from "@/types/domain";
import { navigation } from "@/config/navigation";
export function HeaderSearch({ role }: { role: Role }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const matches = navigation[role].filter((item) =>
    item.label.toLowerCase().includes(search.trim().toLowerCase()),
  );
  return (
    <div className={`topbar-search ${open ? "search-open" : ""}`}>
      <Search size={18} />
      <input
        aria-label="Search navigation"
        placeholder="Search modules..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      />
      {open && search.trim() && (
        <div className="search-results">
          {matches.map((item) => (
            <Link
              key={item.slug}
              href={`/${role}${item.slug ? `/${item.slug}` : ""}`}
              onClick={() => {
                setSearch("");
                setOpen(false);
              }}
            >
              {item.label}
            </Link>
          ))}
          {matches.length === 0 && <span>No matching modules</span>}
        </div>
      )}
    </div>
  );
}
