import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'

function Default() {
    return (
        <>
            <div className={'is-flex is-flex-direction-column'}>
                <div>
                    <Navbar />
                </div>
                <div className={'is-fullwidth px-8 pt-8 pb-20'}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Default
