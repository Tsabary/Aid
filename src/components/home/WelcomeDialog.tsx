import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const WelcomeDialog = ({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (state: boolean) => void;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  // Content variables
  const title = "Welcome";
  const description = "Together, We Can Make a Difference";
  const content = (
    <>
      <p>
        In the wake of the recent fires, our community has come together to support those in
        need. This platform exists to bridge the gap between those seeking help and those
        eager to provide it. Whether you’re looking for assistance or ready to lend a hand,
        this tool is here to connect you.
      </p>
      <p>
        If you need help, this site allows you to share your request with the community. You
        can describe what you need, where you are, and the kind of support that would make the
        biggest difference—whether it’s housing, food, medical care, or something else. By
        doing so, you make it easy for volunteers nearby to step up and assist. All we ask is
        that you include your name and a way for others to contact you so help can find you
        quickly.
      </p>
      <p>
        For those looking to help, this site makes it easy to find requests that match your
        skills, resources, or location. Simply search for needs close to you and filter by the
        kind of support you’re best equipped to provide. From there, you can connect directly
        with those in need and make an impact where it matters most.
      </p>
      <p>
        This tool is about coming together as neighbors and rebuilding stronger, one act of
        kindness at a time. Thank you for joining this effort. Let’s make a difference—together.
      </p>
    </>
  );

  if (isDesktop) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div>{content}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div>{content}</div>
        <DrawerFooter>
          <Button>Close</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default WelcomeDialog;
