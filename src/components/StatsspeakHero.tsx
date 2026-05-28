import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import * as THREE from "three";
import { Button } from "./ui/button";

interface StatsspeakHeroProps {
  title?: string;
  subtitle?: string;
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

const createNodes = () => {
  const nodes: SceneNode[] = [];
  const columns = 8;
  const rows = 5;
  const spacingX = 1.62;
  const spacingY = 1.08;
  const startX = -((columns - 1) * spacingX) / 2;
  const startY = -((rows - 1) * spacingY) / 2;

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const index = row * columns + column;
      const jitterX = (seeded(index) - 0.5) * 0.34;
      const jitterY = (seeded(index + 80) - 0.5) * 0.28;
      const z = (seeded(index + 160) - 0.5) * 1.35;

      nodes.push({
        amplitude: 0.035 + seeded(index + 240) * 0.035,
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
  const columns = 8;
  const rows = 5;

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const index = row * columns + column;

      if (column < columns - 1) {
        edges.push([index, index + 1]);
      }

      if (row < rows - 1 && (column + row) % 2 === 0) {
        edges.push([index, index + columns]);
      }

      if (column < columns - 1 && row < rows - 1 && (column + row) % 3 === 0) {
        edges.push([index, index + columns + 1]);
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
    const offset = Math.sin(elapsed * 0.55 + node.phase) * node.amplitude;
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

const updateFlowPositions = (
  edges: SceneEdge[],
  nodePositions: Float32Array,
  target: Float32Array,
  elapsed: number,
) => {
  const flowCount = target.length / 3;

  for (let index = 0; index < flowCount; index += 1) {
    const edge = edges[(index * 7 + Math.floor(elapsed * 0.22)) % edges.length];
    const progress = (elapsed * (0.1 + index * 0.018) + index * 0.22) % 1;
    const startCursor = edge[0] * 3;
    const endCursor = edge[1] * 3;
    const flowCursor = index * 3;

    target[flowCursor] =
      nodePositions[startCursor] +
      (nodePositions[endCursor] - nodePositions[startCursor]) * progress;
    target[flowCursor + 1] =
      nodePositions[startCursor + 1] +
      (nodePositions[endCursor + 1] - nodePositions[startCursor + 1]) * progress;
    target[flowCursor + 2] =
      nodePositions[startCursor + 2] +
      (nodePositions[endCursor + 2] - nodePositions[startCursor + 2]) * progress;
  }
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
    const flowPositions = new Float32Array(18 * 3);
    const highlightPositions = new Float32Array(8 * 3);

    updateNodePositions(nodes, nodePositions, 0);
    updateEdgePositions(edges, nodePositions, edgePositions);
    updateFlowPositions(edges, nodePositions, flowPositions, 0);

    for (let index = 0; index < highlightPositions.length / 3; index += 1) {
      const nodeIndex = (index * 5 + 3) % nodes.length;
      const nodeCursor = nodeIndex * 3;
      const highlightCursor = index * 3;

      highlightPositions[highlightCursor] = nodePositions[nodeCursor];
      highlightPositions[highlightCursor + 1] = nodePositions[nodeCursor + 1];
      highlightPositions[highlightCursor + 2] = nodePositions[nodeCursor + 2];
    }

    const edgeGeometry = new THREE.BufferGeometry();
    edgeGeometry.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x0d2746,
      opacity: 0.14,
      transparent: true,
    });
    const edgeMesh = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    scene.add(edgeMesh);

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x0d2746,
      opacity: 0.58,
      size: 0.06,
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
      color: 0x00acc8,
      opacity: 0.76,
      size: 0.105,
      transparent: true,
    });
    const highlightMesh = new THREE.Points(highlightGeometry, highlightMaterial);
    scene.add(highlightMesh);

    const flowGeometry = new THREE.BufferGeometry();
    flowGeometry.setAttribute("position", new THREE.BufferAttribute(flowPositions, 3));
    const flowMaterial = new THREE.PointsMaterial({
      color: 0x1d5faf,
      opacity: 0.72,
      size: 0.075,
      transparent: true,
    });
    const flowMesh = new THREE.Points(flowGeometry, flowMaterial);
    scene.add(flowMesh);

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
      updateFlowPositions(edges, nodePositions, flowPositions, motionTime);

      nodeGeometry.attributes.position.needsUpdate = true;
      edgeGeometry.attributes.position.needsUpdate = true;
      flowGeometry.attributes.position.needsUpdate = true;

      edgeMesh.rotation.z = Math.sin(motionTime * 0.08) * 0.02;
      nodeMesh.rotation.z = edgeMesh.rotation.z;
      highlightMesh.rotation.z = edgeMesh.rotation.z;
      flowMesh.rotation.z = edgeMesh.rotation.z;

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
      flowGeometry.dispose();
      edgeMaterial.dispose();
      nodeMaterial.dispose();
      highlightMaterial.dispose();
      flowMaterial.dispose();
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
  title = "Data work institutions can defend.",
  subtitle = "A Nairobi consultancy for ministries, NGOs, and growth-stage enterprises across East Africa.",
  description = "StatsSpeak is a data consultancy and software development practice. Strategy, governance, platforms, analytics, geospatial intelligence, AI, and software — delivered for handover.",
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
            <p className="mt-6 max-w-2xl text-lg leading-relaxed font-medium text-statsspeak-navy md:mt-8 md:text-xl">
              {subtitle}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500 md:mt-5 md:text-lg">
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
