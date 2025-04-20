import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileForm() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [firstName, setFirstName] = useState(
    user?.displayName?.split(" ")[0] || "Jane"
  );
  const [lastName, setLastName] = useState(
    user?.displayName?.split(" ")[1] || "Doe"
  );
  const [email, setEmail] = useState(user?.email || "jane.doe@example.com");
  const [financialGoals, setFinancialGoals] = useState(
    "Save for a down payment on a house and build an emergency fund."
  );
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile({
        displayName: `${firstName} ${lastName}`,
      });

      toast({
        title: "Profile updated",
        description: "Your profile information has been saved.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "There was an issue updating your profile.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Profile Information
        </h3>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                First name
              </Label>
              <Input
                type="text"
                name="first-name"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <Label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Last name
              </Label>
              <Input
                type="text"
                name="last-name"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              />
            </div>

            <div className="col-span-6">
              <Label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email address
              </Label>
              <Input
                type="email"
                name="email-address"
                id="email-address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={true} // Email changes require re-authentication
                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              />
            </div>

            <div className="col-span-6">
              <Label
                htmlFor="financial-goals"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Financial goals
              </Label>
              <Textarea
                id="financial-goals"
                name="financial-goals"
                rows={3}
                value={financialGoals}
                onChange={(e) => setFinancialGoals(e.target.value)}
                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              />
            </div>

            <div className="col-span-6">
              <Label
                htmlFor="notification-preferences"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Notification preferences
              </Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <Checkbox
                    id="push"
                    checked={pushNotifications}
                    onCheckedChange={(checked) => setPushNotifications(checked as boolean)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                  />
                  <Label
                    htmlFor="push"
                    className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Push notifications
                  </Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="email"
                    checked={emailNotifications}
                    onCheckedChange={(checked) => setEmailNotifications(checked as boolean)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                  />
                  <Label
                    htmlFor="email"
                    className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email notifications
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              type="button"
              variant="outline"
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
