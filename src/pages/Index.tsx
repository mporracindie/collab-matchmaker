import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Listing, ListingStatus, PersonListing, ProjectListing } from "@/types/types";
import { ListingBoard } from "@/components/ListingBoard";
import { CreateListingForm } from "@/components/CreateListingForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Index() {
  const [activeBoard, setActiveBoard] = useState<ListingStatus>("looking_for_project");
  const [listings, setListings] = useState<Listing[]>([]);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Fetch listings
    fetchListings();

    return () => subscription.unsubscribe();
  }, []);

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error fetching listings");
      return;
    }

    setListings(data as Listing[]);
  };

  const handleCreateListing = async (data: Omit<PersonListing, "id"> | Omit<ProjectListing, "id">) => {
    if (!session) {
      toast.error("Please sign in to create a listing");
      navigate("/auth");
      return;
    }

    try {
      const { error } = await supabase.from("listings").insert([
        {
          ...data,
          user_id: session.user.id,
        },
      ]);

      if (error) throw error;

      toast.success("Listing created successfully!");
      fetchListings();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Entrepreneur Matchmaking
            </h1>
            <div className="flex gap-4 items-center">
              {session ? (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors">
                        <Plus className="w-5 h-5 mr-2" />
                        Create Listing
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] overflow-y-auto p-4 md:p-6">
                      <CreateListingForm onSubmit={handleCreateListing} />
                    </DialogContent>
                  </Dialog>
                  <button
                    onClick={handleSignOut}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/auth")}
                  className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
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