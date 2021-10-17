import Link from "next/link";
import classes from "./MainNavigation.module.css";
function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>All Meetups</a>
            </Link>
          </li>
          <li>
            <Link href="/new-meetup">
              <a>Add New Meetup</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
