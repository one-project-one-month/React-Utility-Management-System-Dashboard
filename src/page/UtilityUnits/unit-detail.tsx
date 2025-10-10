import NavigationBreadCrumbs from "@/components/breadcrumb";
import UtilityUnit from "@/components/UtilityUnits/unit-detail";
import { useParams } from "react-router";

export default function UtilityUnitDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <NavigationBreadCrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Utility Units", href: "/utility-units" },
          { label: "Unit Detail", href: `/utility-units/${id}` },
        ]}
      />
      <UtilityUnit />
    </div>
  );
}
