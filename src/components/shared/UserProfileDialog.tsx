import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { toast } from "../../hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { handleError, useUser } from "replyke";
import { isEmail } from "validator";
import { LoaderCircle } from "lucide-react";
import { cn } from "../../lib/utils";

function UserProfileDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (state: boolean) => void;
}) {
  const { user, updateUser } = useUser();
  const [name, setName] = useState("");
  const [preferredContactMethod, setPreferredContactMethod] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<
    Record<"name" | "email" | "phoneNumber", string | null>
  >({ name: null, email: null, phoneNumber: null });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmittingRef.current) return;

    if (!name) {
      setErrors({
        name: "Please add your name",
        email: null,
        phoneNumber: null,
      });
      return;
    }

    if (email && !isEmail(email)) {
      setErrors({
        name: null,
        email: "Invalid email address",
        phoneNumber: null,
      });
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    try {
      await updateUser?.({
        name: name,
        metadata: { preferredContactMethod, email, phoneNumber },
      });

      toast({
        title: "Form submitted",
        description: "Your contact information has been saved.",
      });
      setOpen(false);
    } catch (err) {
      handleError(err, "Failed to update user information");
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (user?.name) setName(user.name);
    if (user?.metadata?.email) setEmail(user.metadata.email);
    if (user?.metadata?.phoneNumber) setPhoneNumber(user.metadata.phoneNumber);
    if (user?.metadata?.preferredContactMethod)
      setPreferredContactMethod(user.metadata.preferredContactMethod);
  }, [user]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Information</DialogTitle>
          <DialogDescription>
            Please provide your name and preferred contact method.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactMethod">Preferred Contact Method</Label>
            <Select
              value={preferredContactMethod}
              onValueChange={setPreferredContactMethod}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a contact method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactValue">Phone Number</Label>
            <Input
              id="phone-number"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactValue">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors["email"] && (
              <p className="text-xs text-red-500 mt-2">{errors["email"]}</p>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Note: Only applicants will be able to see your contact details.
          </p>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn("w-full", isSubmitting && "opacity-70")}
            >
              {isSubmitting && (
                <LoaderCircle className="size-4 mr-2 animate-spin" />
              )}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UserProfileDialog;
