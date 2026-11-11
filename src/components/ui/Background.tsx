"use client";

/**
 * Page backdrop: a slowly moving mesh of soft color, a dot grid and fine grain
 * for texture. Fixed behind all content.
 */
export default function Background() {
  return (
    <div className="page-bg" aria-hidden="true">
      <div className="mesh">
        <span className="mesh-blob mesh-1" />
        <span className="mesh-blob mesh-2" />
        <span className="mesh-blob mesh-3" />
        <span className="mesh-blob mesh-4" />
      </div>
      <div className="dots" />
      <div className="grain" />
    </div>
  );
}
