"use client"
import { useChannelById } from "@/hooks/communities/useChannelById";
import { use } from "react";

interface ChannelPageProps {
  params: Promise<{ slug: string; id: string; channelId: string }>;
}

const page = ({ params }: ChannelPageProps) => {
  const resolvedParams = use(params);

  const { channel, isLoading, error } = useChannelById(
    resolvedParams.channelId,
    resolvedParams.id,
  );

  return <div className="py-20 my-20">
    <h1>{channel?.name}</h1>
  </div>;
};

export default page;
