import { Check } from "lucide-react";
import { Role } from "@/types/types";
import { cn } from "@/lib/utils";

interface RoleSelectProps {
  selectedRoles: Role[];
  onRoleToggle: (role: Role) => void;
}

const ROLES: { label: string; value: Role; description: string }[] = [
  { label: "Builder", value: "Builder", description: "Engineer, Developer" },
  { label: "Visionary", value: "Visionary", description: "Founder, Strategist" },
  { label: "Marketer", value: "Marketer", description: "Growth, Branding" },
  { label: "Capitalist", value: "Capitalist", description: "Investor, Fundraiser" },
  { label: "Operator", value: "Operator", description: "Business & Ops" },
  { label: "Designer", value: "Designer", description: "UI/UX, Product" },
  { label: "Salesperson", value: "Salesperson", description: "BizDev, Partnerships" },
  { label: "Hustler", value: "Hustler", description: "Generalist, Multi-role" },
  { label: "Legal", value: "Legal", description: "Legal & Compliance" },
  { label: "Data", value: "Data", description: "Data & AI Specialist" },
];

export function RoleSelect({ selectedRoles, onRoleToggle }: RoleSelectProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {ROLES.map((role) => (
        <button
          key={role.value}
          onClick={() => onRoleToggle(role.value)}
          className={cn(
            "relative flex flex-col items-start p-4 rounded-lg border-2 transition-all duration-200",
            selectedRoles.includes(role.value)
              ? "border-sky-600 bg-sky-50"
              : "border-gray-200 hover:border-gray-300"
          )}
        >
          {selectedRoles.includes(role.value) && (
            <Check className="absolute top-2 right-2 w-4 h-4 text-sky-600" />
          )}
          <span className="font-semibold text-gray-900">{role.label}</span>
          <span className="text-sm text-gray-500 mt-1">{role.description}</span>
        </button>
      ))}
    </div>
  );
}