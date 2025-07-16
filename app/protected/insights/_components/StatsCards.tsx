import { FullscreenIcon } from "lucide-react";
import InsightsCards from "./InsightsCards";
import { getInsights } from "@/actions/insights";

export async function StatsCards() {
  const data = await getInsights();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InsightsCards
          title="Total Tasks"
          value={data.total}
          Icon={FullscreenIcon}
        />
        <InsightsCards
          title="Pending Tasks"
          value={data.pending}
          Icon={FullscreenIcon}
        />
        <InsightsCards
          title="In Progress Tasks"
          value={data.inProgress}
          Icon={FullscreenIcon}
        />
        <InsightsCards
          title="Done Tasks"
          value={data.done}
          Icon={FullscreenIcon}
        />
      </div>
    </div>
  );
}