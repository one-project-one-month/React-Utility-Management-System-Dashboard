import NavigationBreadCrumbs from "@/components/breadcrumb";
import UtilityHeader from "@/components/UtilityUnits/header";
import UnitList from "@/components/UtilityUnits/unit-list";

export default function UtilityUnitPage() {
  return (
    <div>
      <NavigationBreadCrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Utility Units", href: "/utility-units" },
        ]}
      />
      <UtilityHeader />
      <UnitList />
    </div>
  );
}
