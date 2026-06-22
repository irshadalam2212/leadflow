import PipelineBoard from "@/components/dashboard/pipeline-board";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

export default async function PipelinePage() {
  await connectDB();

  const leadDocuments = await Lead.find({})
    .sort({ createdAt: -1 })
    .lean();

  const leads = JSON.parse(
    JSON.stringify(leadDocuments)
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Sales Pipeline
        </h1>

        <p className="mt-2 text-muted-foreground">
          Drag leads between columns to
          update their status.
        </p>
      </div>

      <PipelineBoard leads={leads} />
    </div>
  );
}