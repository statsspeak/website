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

type SceneNode = {
  amplitude: number;
  base: THREE.Vector3;
  phase: number;
};

type SceneEdge = [number, number];

const seeded = (index: number) => {
  const value = Math.sin(index * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const SCENE_COLUMNS = 6;
const SCENE_ROWS = 4;

const createNodes = () => {
  const nodes: SceneNode[] = [];
  const spacingX = 2.05;
  const spacingY = 1.35;
  const startX = -((SCENE_COLUMNS - 1) * spacingX) / 2;
  const startY = -((SCENE_ROWS - 1) * spacingY) / 2;

  for (let row = 0; row < SCENE_ROWS; row += 1) {
    for (let column = 0; column < SCENE_COLUMNS; column += 1) {
      const index = row * SCENE_COLUMNS + column;
      const jitterX = (seeded(index) - 0.5) * 0.85;
      const jitterY = (seeded(index + 80) - 0.5) * 0.7;
      const z = (seeded(index + 160) - 0.5) * 1.6;

      nodes.push({
        amplitude: 0.018 + seeded(index + 240) * 0.018,
        base: new THREE.Vector3(
          startX + column * spacingX + jitterX,
          startY + row * spacingY + jitterY,
          z,
        ),
        phase: seeded(index + 320) * Math.PI * 2,
      });
    }
  }

  return nodes;
};

const createEdges = (nodes: SceneNode[]) => {
  const edges: SceneEdge[] = [];

  for (let row = 0; row < SCENE_ROWS; row += 1) {
    for (let column = 0; column < SCENE_COLUMNS; column += 1) {
      const index = row * SCENE_COLUMNS + column;

      if (column < SCENE_COLUMNS - 1 && (column + row) % 2 === 0) {
        edges.push([index, index + 1]);
      }

      if (row < SCENE_ROWS - 1 && (column + row) % 3 === 0) {
        edges.push([index, index + SCENE_COLUMNS]);
      }
    }
  }

  return edges.filter(([start, end]) => nodes[start] && nodes[end]);
};

const updateNodePositions = (
  nodes: SceneNode[],
  target: Float32Array,
  elapsed: number,
) => {
  nodes.forEach((node, index) => {
    const offset = Math.sin(elapsed * 0.22 + node.phase) * node.amplitude;
    const cursor = index * 3;

    target[cursor] = node.base.x;
    target[cursor + 1] = node.base.y + offset;
    target[cursor + 2] = node.base.z;
  });
};

const updateEdgePositions = (
  edges: SceneEdge[],
  nodePositions: Float32Array,
  target: Float32Array,
) => {
  edges.forEach(([start, end], index) => {
    const edgeCursor = index * 6;
    const startCursor = start * 3;
    const endCursor = end * 3;

    target[edgeCursor] = nodePositions[startCursor];
    target[edgeCursor + 1] = nodePositions[startCursor + 1];
    target[edgeCursor + 2] = nodePositions[startCursor + 2];
    target[edgeCursor + 3] = nodePositions[endCursor];
    target[edgeCursor + 4] = nodePositions[endCursor + 1];
    target[edgeCursor + 5] = nodePositions[endCursor + 2];
  });
};

function DataIntelligenceScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
      preserveDrawingBuffer: true,
    });
    renderer.setClearColor(0xffffff, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 11);

    const nodes = createNodes();
    const edges = createEdges(nodes);
    const nodePositions = new Float32Array(nodes.length * 3);
    const edgePositions = new Float32Array(edges.length * 6);
    const highlightCount = 4;
    const highlightPositions = new Float32Array(highlightCount * 3);

    updateNodePositions(nodes, nodePositions, 0);
    updateEdgePositions(edges, nodePositions, edgePositions);

    for (let index = 0; index < highlightCount; index += 1) {
      const nodeIndex = (index * 7 + 2) % nodes.length;
      const nodeCursor = nodeIndex * 3;
      const highlightCursor = index * 3;

      highlightPositions[highlightCursor] = nodePositions[nodeCursor];
      highlightPositions[highlightCursor + 1] = nodePositions[nodeCursor + 1];
      highlightPositions[highlightCursor + 2] = nodePositions[nodeCursor + 2];
    }

    const edgeGeometry = new THREE.BufferGeometry();
    edgeGeometry.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x0a0b0d,
      opacity: 0.08,
      transparent: true,
    });
    const edgeMesh = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    scene.add(edgeMesh);

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x0a0b0d,
      opacity: 0.32,
      size: 0.045,
      transparent: true,
    });
    const nodeMesh = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodeMesh);

    const highlightGeometry = new THREE.BufferGeometry();
    highlightGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(highlightPositions, 3),
    );
    const highlightMaterial = new THREE.PointsMaterial({
      color: 0x064a55,
      opacity: 0.6,
      size: 0.075,
      transparent: true,
    });
    const highlightMesh = new THREE.Points(highlightGeometry, highlightMaterial);
    scene.add(highlightMesh);

    const resize = () => {
      const { clientHeight, clientWidth } = mount;

      renderer.setSize(clientWidth, clientHeight, true);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let frameId = 0;
    const startedAt = performance.now();

    const render = () => {
      const elapsed = (performance.now() - startedAt) / 1000;
      const motionTime = prefersReducedMotion.matches ? 0 : elapsed;

      updateNodePositions(nodes, nodePositions, motionTime);
      updateEdgePositions(edges, nodePositions, edgePositions);

      nodeGeometry.attributes.position.needsUpdate = true;
      edgeGeometry.attributes.position.needsUpdate = true;

      const sceneRotation = Math.sin(motionTime * 0.04) * 0.012;
      edgeMesh.rotation.z = sceneRotation;
      nodeMesh.rotation.z = sceneRotation;
      highlightMesh.rotation.z = sceneRotation;

      renderer.render(scene, camera);

      if (!prefersReducedMotion.matches) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      edgeGeometry.dispose();
      nodeGeometry.dispose();
      highlightGeometry.dispose();
      edgeMaterial.dispose();
      nodeMaterial.dispose();
      highlightMaterial.dispose();
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
      data-testid="data-intelligence-scene"
    />
  );
}

export function StatsspeakHero({
  title = "Data and software institutions can defend.",
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
      <DataIntelligenceScene />
      <div className="absolute inset-0 statsspeak-hero-scrim" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid min-h-[420px] items-center gap-12 lg:min-h-[480px] lg:grid-cols-12 lg:gap-16">
          <div className="max-w-4xl animate-fade-in-up lg:col-span-8">
            <div className="text-micro text-marine mb-6 tracking-[0.3em] md:mb-8">
              Data consultancy · Software · Nairobi
            </div>
            <h1
              id="statsspeak-hero-title"
              className="font-display text-5xl font-semibold leading-[0.96] tracking-tight text-ink sm:text-6xl md:text-7xl"
            >
              {title}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-500 md:mt-10 md:text-lg">
              {description}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-11">
              <Button
                size="lg"
                variant="primary"
                onClick={onScheduleConsultation}
                className="bg-statsspeak-navy text-white hover:bg-marine-700"
              >
                Book an introduction
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={onExploreSolutions}
                className="border-statsspeak-blue text-statsspeak-navy hover:border-statsspeak-teal hover:bg-marine-50 hover:text-statsspeak-navy"
              >
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

export { DataIntelligenceScene };
