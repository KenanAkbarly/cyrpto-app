import MainRoot from "../pages/MainRoot"
import Home from "../pages/Home/Home"
import Detail from "../pages/Detail/Detail"
import Favorite from "../pages/Favorite/Favorite"
export const ROUTES=[
    {
        path:'/',
        element:<MainRoot/>,
        children:[
            {
                path:'',
                element:<Home/>
            },
            {
                path:'favorite',
                element:<Favorite/>
            },
            {
                path:'detail:id',
                element:<Detail/>
            },
        ]
    }
]