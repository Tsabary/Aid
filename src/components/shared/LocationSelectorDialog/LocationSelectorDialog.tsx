import { Drawer, DrawerContent } from "@/components/ui/drawer";
import LocationSelectorContent from "./LocationSelectorContent";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { Dialog, DialogContent } from "../../ui/dialog";

const LocationSelectorDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  setLocation,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (state: boolean) => void;
  setLocation: React.Dispatch<
    React.SetStateAction<{
      name: string;
      coordinates: { lat: number; lng: number };
    } | null>
  >;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  if (isDesktop) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <LocationSelectorContent setLocation={setLocation} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <LocationSelectorContent setLocation={setLocation} />
      </DrawerContent>
    </Drawer>
  );
};

export default LocationSelectorDialog;
