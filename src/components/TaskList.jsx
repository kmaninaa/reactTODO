import Task from "./Task"
import { ways } from "../data"
export default function TaskList() {
    return( 
        <ul class='todo-list'>
            <Task {... ways[0]}/>
            <Task {... ways[1]}/>
            <Task {... ways[2]}/>
        </ul>
    )
}