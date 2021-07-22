import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
function Layout(props) {
    return <div>
        <MainNavigation name={props.name} setName={props.setName}/>
        <main className={classes.main}>
            {props.children}
        </main>
    </div>
}

export default Layout;