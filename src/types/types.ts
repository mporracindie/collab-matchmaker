export type Role =
  | "Builder"
  | "Visionary"
  | "Marketer"
  | "Capitalist"
  | "Operator"
  | "Designer"
  | "Salesperson"
  | "Hustler"
  | "Legal"
  | "Data";

export type ListingStatus = "looking_for_project" | "looking_for_team";

export interface Link {
  url: string;
  type: string;
}

export interface Listing {
  id: string;
  name: string;
  roles: Role[];
  bio: string;
  links: Link[];
  status: ListingStatus;
}