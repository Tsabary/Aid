import { Drawer, DrawerContent } from "@/components/ui/drawer";
import RadiusSelectorContent from "./RadiusSelectorContent";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { Dialog, DialogContent } from "../../ui/dialog";

const LocationSelectorDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  isKm,
  setIsKm,
  radius,
  setRadius,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (state: boolean) => void;
  isKm: boolean;
  setIsKm: (state: boolean) => void;
  radius: number;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  if (isDesktop) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <RadiusSelectorContent
            setIsDialogOpen={setIsDialogOpen}
            isKm={isKm}
            setIsKm={setIsKm}
            radius={radius}
            setRadius={setRadius}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <RadiusSelectorContent
          setIsDialogOpen={setIsDialogOpen}
          isKm={isKm}
          setIsKm={setIsKm}
          radius={radius}
          setRadius={setRadius}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default LocationSelectorDialog;
