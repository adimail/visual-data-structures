import { useEffect } from 'react'
import DijkstrasAlgorithmCanvas from '../components/dijkstras-algorithm-canvas'
import { DIJKSTRAS_ALGORITHM_PAGE } from '../constants/pages'
import { setWindowTitle } from '../utilities/website'

// Function to render the Dijkstra's Algorithm page
function DijkstrasAlgorithm() {
    useEffect(() => {
        setWindowTitle(DIJKSTRAS_ALGORITHM_PAGE)
    })

    return (
        <>
            <h1 className={'title has-text-centered mt-6'}>{DIJKSTRAS_ALGORITHM_PAGE}</h1>
            <section className={'is-flex is-justify-content-center container'}>
                <DijkstrasAlgorithmCanvas />
            </section>
        </>
    )
}

export default DijkstrasAlgorithm
