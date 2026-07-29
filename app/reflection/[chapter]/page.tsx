import { ReflectionChapterView } from "@/app/reflection/[chapter]/reflection-chapter-view";

type ReflectionChapterPageProps = {
  params: Promise<{ chapter: string }>;
};

export default async function ReflectionChapterPage({
  params,
}: ReflectionChapterPageProps) {
  const { chapter } = await params;
  return <ReflectionChapterView chapter={chapter} />;
}