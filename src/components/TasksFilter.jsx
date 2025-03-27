export default function TasksFilter({children, selected, onClick}) {
    let classes = ''
    if(selected) classes += ' selected';
    return (
        <li>
        <button className={classes} onClick={onClick}>{children}</button>
      </li>
    )

}