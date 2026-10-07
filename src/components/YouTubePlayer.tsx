export default function YouTubePlayer({
  youtubeId,
  title,
  autoplay = false,
}: {
  youtubeId: string;
  title: string;
  autoplay?: boolean;
}) {
  return (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0${autoplay ? '&autoplay=1' : ''}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="absolute inset-0 h-full w-full"
    />
  );
}
