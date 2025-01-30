import { useState } from "react";
import { Listing, ListingStatus } from "@/types/types";
import { ListingBoard } from "@/components/ListingBoard";
import { CreateListingForm } from "@/components/CreateListingForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    name: "John Doe",
    roles: ["Builder", "Designer"],
    bio: "Full-stack developer with 5 years of experience. Looking to join an exciting startup.",
    links: [
      { type: "LinkedIn", url: "https://linkedin.com" },
      { type: "Portfolio", url: "https://portfolio.com" },
    ],
    status: "looking_for_project",
  },
  {
    id: "2",
    name: "Jane Smith",
    roles: ["Visionary", "Marketer"],
    bio: "Experienced founder looking for technical co-founder for my fintech startup.",
    links: [
      { type: "LinkedIn", url: "https://linkedin.com" },
      { type: "Twitter", url: "https://twitter.com" },
    ],
    status: "looking_for_team",
  },
  {
    id: "3",
    name: "Alex Johnson",
    roles: ["Data", "Builder"],
    bio: "AI/ML engineer specializing in NLP. Looking to join a startup working on innovative AI solutions.",
    links: [
      { type: "GitHub", url: "https://github.com" },
      { type: "LinkedIn", url: "https://linkedin.com" },
    ],
    status: "looking_for_project",
  },
  {
    id: "4",
    name: "Sarah Chen",
    roles: ["Capitalist", "Operator"],
    bio: "Former VC associate with startup operations experience. Looking for ambitious founders to back and support.",
    links: [
      { type: "LinkedIn", url: "https://linkedin.com" },
      { type: "AngelList", url: "https://angel.co" },
    ],
    status: "looking_for_team",
  },
  {
    id: "5",
    name: "Michael Brown",
    roles: ["Hustler", "Salesperson"],
    bio: "Serial entrepreneur with 3 successful exits. Looking for the next big opportunity.",
    links: [
      { type: "LinkedIn", url: "https://linkedin.com" },
      { type: "Website", url: "https://michaelbrown.com" },
    ],
    status: "looking_for_project",
  },
  {
    id: "6",
    name: "Emily Rodriguez",
    roles: ["Legal", "Operator"],
    bio: "Startup lawyer turned founder. Building a legal tech platform and looking for technical co-founders.",
    links: [
      { type: "LinkedIn", url: "https://linkedin.com" },
      { type: "Twitter", url: "https://twitter.com" },
    ],
    status: "looking_for_team",
  },
  {
    id: "7",
    name: "David Kim",
    roles: ["Designer", "Visionary"],
    bio: "Product designer with experience at FAANG companies. Passionate about creating delightful user experiences.",
    links: [
      { type: "Portfolio", url: "https://davidkim.design" },
      { type: "Dribbble", url: "https://dribbble.com" },
    ],
    status: "looking_for_project",
  },
  {
    id: "8",
    name: "Lisa Wang",
    roles: ["Marketer", "Hustler"],
    bio: "Building a D2C wellness brand. Looking for technical and operations co-founders.",
    links: [
      { type: "LinkedIn", url: "https://linkedin.com" },
      { type: "Instagram", url: "https://instagram.com" },
    ],
    status: "looking_for_team",
  }
];

export default function Index() {
  const [activeBoard, setActiveBoard] = useState<ListingStatus>("looking_for_project");
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);

  const handleCreateListing = (data: Omit<Listing, "id">) => {
    const newListing: Listing = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    };
    setListings((current) => [...current, newListing]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Entrepreneur Matchmaking
            </h1>
            <Dialog>
              <DialogTrigger asChild>
                <button className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Listing
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <CreateListingForm onSubmit={handleCreateListing} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setActiveBoard("looking_for_project")}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeBoard === "looking_for_project"
                  ? "bg-sky-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Looking for Projects
            </button>
            <button
              onClick={() => setActiveBoard("looking_for_team")}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeBoard === "looking_for_team"
                  ? "bg-sky-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Looking for Team Members
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ListingBoard listings={listings} status={activeBoard} />
      </main>
    </div>
  );
}