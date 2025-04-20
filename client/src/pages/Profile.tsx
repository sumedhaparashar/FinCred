import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "wouter";
import ProfileCard from "@/components/profile/ProfileCard";
import ScoreGraph from "@/components/profile/ScoreGraph";
import ProfileForm from "@/components/profile/ProfileForm";
import EarnedBadges from "@/components/profile/EarnedBadges";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect to="/auth" />;
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          {/* Profile Header */}
          <div className="md:col-span-1">
            <ProfileCard />
          </div>

          {/* Profile Content */}
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="space-y-6">
              <ScoreGraph />
              <ProfileForm />
              <EarnedBadges />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
