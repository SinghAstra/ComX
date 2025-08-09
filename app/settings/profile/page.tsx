import { getCurrentUser } from "@/actions/auth";
import { Navbar } from "@/components/home/navbar";
import { redirect } from "next/navigation";
import { EditProfileForm } from "./edit-profile-form";

export default async function SettingsProfilePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentUser={currentUser} />
      <main className="w-full mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
        <EditProfileForm currentUser={currentUser} />
      </main>
    </div>
  );
}
