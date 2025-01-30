import { useState } from "react";
import { Listing, Role, ListingStatus } from "@/types/types";
import { ListingCard } from "./ListingCard";
import { RoleSelect } from "./RoleSelect";

interface ListingBoardProps {
  listings: Listing[];
  status: ListingStatus;
}

export function ListingBoard({ listings, status }: ListingBoardProps) {
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

  const toggleRole = (role: Role) => {
    setSelectedRoles((current) =>
      current.includes(role)
        ? current.filter((r) => r !== role)
        : [...current, role]
    );
  };

  const filteredListings = listings.filter(
    (listing) =>
      listing.status === status &&
      (selectedRoles.length === 0 ||
        listing.roles.some((role) => selectedRoles.includes(role)))
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Filter by Roles</h2>
        <RoleSelect selectedRoles={selectedRoles} onRoleToggle={toggleRole} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No listings found matching your criteria
        </div>
      )}
    </div>
  );
}