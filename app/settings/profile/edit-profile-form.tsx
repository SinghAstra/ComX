"use client";

import { updateUserProfile } from "@/actions/auth";
import { useToastContext } from "@/components/providers/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditProfileFormProps {
  currentUser: User;
}

export function EditProfileForm({ currentUser }: EditProfileFormProps) {
  const router = useRouter();
  const { setToastMessage } = useToastContext();

  const [name, setName] = useState(currentUser.name || "");
  const [bio, setBio] = useState(currentUser.bio || "");
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; bio?: string }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({}); // Clear previous errors

    let hasError = false;
    const newErrors: { name?: string; bio?: string } = {};

    if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
      hasError = true;
    }
    if (name.trim().length > 50) {
      newErrors.name = "Name cannot exceed 50 characters.";
      hasError = true;
    }
    if (bio.length > 500) {
      newErrors.bio = "Bio cannot exceed 500 characters.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);

    try {
      const result = await updateUserProfile(name, bio);
      if (result.success) {
        setToastMessage(result.message || "Profile updated successfully!");
        router.push(`/profile/${currentUser.id}`);
      } else {
        setToastMessage(result.message || "Failed to update profile.");
      }
    } catch (error) {
      console.log("Error updating profile.");
      if (error instanceof Error) {
        console.log("error.stack is ", error.stack);
        console.log("error.message is ", error.message);
      }
      setToastMessage("An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full p-4 border">
      <div className="mb-4">
        <p className="text-2xl font-semibold">Edit Profile</p>
        <p className="text-muted-foreground">
          Update your public profile information.
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              disabled={isSaving}
              className={cn(errors.name && "border-destructive")}
              autoComplete="off"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
                setErrors((prev) => ({ ...prev, bio: undefined }));
              }}
              placeholder="Tell us a little about yourself..."
              rows={4}
              disabled={isSaving}
              className={cn(errors.bio && "border-destructive")}
              autoComplete="off"
            />
            {errors.bio && (
              <p className="text-sm text-destructive">{errors.bio}</p>
            )}
          </div>

          <Button type="submit" disabled={isSaving} className="w-full">
            {isSaving ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
