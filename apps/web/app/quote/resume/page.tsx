import QuoteResumeClient from "./QuoteResumeClient";

export default function QuoteResumePage({
  searchParams
}: {
  searchParams?: { token?: string };
}) {
  const token = searchParams?.token ?? "";
  return <QuoteResumeClient token={token} />;
}

