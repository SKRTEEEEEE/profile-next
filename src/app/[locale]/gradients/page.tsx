import { gradients } from "@/lib/utils";

export default function GradientPreviewPage() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-8 bg-black min-h-screen">
      {gradients.map((g, i) => (
        <div key={i}
          className="h-40 rounded-lg shadow-md border border-gray-900 flex items-center justify-center"
          style={{ backgroundImage: g, backgroundSize: "cover" }}>
          <span className="text-white text-xs p-1 bg-black/50 rounded">{g}</span>
        </div>
      ))}
    </div>
  );
}
