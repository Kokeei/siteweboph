import { Clock, Phone } from "lucide-react";
import { site } from "@/data/site";
import { SocialLinks } from "./SocialLinks";

export function TopBar() {
  return (
    <div className="hidden bg-primary-dark text-white/90 lg:block">
      <div className="container-oph flex items-center justify-between py-2 text-[0.8rem]">
        <div className="flex items-center gap-6">
          <a href={site.phoneHref} className="flex items-center gap-2 hover:text-white">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {site.phone}
          </a>
          <span className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {site.hours.map((h) => `${h.days} ${h.time}`).join(" · ")}
          </span>
        </div>
        <SocialLinks size="sm" />
      </div>
    </div>
  );
}
