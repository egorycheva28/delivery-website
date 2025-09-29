import {Outlet} from "react-router-dom";

const Root = () => (
    <>
        <main>
            <Outlet/>
            <p>HELLO</p>
        </main>
    </>
)

export default Root