import { useState } from "react";
import { Role, ListingStatus, Link } from "@/types/types";
import { RoleSelect } from "./RoleSelect";
import { LinkInput } from "./LinkInput";

interface CreateListingFormProps {
  onSubmit: (data: {
    name: string;
    roles: Role[];
    bio: string;
    links: Link[];
    status: ListingStatus;
  }) => void;
}

export function CreateListingForm({ onSubmit }: CreateListingFormProps) {
  const [name, setName] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState<Link[]>([]);
  const [status, setStatus] = useState<ListingStatus>("looking_for_project");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, roles, bio, links, status });
  };

  const toggleRole = (role: Role) => {
    setRoles((current) =>
      current.includes(role)
        ? current.filter((r) => r !== role)
        : [...current, role]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          I am...
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="looking_for_project"
              checked={status === "looking_for_project"}
              onChange={(e) => setStatus(e.target.value as ListingStatus)}
              className="mr-2"
            />
            Looking for Projects
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="looking_for_team"
              checked={status === "looking_for_team"}
              onChange={(e) => setStatus(e.target.value as ListingStatus)}
              className="mr-2"
            />
            Looking for Team Members
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Your Roles
        </label>
        <RoleSelect selectedRoles={roles} onRoleToggle={toggleRole} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Links
        </label>
        <LinkInput links={links} onLinksChange={setLinks} />
      </div>

      <button
        type="submit"
        className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition-colors"
      >
        Create Listing
      </button>
    </form>
  );
}