import { useEffect } from 'react'
import { HOME_PAGE } from '../constants/pages'
import { setWindowTitle } from '../utilities/website'

// Function to render the Home page
function Home() {
    useEffect(() => {
        setWindowTitle(HOME_PAGE)
    })

    return (
        <>
            <h1 className={'title has-text-centered my-6'}>{`Welcome to Routing Algorithm's Visualizer!`}</h1>
            <section className="columns mb-6">
                <div className="container column is-12">
                    <div className="is-flex is-flex-direction-column is-size-5">
                        <h2 className={'title'} style={{ fontSize: '30px' }}>
                            Summary
                        </h2>
                        <h3 className={'is-size-4 mb-3 has-text-weight-semibold'}>Collaborators</h3>
                        <p>
                            <ul>
                                <li>Michael Pereira</li>
                                <li>Udbhav Prasad</li>
                                <li>Himal Patel</li>
                            </ul>
                        </p>
                        <h3 className={'has-text-weight-semibold is-size-4 mt-5 mb-3'}>Installation Instructions:</h3>
                        <h4 className={'has-text-weight-semibold mt-2 mb-3'}>
                            Local Development <span className={'is-italic'}>(Recommended)</span>
                        </h4>
                        <p>
                            Required: Node.js Version 18+
                            <br />
                            Steps on how to run the project locally are located within the <b>README.md</b> file in the root
                            of the project.
                        </p>
                        <h4 className={'has-text-weight-semibold mt-5 mb-3'}>Cloud Deployment</h4>
                        <p>
                            Site is located at{' '}
                            <a href="https://routing-algorithms-visualizer.netlify.app/" rel={'noreferrer'} target={'_blank'}>
                                routing-algorithms-visualizer.netlify.app
                            </a>
                        </p>
                        <h3 className={'has-text-weight-semibold is-size-4 mt-5  mb-3'}>
                            {`How to use Routing Algorithm's Visualizer`}
                        </h3>
                        <h4 className={'has-text-weight-semibold mt-2 mb-3'}>Graph Building User Interface</h4>
                        <p className={'mb-5'}>
                            {`To add nodes to the graph, use the button "Add Node" to the graph. You can drag around this node to make it look
                            better to your liking.`}

                            <br />
                            <br />

                            {`To connect two nodes together,  click on the two nodes you would like to connect and then click on "Connect Nodes". After 
                            this, once again click on "Connect Nodes" and it will create and draw this edge with a weight of '1'.`}

                            <br />
                            <br />

                            {`To change the weight of an edge, click on the edge and a text-box will pop up below the graph. Then change the value
                            in the text-box and click the "Update Weight" button.`}

                            <br />
                            <br />

                            {`To delete a node, click on the node you wish to delete and click the "Delete Node" button.`}

                            <br />
                            <br />

                            {`To choose a starting node or the number of iterations, choose from either of their dropdown lists (depending on the algorithm).`}

                            <br />
                            <br />

                            {`To calculate a graph, click on the "Calculate" button. This will use the selected algorithm and will display step-by-step instructions on how the algorithm works.`}

                            <br />
                            <br />

                            {`To navigate between steps, click on the either the left or right arrows found on the sides of the web page which appear after calculating the graph.`}

                            <br />
                            <br />

                            {`To edit an existing graph that has been calculated, click on the "Edit" button.`}

                            <br />
                            <br />

                            {`To clear the graph, click on the "Rest" button.`}
                        </p>
                        <h3 className={'has-text-weight-semibold is-size-4 mt-5  mb-3'}>
                            {`Dijkstra's Link-State Routing Algorithm`}
                        </h3>
                        <p>
                            {`Dijkstra's algorithm is a centralized routing algorithm that computes the least-cost path between a source node and a 
                            destination node of a graph. This algorithm computes this value with the complete knowledge about the network 
                            topology including link costs between all nodes. Furthermore, it takes an iterative approach to solving this 
                            problem.`}
                        </p>
                        <h4 className={'has-text-weight-semibold mt-5 mb-3'}>Algorithm Information</h4>
                        <p className={'ml-5'}>
                            <ol>
                                <li>{`Our implementation of this algorithm takes input of the graph in the form of an adjacency list representation.`}</li>
                                <li>
                                    The graph auto-generates text based on the graph and procedure to describe what the
                                    algorithm is doing, how it is doing it and why.
                                </li>
                                <li>{`Dijkstra's algorithm maintains a table which maintains information about the algorithm's work on the graph.`}</li>
                            </ol>
                        </p>
                        <h4 className={'has-text-weight-semibold mt-2 mb-3'}>Algorithm Understanding</h4>
                        <p className={'ml-5'}>
                            <ol>
                                <li>{`We initialize the table which stores whether we have visited a node already or not, the shortest distance to the 
                                nodes and the root/previous node that a node is connected to (dijkstra's algorithm forms a tree at the end).`}</li>
                                <li>
                                    {`After this, we loop over all the nodes in the graph till we have visited all the nodes. We choose which node to 
                                visit next by taking the shortest/closet node that we have not visited yet.`}
                                </li>
                                <li>{`We take the node we are currently evaluating and loop over all its neighbours to check whether the distances
                                to them are shorter than through the current node or through the values we already have in the table.`}</li>
                                <li>{`From this we construct the minimum spanning tree so that we can find the shortest distance to all the other 
                                nodes in the graph (using the previous node that each node is connected to). We trace this tree back until we reach 
                                the starting node to find the shortest path between the starting node and destination node.`}</li>
                            </ol>
                        </p>
                        <h3 className={'has-text-weight-semibold is-size-4 mt-5  mb-3'}>
                            {`Distance Vector Routing Algorithm`}
                        </h3>
                        <p>
                            {`The Distance Vector routing algorithm is a decentralized routing algorithm that computes the least-cost path between a 
                            source node and a destination node of a graph. This is a distributed algorithm that where the routers maintain their 
                            own tables of the shortest distances. These routers communicate with each other from time to time and exchange these 
                            tables and find better paths to reach other nodes.`}
                        </p>
                        <h4 className={'has-text-weight-semibold mt-5 mb-3'}>Algorithm Information</h4>
                        <p className={'ml-5'}>
                            <ol>
                                <li>
                                    Our implementation of this algorithm takes input of the graph in the form of an
                                    adjacency list representation.
                                </li>
                                <li>
                                    The graph auto-generates text based on the graph and procedure to describe what the
                                    algorithm is doing, how it is doing it and why.
                                </li>
                                <li>Each router maintains a table of the least cost paths to other nodes.</li>
                                <li>This algorithm is derived using the Bellman-Ford equation.</li>
                                <li>
                                    The number of iterations the algorithm performs to gain full knowledge of the
                                    network is equal to the number of nodes the graph has (worst case).
                                </li>
                            </ol>
                        </p>
                        <h4 className={'has-text-weight-semibold mt-2 mb-3'}>Algorithm Understanding</h4>
                        <p className={'ml-5'}>
                            <ol>
                                <li>
                                    {`We initialize the tables for each router. We then iterate through the node/router's neighbours and calculate the
                                    distance to its neighbours.`}
                                </li>
                                <li>
                                    {`We then allow each node to communicate with its neighbours about each other's least-cost paths. We perform this for
                                    as many steps as the user asks for(with maximum of number of nodes).`}
                                </li>
                                <li>{`With each communication iteration, we check with the Bellman Ford equation whether the cost of the path is
                                    less than.`}</li>
                            </ol>
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
