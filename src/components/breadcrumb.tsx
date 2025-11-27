import type { BreadCrumbItem as BreadCrumbItemType } from "@/types/breadcrumb";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

type Props = {
   items: BreadCrumbItemType[];
};

const NavigationBreadCrumbs = ({ items }: Props) => {
   return (
      <Breadcrumbs>
         {items.map(item => (
            <BreadcrumbItem
               href={item.href ?? undefined}
            >
               {item.label}
            </BreadcrumbItem>
         ))}
      </Breadcrumbs>
   );
};

export default NavigationBreadCrumbs;
