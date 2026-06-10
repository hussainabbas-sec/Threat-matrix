import "../index.css";
import { useEffect } from "react";

export default function FrontPage({ navigate }) {

  useEffect(() => {
    const canvas = document.getElementById("bgCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        dx: (Math.random() - 0.5) * 0.6,
        dy: (Math.random() - 0.5) * 0.6
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#6366f1";
        ctx.fill();

        particles.forEach((p2) => {
          let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "rgba(99,102,241,0.08)";
            ctx.stroke();
          }
        });

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div className="container">

      <canvas id="bgCanvas"></canvas>

      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">
          THREAT MATRIX
          <p>DETECT. ANALYZE. DEFEND.</p>
        </div>

        <button className="loginBtn" onClick={() => navigate("login")}>
          Login
        </button>
      </div>

      {/* HERO */}
      <div className="hero">

        {/* 🔥 LEFT SIDE FIX */}
        <div className="heroLeft">

          <div className="tag">
            Smart Security. Proactive Defense.
          </div>

          <h1 className="heroTitle">
            THREAT <br /> MATRIX
          </h1>

          <h2 className="heroSub">
            STAY AHEAD OF EVERY THREAT
          </h2>

          <p className="heroDesc">
            Advanced SOC platform to detect, analyze and respond to cyber threats in real-time.
          </p>

          <div className="heroBtns">
            <button className="primaryBtn">Get Started →</button>
            <button
              className="outlineBtn"
              onClick={() => navigate("explore")}
            >
              Explore Features →
            </button>
          </div>

        </div>

        {/* 🔥 RIGHT SIDE (WOLF FIXED) */}
        <div className="neonWolf">
          <div className="wolfGlow"></div>

          <img
            src="/wolf.png"
            alt="wolf"
            className="wolfImg"
          />
        </div>

      </div>
      {/* 🔥 DIVIDER */}
      <div className="sectionDivider"></div>

      {/* FEATURES */}
      <div className="features">

        <div className="featureCard">
          <h3>Real-time Detection</h3>
          <p>Detect threats as they happen with live monitoring.</p>
        </div>

        <div className="featureCard">
          <h3>Threat Intelligence</h3>
          <p>AI-powered insights to identify advanced threats.</p>
        </div>

        <div className="featureCard">
          <h3>Incident Response</h3>
          <p>Automated workflows to respond faster.</p>
        </div>

        <div className="featureCard">
          <h3>Detailed Reports</h3>
          <p>Generate reports and visualize security metrics.</p>
        </div>

      </div>

      {/* FOOTER */}
      <div className="footer">
        <div>
          <h2>THREAT MATRIX</h2>
          <p>© 2026 Threat Matrix</p>
        </div>

        <div className="footerMid">
          <span>DETECT</span>
          <span>ANALYZE</span>
          <span>DEFEND</span>
        </div>

        <div>
          <p>Building a safer digital world</p>
        </div>
      </div>

      <div className="glowOrb"></div>

    </div>
  );
}