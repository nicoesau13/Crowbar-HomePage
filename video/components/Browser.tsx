import type { ReactNode } from "react";
import { LogoMark } from "@/components/ui/Logo";
import { SourceIcon } from "@/components/ui/SourceIcon";
import type { SourceKind } from "@/lib/demo-data";
import { useLayout } from "./layout";

export type Tab = { id: string; title: string; kind: SourceKind };

type Props = {
  tabs: Tab[];
  activeTab: string;
  address: string;
  page: ReactNode;
  panel?: ReactNode;
  /** Animated panel width (16:9) or height (9:16), logical px. 0 = closed. */
  panelSize?: number;
  /** Glow on the Crowbar toolbar button. */
  crowbarActive?: boolean;
  /** Narrow tabs for the "too many tabs" look. */
  crampedTabs?: boolean;
};

/** Fake browser window built from the site's tokens and components. */
export function Browser({
  tabs,
  activeTab,
  address,
  page,
  panel,
  panelSize = 0,
  crowbarActive = false,
  crampedTabs = false,
}: Props) {
  const L = useLayout();
  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden border border-line-strong/70 bg-bg shadow-panel"
      style={{ width: L.W, height: L.H }}
    >
      <div className="shrink-0 border-b border-line bg-surface" style={{ height: L.chrome }}>
        <div className="flex h-[38px] gap-px overflow-hidden border-b border-line px-2 pt-1.5">
          {tabs.map((t) => {
            const on = t.id === activeTab;
            return (
              <div
                key={t.id}
                className={`flex min-w-0 items-center gap-1.5 border border-b-0 px-2.5 text-[11px] ${
                  crampedTabs ? "max-w-[7.5rem] shrink" : "max-w-[13rem] shrink-0"
                } ${on ? "border-line bg-bg text-ink" : "border-transparent text-muted"}`}
              >
                <SourceIcon kind={t.kind} className="h-3 w-3 shrink-0" />
                <span className="truncate">{t.title}</span>
              </div>
            );
          })}
        </div>
        <div className="flex h-[41px] items-center gap-3 px-3">
          <span className="font-mono text-[11px] text-muted">←&nbsp;→&nbsp;↻</span>
          <div className="min-w-0 flex-1 truncate border border-line bg-bg px-3 py-1 font-mono text-[11px] text-muted">
            {address}
          </div>
          <span
            className={`border p-[3px] ${crowbarActive ? "border-accent bg-accent/15" : "border-line"}`}
          >
            <LogoMark className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className={`flex min-h-0 flex-1 ${L.vertical ? "flex-col" : "flex-row"}`}>
        <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden">{page}</div>
        {panel && panelSize > 0 ? (
          <div
            className={`relative shrink-0 overflow-hidden bg-surface ${
              L.vertical ? "border-t border-line" : "border-l border-line"
            }`}
            style={L.vertical ? { height: panelSize } : { width: panelSize }}
          >
            {/* Fixed inner size so content doesn't reflow while the panel slides open */}
            <div
              className="absolute right-0 top-0 h-full"
              style={
                L.vertical
                  ? { width: L.W, height: L.panelSize, top: 0 }
                  : { width: L.panelSize, height: "100%" }
              }
            >
              {panel}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
