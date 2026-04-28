import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#ffffff",
          color: "#111111",
          padding: "72px",
          fontFamily: "Inter, Arial, sans-serif"
        }}
      >
        <div style={{ color: "#2563eb", fontSize: 28, fontWeight: 600 }}>
          Martin Rozariyo
        </div>
        <div style={{ marginTop: 28, maxWidth: 900, fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
          Cybersecurity Student
        </div>
        <div style={{ marginTop: 28, color: "#4b5563", fontSize: 34 }}>
          CTF Player | Web Security Enthusiast
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
