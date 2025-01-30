import { useState } from "react";
import { Role, ListingStatus, Link, PersonListing, ProjectListing } from "@/types/types";
import { RoleSelect } from "./RoleSelect";
import { LinkInput } from "./LinkInput";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface CreateListingFormProps {
  onSubmit: (data: Omit<PersonListing | ProjectListing, "id">) => void;
}

export function CreateListingForm({ onSubmit }: CreateListingFormProps) {
  const [status, setStatus] = useState<ListingStatus>("looking_for_project");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [projectName, setProjectName] = useState("");
  const [founderName, setFounderName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [stage, setStage] = useState<ProjectListing["stage"]>("idea");
  const [compensation, setCompensation] = useState<ProjectListing["compensation"]>("equity");
  const [roles, setRoles] = useState<Role[]>([]);
  const [links, setLinks] = useState<Link[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "looking_for_project") {
      onSubmit({
        name,
        bio,
        roles,
        links,
        status,
      });
    } else {
      onSubmit({
        projectName,
        founderName,
        projectDescription,
        stage,
        compensation,
        roles,
        links,
        status,
      });
    }
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

      {status === "looking_for_project" ? (
        <>
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
        </>
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Founder Name
            </label>
            <input
              type="text"
              value={founderName}
              onChange={(e) => setFounderName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Description
            </label>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Stage
            </label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value as ProjectListing["stage"])}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="idea">Idea Stage</option>
              <option value="prototype">Prototype</option>
              <option value="beta">Beta</option>
              <option value="launched">Launched</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compensation
            </label>
            <select
              value={compensation}
              onChange={(e) => setCompensation(e.target.value as ProjectListing["compensation"])}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="equity">Equity Only</option>
              <option value="paid">Paid Position</option>
              <option value="both">Equity + Payment</option>
              <option value="undecided">To Be Discussed</option>
            </select>
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Required Roles
        </label>
        <RoleSelect selectedRoles={roles} onRoleToggle={toggleRole} />
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