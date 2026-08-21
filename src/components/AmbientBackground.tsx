export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden [--orb:0.6] dark:[--orb:0.30]"
    >
      <div className="absolute inset-0 bg-canvas transition-colors duration-300" />
      {/* mesh gradient glows — inspired by the Sydecar reference */}
      <div
        className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full blur-[110px]"
        style={{
          opacity: "var(--orb)",
          background:
            "radial-gradient(circle, var(--color-lime-soft) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[8%] right-[-10%] h-[460px] w-[460px] rounded-full blur-[100px]"
        style={{
          opacity: "var(--orb)",
          background:
            "radial-gradient(circle, var(--color-pink-soft) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[38%] left-[20%] h-[380px] w-[380px] rounded-full blur-[110px]"
        style={{
          opacity: "var(--orb)",
          background:
            "radial-gradient(circle, var(--color-lemon) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[6%] right-[6%] h-[440px] w-[440px] rounded-full blur-[110px]"
        style={{
          opacity: "var(--orb)",
          background:
            "radial-gradient(circle, var(--color-lime) 0%, transparent 72%)",
        }}
      />
      <div
        className="absolute bottom-[-8%] left-[-6%] h-[420px] w-[420px] rounded-full blur-[110px]"
        style={{
          opacity: "var(--orb)",
          background:
            "radial-gradient(circle, var(--color-pink) 0%, transparent 72%)",
        }}
      />
    </div>
  );
}
