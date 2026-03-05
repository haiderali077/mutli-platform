import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const references = [
  { platform: "YouTube", fields: "title, description, tags, category, privacy" },
  { platform: "Instagram", fields: "caption, image_url, user_tags, location" },
  { platform: "Pinterest", fields: "title, description, board_id, source_type" },
  { platform: "Reddit", fields: "subreddit, post_type, title, text/url, nsfw" },
  { platform: "LinkedIn", fields: "author, text, visibility, media_type" },
];

export function FieldReferenceTable() {
  return (
    <Card>
      <CardHeader><CardTitle>Field Reference</CardTitle></CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="text-left py-2 font-medium">Platform</th><th className="text-left py-2 font-medium">Required Fields</th></tr></thead>
          <tbody>
            {references.map(r => (
              <tr key={r.platform} className="border-b last:border-0">
                <td className="py-2 font-medium">{r.platform}</td>
                <td className="py-2 text-gray-600">{r.fields}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
