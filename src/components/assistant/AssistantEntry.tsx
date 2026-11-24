import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CollegeMark } from "./CollegeMark";
import { useAssistantAccount } from "./AccountContext";

export function AssistantEntry() {
  const location = useLocation();
  const { signedIn } = useAssistantAccount();
  if (location.pathname.startsWith("/assistant") || location.pathname === "/auth") return null;
  return <Button asChild className="fixed bottom-5 right-5 z-50 h-12 gap-2 rounded-lg px-4 shadow-card" title="College assistant">
    <Link to="/assistant" onClick={() => sessionStorage.setItem("assistant-page-context", location.pathname)}>
      <CollegeMark className="size-6" /><span>{signedIn ? "Your assistant" : "College assistant"}</span>
    </Link>
  </Button>;
}