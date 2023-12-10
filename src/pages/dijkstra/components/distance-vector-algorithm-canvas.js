import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare'
import { faRefresh } from '@fortawesome/free-solid-svg-icons/faRefresh'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { distanceVectorAlgorithm } from '../algorithms/distance-vector-algorithm'
import '../assets/styles/canvas.css'
import DraggableNode from '../components/draggable-node'
import SanitizeText from '../utilities/sanitize-text'
import { dismissToast, errorToast, infoToast, successToast } from '../utilities/toast'
import Edge from './edge'

const defaultNodeData = [
    { id: 'A', x: 150, y: 100 },
    { id: 'B', x: 400, y: 100 },
    { id: 'C', x: 250, y: 250 },
]

const defaultEdgeData = [
    { endNodeId: 'B', id: 'AB', startNodeId: 'A', weight: 10 },
    { endNodeId: 'C', id: 'BC', startNodeId: 'B', weight: 15 },
]

const DistanceVectorAlgorithmCanvas = () => {
    // State for nodes in the graph with initial values
    const [nodes, setNodes] = useState(defaultNodeData)
    // State for edges between nodes in the graph with initial values
    const [edges, setEdges] = useState(defaultEdgeData)
    // State for currently selected edge ID
    const [selectedEdgeIds, setSelectedEdgeIds] = useState([])
    // State for currently selected nodes in the graph
    const [selectedNodes, setSelectedNodes] = useState([])
    // State for the selected weight of the edge
    const [selectedWeight, setSelectedWeight] = useState(null)
    // State for the starting node
    const [numberOfIterations, setNumberOfIterations] = useState(3)
    // State for steps in the Distance Vector algorithm
    const [currentStep, setCurrentStep] = useState(0)
    // State which stores the result of the Distance Vector algorithm
    const [distanceVectorResult, setDistanceVectorResult] = useState({})

    // Function to check if the graph is in edit mode
    const graphEditingMode = () => {
        return Object.keys(distanceVectorResult).length === 0
    }

    // Updates the position of a node in the graph
    const updateNodePosition = (nodeId, x, y) => {
        setNodes((prevNodes) => prevNodes.map((node) => (node.id === nodeId ? { ...node, x, y } : node)))
    }

    // Updates the weight of an edge in the graph
    const updateEdgeWeight = (edgeId, weight) => {
        setEdges((prevEdges) => prevEdges.map((edge) => (edge.id === edgeId ? { ...edge, weight } : edge)))
    }

    // Handles the selection of an edge
    const handleSelectEdge = (edgeId) => {
        if (graphEditingMode()) {
            const isSelected = selectedEdgeIds.includes(edgeId)
            if (isSelected) {
                setSelectedEdgeIds((prevSelectedEdgeIds) => prevSelectedEdgeIds.filter((id) => id !== edgeId))
            } else {
                setSelectedEdgeIds((prevSelectedEdgeIds) => [edgeId])
            }
        }
    }

    // Deselect Edge for Distance Vector Algorithm Instructions
    const deselectEdge = (edgeId) => {
        const edge = edges.find((c) => c.id === edgeId || c.id === edgeId.split('').reverse().join(''))

        if (edge) {
            const index = selectedEdgeIds.indexOf(edge.id)
            if (index !== -1) {
                selectedEdgeIds.splice(index, 1)
            }
            setSelectedEdgeIds([...selectedEdgeIds])
        }
    }

    // Handles the selection of a node in the graph
    const handleNodeClick = (nodeId, selected) => {
        if (graphEditingMode()) {
            if (selected) {
                setSelectedNodes((prevSelectedNodes) => [...prevSelectedNodes, nodeId])
            } else {
                setSelectedNodes((prevSelectedNodes) => prevSelectedNodes.filter((id) => id !== nodeId))
            }
        }
    }

    // Adds a new node to the graph
    const addNode = () => {
        const newNodeId = String.fromCharCode(Math.max(...nodes.map((node) => node.id.charCodeAt(0))) + 1)
        const newNode = {
            id: newNodeId,
            x: Math.floor(Math.random() * 750),
            y: Math.floor(Math.random() * 350),
        }
        setNodes((prevNodes) => [...prevNodes, newNode])
        setNumberOfIterations(nodes.length + 1)
    }

    // Connects two selected nodes in the graph
    const connectNodes = () => {
        if (selectedNodes.length === 2) {
            const newEdgeId = selectedNodes.join('')
            if (!edges.some((edge) => edge.id === newEdgeId || edge.id === newEdgeId.split('').reverse().join(''))) {
                const newEdge = {
                    endNodeId: selectedNodes[1],
                    id: newEdgeId,
                    startNodeId: selectedNodes[0],
                    weight: 1,
                }
                setEdges((prevEdges) => [...prevEdges, newEdge])
                setSelectedNodes([])
            }
        } else {
            dismissToast(1)
            errorToast('Please select two nodes')
        }
    }

    // Removes a selected node from the graph
    const removeNode = (nodeId) => {
        // Remove node from nodes list
        setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId))

        // Remove edges involving the node
        setEdges((prevEdges) => prevEdges.filter((edge) => edge.startNodeId !== nodeId && edge.endNodeId !== nodeId))

        // Remove node from the selected nodes list
        setSelectedNodes((prevSelectedNodes) => prevSelectedNodes.filter((id) => id !== nodeId))
    }

    // Removes a selected edge from the graph when the current step changes
    useEffect(() => {
        if (!graphEditingMode() && edges.length > 0) {
            edges.map((edge) => {
                if (edge.id) {
                    deselectEdge(edge.id)
                }
            })
        }
    }, [currentStep])

    // Removes all selected edges from the graph
    const removeAllSelectedEdges = () => {
        if (edges.length > 0) {
            edges.map((edge) => {
                if (edge.id) {
                    deselectEdge(edge.id)
                }
            })
        }
    }

    // Removes all selected edges from the graph when the current step changes
    useEffect(() => {
        if (!graphEditingMode()) {
            removeAllSelectedEdges()
        }
    }, [currentStep])

    // Removes a selected edge from the graph
    const deleteEdge = () => {
        if (selectedEdgeIds.length > 0) {
            const edgeId = selectedEdgeIds[0]
            // Remove edge from the edges list
            setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== edgeId))

            // Deselect the edge
            deselectEdge(edgeId)
        } else {
            dismissToast(1)
            errorToast('Please select an edge to delete.')
        }
    }

    return (
        <div className={'is-flex is-flex-direction-column columns mb-6 pb-6 '}>
            <div className="container column is-12">
                <div className="box">
                    <div className="DroppableArea">
                        <svg height="100%" width="100%">
                            {edges.map((edge) => {
                                const startNode = nodes.find((node) => node.id === edge.startNodeId)
                                const endNode = nodes.find((node) => node.id === edge.endNodeId)

                                return (
                                    <Edge
                                        endNode={endNode}
                                        key={edge.id}
                                        onSelect={(e) => {
                                            e.stopPropagation()
                                            if (selectedEdgeIds.includes(edge.id)) {
                                                deselectEdge(edge.id)
                                            } else {
                                                handleSelectEdge(edge.id)
                                                setSelectedWeight(edge.weight)
                                            }
                                        }}
                                        selected={selectedEdgeIds.includes(edge.id)}
                                        startNode={startNode}
                                        weight={edge.weight}
                                    />
                                )
                            })}
                        </svg>
                        {nodes.map((node) => (
                            <DraggableNode
                                disableDragging={!graphEditingMode()}
                                key={node.id}
                                nodeId={node.id}
                                onClick={(selected) => {
                                    handleNodeClick(node.id, selected)
                                }}
                                onDrag={(x, y) => {
                                    updateNodePosition(node.id, x, y)
                                }}
                                onRemove={() => removeNode(node.id)}
                                selected={selectedNodes.includes(node.id)}
                                x={node.x}
                                y={node.y}
                            />
                        ))}
                    </div>
                </div>
                {graphEditingMode() && (
                    <section>
                        <label className={'label'}>Graph Actions:</label>
                        <section className={'is-flex is-justify-content-space-between'}>
                            <div className={'buttons is-grouped'}>
                                <button className={'button'} onClick={addNode}>
                                    Add Node
                                </button>
                                <button className={'button'} onClick={connectNodes}>
                                    Connect Nodes
                                </button>
                                <button
                                    className={'button'}
                                    onClick={() => {
                                        if (selectedNodes.length > 0) {
                                            selectedNodes.forEach((nodeId) => removeNode(nodeId))
                                            setSelectedNodes([])
                                        } else {
                                            dismissToast(1)
                                            errorToast('Please select a node to remove')
                                        }
                                    }}
                                >
                                    Delete Node(s)
                                </button>
                                <button className={'button'} onClick={() => deleteEdge()}>
                                    Delete Edge
                                </button>
                            </div>
                        </section>
                        {selectedEdgeIds.length === 1 && (
                            <div className={'column is-6 mt-2 pl-0 pb-0'}>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        if (selectedWeight !== null) {
                                            updateEdgeWeight(selectedEdgeIds[0], selectedWeight)
                                        }
                                        setSelectedEdgeIds([]) // Unselect the edge
                                    }}
                                >
                                    <label className={'label'}>
                                        Edge <span style={{ color: '#f71a1a' }}>{selectedEdgeIds[0]}</span>:{' '}
                                        <input
                                            className={'input'}
                                            onChange={(e) => setSelectedWeight(parseInt(e.target.value))}
                                            type="number"
                                            value={selectedWeight}
                                            autoFocus={true}
                                        />
                                    </label>
                                    <button className={'button is-dark'} type="submit">
                                        Update Weight
                                    </button>
                                </form>
                            </div>
                        )}
                        <section className={'mt-5'}>
                            <label className={'label'}>Algorithm Actions:</label>
                            <div className={'is-flex is-justify-content-space-between is-align-items-center'}>
                                <span>
                                    <p>Number of Iterations</p>
                                    <div className="select">
                                        <div className="select">
                                            <select
                                                id="starting-node"
                                                onChange={(e) => setNumberOfIterations(e.target.value)}
                                                required={true}
                                                value={numberOfIterations}
                                            >
                                                <option disabled value="">
                                                    Select number of iterations
                                                </option>
                                                {nodes.map((node, index) => (
                                                    <option key={node.id} value={index + 1}>
                                                        {index + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </span>
                                <button
                                    className={'button is-info'}
                                    onClick={() => {
                                        if (nodes.length < 2) {
                                            errorToast('Please add at least two nodes')
                                            return
                                        }

                                        infoToast('Calculating...')

                                        const result = distanceVectorAlgorithm({ edges, nodes }, numberOfIterations) // Calculate the result
                                        const steps = result.steps

                                        setSelectedNodes([]) // Unselect all nodes
                                        setDistanceVectorResult(steps) // Set the result of the algorithm

                                        dismissToast(2) // Remove the toast with the Assigned ID of 2 which is that of the infoToast

                                        successToast('Calculation complete!')

                                        window.scrollTo({ behavior: 'smooth', top: 0 })
                                    }}
                                >
                                    Calculate
                                </button>
                            </div>
                        </section>
                    </section>
                )}
                {!graphEditingMode() && (
                    <div className={'RA-Container'}>
                        <h2 className={'title pt-2'}>Algorithm Steps</h2>
                        <h3 className={'subtitle is-size-4 mt-3 mb-5'}>
                            Step {currentStep + 1} of {distanceVectorResult.length}
                        </h3>
                        <p className={'is-size-5 content is-inline-'}>
                            {<SanitizeText text={distanceVectorResult[currentStep].text} />}
                        </p>
                        <section>
                            <table className={'table mb-3'}>
                                <thead>
                                    <tr>
                                        <th></th> {/* Empty cell for the first column header */}
                                        {nodes.map((node) => {
                                            return <th key={node.id}>{node.id}</th>
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {distanceVectorResult[currentStep].distanceVectors.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            <td>{nodes[rowIndex].id}</td>{' '}
                                            {/* Add the first cell with the column header */}
                                            {row.map((cellData, cellIndex) => (
                                                <td key={cellIndex}>{cellData ?? Infinity}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                        <div className={'buttons is-grouped is-flex is-justify-content-space-between mt-5'}>
                            <button
                                className="button left-arrow"
                                disabled={currentStep === 0}
                                onClick={() => {
                                    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0))
                                }}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            <button
                                className="button right-arrow"
                                disabled={currentStep === distanceVectorResult.length - 1}
                                onClick={() => {
                                    setCurrentStep((prevStep) =>
                                        Math.min(prevStep + 1, distanceVectorResult.length - 1),
                                    )
                                }}
                            >
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>
                        <div className={'buttons is-grouped'}>
                            <button
                                className="button is-warning mt-5"
                                onClick={() => {
                                    removeAllSelectedEdges()
                                    setDistanceVectorResult({})
                                    setCurrentStep(0)
                                    setSelectedEdgeIds([])
                                    setSelectedNodes([])
                                }}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} />
                                <p className={'ml-3'}>Edit</p>
                            </button>
                            <button
                                className="button is-info mt-5"
                                onClick={() => {
                                    infoToast('Resetting Graph...')
                                    setDistanceVectorResult({})
                                    setCurrentStep(0)
                                    setSelectedEdgeIds([])
                                    setSelectedNodes([])
                                    setEdges(defaultEdgeData)
                                    setNodes(defaultNodeData)
                                }}
                            >
                                <FontAwesomeIcon icon={faRefresh} />
                                <p className={'ml-3'}>Reset</p>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DistanceVectorAlgorithmCanvas
