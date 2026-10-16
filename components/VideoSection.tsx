import { Reveal } from "@/components/ui/Reveal";

/** Product video rendered from /video (npm run video:render). */
export function VideoSection() {
  return (
    <section aria-label="Product video" className="border-b border-line py-section">
      <div className="container-page">
        <Reveal>
          <video
            className="aspect-video w-full border border-line bg-bg"
            controls
            playsInline
            preload="metadata"
            poster="/video/crowbar-demo-poster.jpg"
          >
            <source src="/video/crowbar-demo.mp4" type="video/mp4" />
            <track
              kind="captions"
              src="/video/crowbar-demo.vtt"
              srcLang="en"
              label="English"
              default
            />
          </video>
        </Reveal>
      </div>
    </section>
  );
}
