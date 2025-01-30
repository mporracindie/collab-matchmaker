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

export interface BaseListing {
  id: string;
  roles: Role[];
  links: Link[];
  status: ListingStatus;
}

export interface PersonListing extends BaseListing {
  status: "looking_for_project";
  name: string;
  bio: string;
}

export interface ProjectListing extends BaseListing {
  status: "looking_for_team";
  projectName: string;
  founderName: string;
  projectDescription: string;
  stage: "idea" | "prototype" | "beta" | "launched";
  compensation: "equity" | "paid" | "both" | "undecided";
}

export type Listing = PersonListing | ProjectListing;