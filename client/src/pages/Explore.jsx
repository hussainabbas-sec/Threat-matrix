import "../explore.css";
import { useEffect } from "react";

export default function Explore({ navigate }) {

  useEffect(() => {
    const canvas = document.getElementById("exploreCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.4 + 0.2
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(139,92,246,0.6)";
        ctx.fill();

        p.y += p.speed;

        if (p.y > canvas.height) {
          p.y = 0;
          p.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  const features = [
    {
      title: "Real-time Threat Detection",
      desc: "Detect DDoS, brute-force and suspicious activity instantly.",
      img: "/icons/detection.png"
    },
    {
      title: "Live SOC Dashboard",
      desc: "Visualize alerts, trends and threat activity in real-time.",
      img: "/icons/dashboard.png"
    },
    {
      title: "Log Analysis Engine",
      desc: "Analyze logs and detect malicious patterns efficiently.",
      img: "/icons/logs.png"
    },
    {
      title: "Splunk Integration",
      desc: "Create dashboards and alerts using real-world SOC tools.",
      img: "/icons/splunk.png"
    },
    {
      title: "Attack Simulation",
      desc: "Simulate DoS and brute-force attacks for testing.",
      img: "/icons/attack.png"
    },
    {
      title: "Encryption System",
      desc: "Secure sensitive data using AES encryption.",
      img: "/icons/encryption.png"
    },
    {
      title: "IP Blocking System",
      desc: "Automatically block malicious IP addresses.",
      img: "/icons/block.png"
    },
    {
      title: "Threat Intelligence",
      desc: "Identify high-risk patterns and behaviors.",
      img: "/icons/ai.png"
    },
    {
      title: "Data Analysis",
      desc: "Analyze logs using Excel & SQL dashboards.",
      img: "/icons/data.png"
    }
  ];

  return (
    <div className="exploreContainer">

      {/* 🔥 BACKGROUND CANVAS */}
      <canvas id="exploreCanvas"></canvas>

      {/* HERO */}
      <div className="exploreHero">
        <div className="exploreLeft">
          <h1>
            Explore <span>Threat Matrix</span>
          </h1>

          <p>
            A powerful SOC platform for monitoring, detecting and analyzing cyber threats in real-time.
          </p>

          <button className="backBtn" onClick={() => navigate("front")}>
            ← Back
          </button>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="sectionDivider"></div>

      {/* GRID */}
      <div className="featureGrid">
        {features.map((f, i) => (
          <div key={i} className="featureCard">

            <div className="iconWrap">
              <img src={f.img} alt="" className="cardIcon" />
            </div>

            <h3>{f.title}</h3>
            <p>{f.desc}</p>

          </div>
        ))}
      </div>

    </div>
  );
}