import { Grid } from "./Grid"

export const Main = () => {
    return(
        <div className="pt-10 px-6 pb-8 md:px-20 lg:px-32">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white">My Characters</h1>
            </div>
            <Grid />
        </div>
    )
}