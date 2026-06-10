import Particles from "react-tsparticles";

export default function ParticlesBg() {
  return (
    <Particles
      options={{
        background: { color: "#020617" },
        particles: {
          number: { value: 50 },
          color: { value: "#22d3ee" },
          links: {
            enable: true,
            color: "#22d3ee"
          },
          move: { enable: true, speed: 1 }
        }
      }}
    />
  );
}