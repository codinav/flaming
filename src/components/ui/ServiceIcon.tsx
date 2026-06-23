import {
  Globe,
  Plane,
  Ship,
  Truck,
  ClipboardCheck,
  ArrowDownToLine,
  ArrowUpFromLine,
  Boxes,
  Container,
  Forklift,
  Warehouse,
  Building2,
  Network,
  DoorOpen,
  Luggage,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon as ServiceIconName } from "@/lib/site";

const map: Record<ServiceIconName, LucideIcon> = {
  globe: Globe,
  plane: Plane,
  ship: Ship,
  truck: Truck,
  clipboard: ClipboardCheck,
  import: ArrowDownToLine,
  export: ArrowUpFromLine,
  boxes: Boxes,
  container: Container,
  haulage: Forklift,
  warehouse: Warehouse,
  building: Building2,
  network: Network,
  door: DoorOpen,
  courier: Luggage,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconName;
  className?: string;
}) {
  const Icon = map[name];
  return <Icon className={className} strokeWidth={1.6} aria-hidden />;
}
