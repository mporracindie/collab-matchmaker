import { Listing, PersonListing, ProjectListing } from "@/types/types";
import { ExternalLink, Briefcase, Calendar } from "lucide-react";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  if (listing.status === "looking_for_project") {
    return <PersonCard listing={listing} />;
  } else {
    return <ProjectCard listing={listing} />;
  }
}

function PersonCard({ listing }: { listing: PersonListing }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{listing.name}</h3>
        <span className="text-sm px-3 py-1 rounded-full bg-sky-100 text-sky-800">
          Looking for Projects
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

function ProjectCard({ listing }: { listing: ProjectListing }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{listing.projectName}</h3>
          <p className="text-sm text-gray-500">by {listing.founderName}</p>
        </div>
        <span className="text-sm px-3 py-1 rounded-full bg-purple-100 text-purple-800">
          Looking for Team
        </span>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
        <span className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {listing.stage.charAt(0).toUpperCase() + listing.stage.slice(1)} Stage
        </span>
        <span className="flex items-center">
          <Briefcase className="w-4 h-4 mr-1" />
          {listing.compensation === "equity"
            ? "Equity Only"
            : listing.compensation === "paid"
            ? "Paid Position"
            : listing.compensation === "both"
            ? "Equity + Payment"
            : "Compensation TBD"}
        </span>
      </div>

      <p className="mt-4 text-gray-600">{listing.projectDescription}</p>

      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Looking for:</p>
        <div className="flex flex-wrap gap-2">
          {listing.roles.map((role) => (
            <span
              key={role}
              className="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200"
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      {listing.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {listing.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-purple-600 hover:text-purple-800"
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