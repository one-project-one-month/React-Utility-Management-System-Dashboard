import NavigationBreadCrumbs from "@/components/breadcrumb";
import UtilityHeader from "@/components/UtilityUnits/header";
import UnitList from "@/components/UtilityUnits/unit-list";

export default function UtilityUnitPage() {
  return (
    <div className="h-[84vh]  overflow-y-auto custom-scrollbar-3">
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
