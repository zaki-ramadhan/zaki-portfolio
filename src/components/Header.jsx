// eslint-disable-next-line no-unused-vars
import React from "react";

const Header = () => {
	return (
		<header className="container mx-auto p-4 flex justify-between">
			<div className="dev-name">
                <h1>Zaki Ramadhan</h1>
            </div>
			<nav>
                <ul className="flex">
                    <li><a href="">Present</a></li>
                    <li><a href="">Skills</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
            </nav>
		</header>
	);
};

export default Header;
