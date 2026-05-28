import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import * as THREE from "three";
import { Button } from "./ui/button";

interface StatsspeakHeroProps {
  title?: string;
  description?: string;
  onScheduleConsultation: () => void;
  onExploreSolutions: () => void;
}

// GLSL — 3D simplex noise (Ashima / Stefan Gustavson). Used to deform the
// icosahedron vertices for organic surface motion.
const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g  = step(x0.yzx, x0.xyz);
  vec3 l  = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

function IcosahedronScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setClearColor(0xffffff, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    const geometry = new THREE.IcosahedronGeometry(1.35, 48);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointLightPos: { value: new THREE.Vector3(0.8, 0.5, 2.4) },
        lineColor: { value: new THREE.Color(0x0a0b0d) },
        accentColor: { value: new THREE.Color(0x064a55) },
      },
      vertexShader: /* glsl */ `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        ${NOISE_GLSL}
        void main() {
          vNormal = normal;
          float displacement = snoise(position * 1.4 + time * 0.18) * 0.12;
          vec3 displaced = position + normal * displacement;
          vWorldPos = displaced;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 lineColor;
        uniform vec3 accentColor;
        uniform vec3 pointLightPos;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 lightDir = normalize(pointLightPos - vWorldPos);
          float diffuse = clamp(dot(normal, lightDir), 0.0, 1.0);
          float fresnel = pow(1.0 - max(dot(normal, vec3(0.0, 0.0, 1.0)), 0.0), 2.0);
          vec3 col = mix(lineColor, accentColor, fresnel * 0.55);
          col *= 0.55 + diffuse * 0.65;
          gl_FragColor = vec4(col, 0.92);
        }
      `,
      wireframe: true,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // The icosahedron lives in the right column (where the scrim is light).
    // On narrow viewports we slide it back to centre so it stays visible.
    const resize = () => {
      const { clientHeight, clientWidth } = mount;
      renderer.setSize(clientWidth, clientHeight, true);
      const aspect = clientWidth / Math.max(clientHeight, 1);
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      const isWide = clientWidth >= 1024;
      mesh.position.set(isWide ? 1.55 : 0, isWide ? -0.15 : 0, 0);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    // Cursor-tracked point light. Lerped, not snapped — a true follow reads as a
    // mouse-trail effect, which DESIGN.md §6.6 forbids. The lerp turns it into a
    // gentle response.
    const targetLight = new THREE.Vector3(0.8, 0.5, 2.4);
    const currentLight = targetLight.clone();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        return;
      }
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetLight.set(x * 2.6, y * 1.8, 2.4);
    };

    window.addEventListener("mousemove", handleMouseMove);

    let frameId = 0;
    const startedAt = performance.now();

    const render = () => {
      const elapsed = (performance.now() - startedAt) / 1000;
      const motionTime = prefersReducedMotion.matches ? 0 : elapsed;

      material.uniforms.time.value = motionTime;
      currentLight.lerp(targetLight, prefersReducedMotion.matches ? 1 : 0.06);
      (material.uniforms.pointLightPos.value as THREE.Vector3).copy(currentLight);

      if (!prefersReducedMotion.matches) {
        mesh.rotation.y += 0.0008;
        mesh.rotation.x += 0.00025;
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      data-testid="icosahedron-scene"
    />
  );
}

export function StatsspeakHero({
  title = "Data and software institutions can trust.",
  description = "StatsSpeak is a data consultancy and software development practice working with organisations across Africa. We support the path from strategy and governance to platforms, analytics, geospatial insight, AI workflows, custom software, and operational handover.",
  onScheduleConsultation,
  onExploreSolutions,
}: StatsspeakHeroProps) {
  return (
    <section
      aria-labelledby="statsspeak-hero-title"
      className="relative isolate overflow-hidden bg-bone pt-28 pb-16 sm:pb-20 lg:pt-32 lg:pb-20"
    >
      <div className="absolute inset-0 statsspeak-hero-data-surface" aria-hidden="true" />
      <IcosahedronScene />
      <div className="absolute inset-0 statsspeak-hero-scrim" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid min-h-[420px] items-center gap-12 lg:min-h-[480px] lg:grid-cols-12 lg:gap-16">
          <div className="max-w-4xl animate-fade-in-up lg:col-span-8">
            <div className="text-micro text-ink-500 mb-8 md:mb-10">
              Data consultancy · Software
            </div>
            <h1
              id="statsspeak-hero-title"
              className="text-display-1 text-ink"
            >
              {title}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-500 md:mt-10 md:text-lg">
              {description}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-11">
              <Button size="lg" variant="primary" onClick={onScheduleConsultation}>
                Book an introduction
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button size="lg" variant="secondary" onClick={onExploreSolutions}>
                Read selected work
              </Button>
            </div>
          </div>

          <div className="hidden lg:col-span-4 lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export { IcosahedronScene };
