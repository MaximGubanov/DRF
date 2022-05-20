import React from 'react'
import './style.css'


const MenuList = () => {
    return (
        <div class="header-2">
            <div class="container">
                <div class="header-2__bar header-block header-2__bar_padding">
                    <div class="header-2__block header__block flex-row">
                        <ul class="header-2__links header-links flex-row">
                            <li class="header-2__link link-hover header-2__link_active"><a href="#">Main</a></li>
                            <li class="header-2__link link-hover"><a href="#">Users</a></li>
                            <li class="header-2__link link-hover"><a href="#">Authors</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuList