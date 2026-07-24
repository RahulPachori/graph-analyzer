import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import GraphCanvas from "./components/GraphCanvas";
import RightPanel from "./components/RightPanel";
import { parseGraph } from "./utils/parseGraph";
import { applyFrame } from "./animation/animationEngine";
import SplashScreen from "./components/SplashScreen";
import { AnimatePresence ,motion} from "framer-motion";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { bfs } from "./algorithms/bfs";
import { dfs } from "./algorithms/dfs";
import { dijkstra } from "./algorithms/dijkstra";
import { prim } from "./algorithms/prim";
import { kruskal } from "./algorithms/kruskal";
import { bellmanFord } from "./algorithms/bellmanFord";
import { topologicalSort } from "./algorithms/topologicalSort";
import { cycleDetection } from "./algorithms/cycleDetection";
import { connectedComponents } from "./algorithms/connectedComponents";
import { floydWarshall } from "./algorithms/floydWarshall";

function App() {

  const [graphInput, setGraphInput] = useState(`6
8
1 2 4
1 3 2
2 3 1
2 4 5
3 5 3
5 4 2
4 6 4
5 6 6`);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const [weighted, setWeighted] = useState(true);
  const [directed, setDirected] = useState(true);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [graph, setGraph] = useState(null);

  const [source, setSource] = useState(1);

  const [frames, setFrames] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);

  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);

  const [activeNodes, setActiveNodes] = useState([]);
  const [activeEdges, setActiveEdges] = useState([]);

  const [visitedEdges, setVisitedEdges] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);

  const [queue, setQueue] = useState([]);
  const [visited, setVisited] = useState([]);
  const [logs, setLogs] = useState([]);

  const [output, setOutput] = useState([]);

  const [algorithm, setAlgorithm] = useState("bfs");
  const [destination, setDestination] = useState("");

  const [matrix, setMatrix] = useState([]);

  
  function clearAnimationState() {

    setRunning(false);
    setStarted(false);

    setFrames([]);
    setFrameIndex(0);

    setActiveNodes([]);
    setActiveEdges([]);

    setVisitedNodes([]);
    setVisitedEdges([]);
    setMatrix([]);

    setQueue([]);
    setVisited([]);
    setLogs([]);
    setOutput([]);

  }

  function updateGraph() {

    clearAnimationState();

    const g = parseGraph(
      graphInput,
      weighted,
      directed
    );

    setNodes(g.nodes);
    setEdges(g.edges);
    setGraph(g);
  }

  useEffect(() => {
    clearAnimationState();

    const g = parseGraph(
      graphInput,
      weighted,
      directed
    );

    setNodes(g.nodes);
    setEdges(g.edges);
    setGraph(g);
  }, [weighted, directed]);

  function runAlgorithm() {

    if (source === "") {
      alert("Please enter a source node.");
      return;
    }

    if (
      (algorithm === "dijkstra" ||
        algorithm === "bellmanford") &&
      destination === ""
    ) {
      alert("Please enter a destination node.");
      return;
    }

    if (
      directed &&
      (algorithm === "prim" || algorithm === "kruskal")
    ) {
      alert(
        `${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)}'s Algorithm works only on undirected graphs.\n\nPlease disable the Directed option.`
      );
      return;
    }

    if (!directed && algorithm === "toposort") {
      alert(
        "Topological Sort works only on directed acyclic graphs (DAGs).\n\nPlease enable the Directed option."
      );
      return;
    }

    if (!weighted && algorithm === "floydwarshall") {
      alert("Floyd-Warshall requires weighted edges.");
      return;
    }

    clearAnimationState();

    let ans;

    switch (algorithm) {

      case "bfs":
        ans = bfs(graph.adj, Number(source));
        break;

      case "dfs":
        ans = dfs(graph.adj, Number(source));
        break;

      case "dijkstra":
        ans = dijkstra(
          graph.adj,
          Number(source),
          Number(destination)
        );
        break;

      case "prim":
        ans = prim(graph.adj, Number(source));
        break;

      case "kruskal":
        ans = kruskal(graph.adj);
        break;

      case "bellmanford":
        ans = bellmanFord(
          graph.adj,
          Number(source),
          Number(destination)
        );
        break;

      case "toposort":
        ans = topologicalSort(graph.adj);
        break;

      case "cycle":
        ans = cycleDetection(graph.adj, directed);
        break;

      case "components":
        ans = connectedComponents(graph.adj);
        break;

      case "floydwarshall":
        ans = floydWarshall(graph);
        break;

      default:
        alert(`${algorithm} is not implemented yet.`);
        return;
    }

    setFrames(ans.frames);
    setOutput(ans.output);

    setStarted(true);
    setRunning(true);
  }

  function toggleAnimation() {

    if (!started) return;

    setRunning(prev => !prev);
  }

  function resetAnimation() {

    clearAnimationState();
  }

  useEffect(() => {

    if (!running) return;

    if (frameIndex >= frames.length) {

      setRunning(false);

      setActiveNodes([]);
      setActiveEdges([]);

      return;
    }

    const t = setTimeout(() => {

      const frame = frames[frameIndex];

      setQueue(frame.queue);
      setVisited(frame.visited);

      setLogs(prev => [
        ...prev,
        ...frame.logs,
      ]);

      const state = applyFrame(frame);

      setVisitedNodes(prev => {

        const s = new Set(prev);

        state.activeNodes.forEach(x => s.add(x));

        return [...s];

      });

      setActiveNodes(state.activeNodes);
      setActiveEdges(state.activeEdges);
      setVisitedEdges(state.mstEdges);

      setFrameIndex(prev => prev + 1);

    }, 700);

    return () => clearTimeout(t);

  }, [running, frameIndex, frames]);



  return (
    
    <>
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.97,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            transition={{
                duration: 0.5,
                delay: 1.55,
            }}
        >
        <div className="h-screen flex flex-col bg-base-100 text-base-content">

          <Navbar />

          <PanelGroup
            direction="horizontal"
            className="flex-1 overflow-hidden"
          >

            <Panel
              defaultSize={20}
              minSize={16}
              maxSize={35}
            >
              <Sidebar
                graphInput={graphInput}
                setGraphInput={setGraphInput}
                weighted={weighted}
                setWeighted={setWeighted}
                directed={directed}
                setDirected={setDirected}
                updateGraph={updateGraph}
                source={source}
                setSource={setSource}
                runAlgorithm={runAlgorithm}
                toggleAnimation={toggleAnimation}
                resetAnimation={resetAnimation}
                running={running}
                started={started}
                algorithm={algorithm}
                setAlgorithm={setAlgorithm}
                destination={destination}
                setDestination={setDestination}
              />
            </Panel>

            <PanelResizeHandle className="resize-handle" />

            <Panel
              defaultSize={45}
              minSize={30}
            >
              <GraphCanvas
                nodes={nodes}
                edges={edges}
                activeNodes={activeNodes}
                activeEdges={activeEdges}
                visitedNodes={visitedNodes}
                visitedEdges={visitedEdges}
                directed={directed}
              />
            </Panel>

            <PanelResizeHandle className="resize-handle" />

            <Panel
              defaultSize={35}
              minSize={18}
              maxSize={40}
            >
              <RightPanel
                algorithm={algorithm}
                queue={queue}
                logs={logs}
                output={output}
                matrix={matrix}
              />
            </Panel>

          </PanelGroup>

        </div>
        </motion.div>

        <AnimatePresence mode="wait">
            {loading && <SplashScreen />}
        </AnimatePresence>
    </>
    
  );

}

export default App;