import { Suspense, lazy } from "react";
import "antd4/dist/antd.css";
import "@ant-design/flowchart/dist/index.css";
import "./index.less";

const Flowchart = lazy(() =>
	import("@ant-design/flowchart").then((module) => ({
		default: module.Flowchart,
	})),
);

const magnetAvailabilityHighlighter = {
	name: "stroke",
	args: {
		padding: 3,
		attrs: {
			strokeWidth: 3,
			stroke: "#52c41a",
		},
	},
};

function App() {
	return (
		<Suspense fallback={<div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>I am loading... (╯°□°)╯</div>}>
			<Flowchart
				canvasProps={{
					config: {
						grid: true,
						highlighting: {
							magnetAvailable: magnetAvailabilityHighlighter,
						},
						connecting: {
							snap: true,
							allowBlank: false,
							allowLoop: false,
							allowNode: false,
							highlight: true,
							validateMagnet({ magnet }) {
								return magnet.getAttribute("port-group") !== "in";
							},

							validateConnection({ sourceMagnet, targetMagnet }) {
								if (
									!sourceMagnet ||
									sourceMagnet.getAttribute("port-group") === "in"
								) {
									return false;
								}

								if (
									!targetMagnet ||
									targetMagnet.getAttribute("port-group") !== "in"
								) {
									return false;
								}

								return true;
							},
						},
					},
				}}
				onReady={(graph) => {
					const source = graph.addNode({
						x: 40,
						y: 40,
						width: 100,
						height: 40,
						attrs: {
							body: {
								fill: "#f5f5f5",
								stroke: "#d9d9d9",
								strokeWidth: 1,
							},
						},
						ports: {
							groups: {
								in: {
									position: { name: "top" },
								},
								out: {
									position: { name: "bottom" },
								},
							},
							items: [
								{ id: "in-1", group: "in" },
								{ id: "in-2", group: "in" },
								{ id: "out-1", group: "out" },
								{ id: "out-2", group: "out" },
							],
						},
						portMarkup: [
							{
								tagName: "circle",
								selector: "portBody",
								attrs: {
									r: 5,
									magnet: 1,
									stroke: "#31d0c6",
									fill: "#fff",
									strokeWidth: 2,
								},
							},
						],
					});

					const target = graph.addNode({
						x: 140,
						y: 240,
						width: 100,
						height: 40,
						attrs: {
							body: {
								fill: "#f5f5f5",
								stroke: "#d9d9d9",
								strokeWidth: 1,
							},
						},
						ports: {
							groups: {
								in: {
									position: { name: "top" },
								},
								out: {
									position: { name: "bottom" },
								},
							},
							items: [
								{ id: "in-1", group: "in" },
								{ id: "in-2", group: "in" },
								{ id: "out-1", group: "out" },
								{ id: "out-2", group: "out" },
							],
						},
						portMarkup: [
							{
								tagName: "circle",
								selector: "portBody",
								attrs: {
									r: 5,
									magnet: 1,
									stroke: "#31d0c6",
									fill: "#fff",
									strokeWidth: 2,
								},
							},
						],
					});

					graph.addNode({
						x: 320,
						y: 120,
						width: 100,
						height: 40,
						attrs: {
							body: {
								fill: "#f5f5f5",
								stroke: "#d9d9d9",
								strokeWidth: 1,
							},
						},
						ports: {
							groups: {
								in: {
									position: { name: "top" },
								},
								out: {
									position: { name: "bottom" },
								},
							},
							items: [
								{ id: "in-1", group: "in" },
								{ id: "in-2", group: "in" },
								{ id: "out-1", group: "out" },
								{ id: "out-2", group: "out" },
							],
						},
						portMarkup: [
							{
								tagName: "circle",
								selector: "portBody",
								attrs: {
									r: 5,
									magnet: 1,
									stroke: "#31d0c6",
									fill: "#fff",
									strokeWidth: 2,
								},
							},
						],
					});

					graph.addEdge({
						source: { cell: source.id, port: "out-2" },
						target: { cell: target.id, port: "in-1" },
					});

					graph.addEdge({
						source: { cell: source.id, port: "out-1" },
						target: { cell: target.id, port: "in-2" },
					});

					graph.on("edge:mouseenter", ({ cell }) => {
						cell.addTools([
							{
								name: "source-arrowhead",
							},
							{
								name: "target-arrowhead",
								args: {
									attrs: {
										fill: "red",
									},
								},
							},
						]);
					});

					graph.on("edge:mouseleave", ({ cell }) => {
						cell.removeTools();
					});
				}}
			/>
		</Suspense>
	);
}
export default App;
