import { Listing } from "@/types/types";
import { ExternalLink } from "lucide-react";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{listing.name}</h3>
        <span className="text-sm px-3 py-1 rounded-full bg-sky-100 text-sky-800">
          {listing.status === "looking_for_project"
            ? "Looking for Projects"
            : "Looking for Team"}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {listing.roles.map((role) => (
          <span
            key={role}
            className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
          >
            {role}
          </span>
        ))}
      </div>

      <p className="mt-4 text-gray-600">{listing.bio}</p>

      {listing.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {listing.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-sky-600 hover:text-sky-800"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              {link.type}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}