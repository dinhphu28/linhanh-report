import React from 'react';
import { Button, Collapse, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarText, NavbarToggler } from 'reactstrap';
import "./Header.css";
import { BASE_ROOT_PATH_OF_TOMCAT } from '../constants/global';
// import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Logo from "./../assets/logotrenbaocao.png"

// Header.propTypes = {

// };

function Header(props) {
    
    let navigate = useNavigate();

    return (
        <div className="my-navbar">
            <Navbar
                color="light"
                expand="md"
                // fixed="top"
                light
            >
                <NavbarBrand id="my-brand-logo" href={BASE_ROOT_PATH_OF_TOMCAT + "/"}>
                    {/* Reports */}
                    <img src={Logo} alt="Logo" />
                </NavbarBrand>
                <NavbarToggler className="me-2" onClick={function noRefCheck() { }} />
                {localStorage.getItem("username") !== null ?
                    <Collapse navbar isOpen={true}>
                        <Nav
                            className="me-auto"
                            navbar
                        >
                            <NavItem>
                                <NavLink
                                    href={BASE_ROOT_PATH_OF_TOMCAT + "/bao-cao-cuoc-goi"}
                                >
                                    Báo cáo cuộc gọi
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href={BASE_ROOT_PATH_OF_TOMCAT + "/bao-cao-cuoc-goi-khu-vuc"}
                                >
                                    Tỷ lệ cuộc gọi giữa các group
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href={BASE_ROOT_PATH_OF_TOMCAT + "/top-10-agents-so-calls-nhieu-nhat"}
                                >
                                    Top 10 agents có số cuộc gọi nhiều nhất
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href={BASE_ROOT_PATH_OF_TOMCAT + "/top-10-agents-time-calls-nhieu-nhat"}
                                >
                                    Top 10 agents có thời gian gọi nhiều nhất
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href={BASE_ROOT_PATH_OF_TOMCAT + "/tong-call-khu-vuc"}
                                >
                                    Tổng cuộc gọi theo khu vực
                                </NavLink>
                            </NavItem>
                        </Nav>

                        <NavbarText>
                            {localStorage.getItem("role") === "admin" ? 
                                <Button
                                    outline
                                    color='success'
                                    onClick={() => {
                                        navigate(BASE_ROOT_PATH_OF_TOMCAT + "/admin")
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCog} />
                                </Button>
                            : ""}
                        </NavbarText>
                        <NavbarText style={{marginLeft: "1rem"}}>

                            {localStorage.getItem("username") === null ?
                                <NavLink
                                    style={{color: "#0d6efd"}} href="/sign-in"
                                >
                                    Sign In 
                                </NavLink> :
                                <NavLink
                                    style={{color: "#0d6efd"}}
                                    onClick={() => {
                                        localStorage.removeItem("username");
                                        localStorage.removeItem("jwtToken");
                                        localStorage.removeItem("assignedGroups");
                                        localStorage.removeItem("role");

                                        navigate(BASE_ROOT_PATH_OF_TOMCAT + "/sign-in");
                                    }}
                                >
                                    Sign Out 
                                </NavLink>
                            }
                        </NavbarText>
                    </Collapse> : ""}
            </Navbar>
        </div>
    );
}

export default Header;