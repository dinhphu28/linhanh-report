import React, { useEffect, useState } from 'react';
import { Alert, Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
// import PropTypes from 'prop-types';
import userApi from '../../../apis/userApi';
import authApi from '../../../apis/authApi';
import groupApi from '../../../apis/groupApi';
import userGroupApi from '../../../apis/userGroupApi';

// ScreenUserList.propTypes = {

// };

function ScreenUserList(props) {

    const [listUsers, setListUsers] = useState([]);
    const [listGroups, setListGroups] = useState([]);

    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertFailure, setShowAlertFailure] = useState(false);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalChangePasswordIsOpen, setModalChangePasswordIsOpen] = useState(false);
    const [modalAssignGroupIsOpen, setModalAssignGroupIsOpen] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [filterGroup, setFilterGroup] = useState([]);
    const [listGroupsOfUserSelected, setListGroupsOfUserSelected] = useState([]);

    useEffect(() => {
        const fetchListUser = async () => {
            try {
                const response = await userApi.getAll();

                console.log("Fetch get list user successfully: ", response);

                setListUsers(response);
            } catch (error) {
                console.log("Failed to fetch list user: ", error);
            }
        }

        const fetchListGroup = async () => {
            try {
                const response = await groupApi.getAll();
    
                console.log("Fetch list group successfully: ", response);

                setListGroups(response);
            } catch (error) {
                console.log("Failed to fetch list group: ", error);
            }
        }

        fetchListUser();
        fetchListGroup();
    }, []);

    const changeUsernameInputValue = (e) => {
        setUsername(e.target.value);
    }
    const changePasswordInputValue = (e) => {
        setPassword(e.target.value);
    }

    const changeNewPasswordInputValue = (e) => {
        setNewPassword(e.target.value);
    }

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    }

    const toggleChangePasswordModal = () => {
        setModalChangePasswordIsOpen(!modalChangePasswordIsOpen);
    }

    const toggleAssignGroupModal = () => {
        if(!modalAssignGroupIsOpen) {
            setFilterGroup([]);
        }

        setModalAssignGroupIsOpen(!modalAssignGroupIsOpen);
    }

    const onGroupCheckboxBtnClick = (selected) => {
        const index = filterGroup.indexOf(selected);
        if (index < 0) {
            filterGroup.push(selected);
        } else {
            filterGroup.splice(index, 1);
        }

        setFilterGroup([...filterGroup]);
    };

    const fetchListGroupsOfUser = async (username) => {
        try {
            const response = await userGroupApi.getByUsername(username);

            console.log("Fetch list groups of user successfully: ", response);

            setListGroupsOfUserSelected(response);

            if(response) {
                if(response.length > 0) {
                    // const tmpArrayGroupsOfUser = listGroups.filter((elem) => {
                    //     return response.some((ele) => {
                    //         return ele.groupId === elem.id;
                    //     })
                    // });

                    // console.log("GR ZZZ: ", tmpArrayGroupsOfUser);
                    // // setFilterGroup(tmpArrayGroupsOfUser);

                    const tmpArrayGroupIdsOfUser = response.map(item =>
                        item.groupId
                    )
                    setFilterGroup(tmpArrayGroupIdsOfUser);
                }
            }
        } catch (error) {
            console.log("Failed to fetch list groups of user: ", error);
        }
    }

    const fetchDeleteUser = async (username) => {
        try {
            const response = await userApi.delete(username);

            console.log("Delete user successfully: ", response);
        } catch (error) {
            console.log("Failed to delete user: ", error);
        }
    }

    const listJsxUserItems = listUsers.map(item =>
        <tr key={item.username}>
            <th scope="row">
                {item.username}
            </th>
            <td>
                <Button
                    color='link'
                    onClick={() => {
                        setSelectedUser(item.username);

                        toggleChangePasswordModal();
                    }}
                >
                    Change password
                </Button>
            </td>
            <td>
                <Button
                    color='link'
                    onClick={() => {
                        setSelectedUser(item.username);
                        fetchListGroupsOfUser({username: item.username});

                        toggleAssignGroupModal();
                    }}
                >
                    Assign group
                </Button>
            </td>
            <td>
                <Button
                    color='link'
                    className='link-danger'
                    onClick={() => {
                        fetchDeleteUser(item.username);

                        setListUsers(listUsers.filter(usr => usr.username !== item.username));
                    }}
                >
                    Delete
                </Button>
            </td>
        </tr>
    );

    const fetchChangePasswordUser = async (sel_username, newPassword) => {
        try {
            const data = {
                password: newPassword
            }

            const response = await userApi.putChangePassword(sel_username, data);

            console.log("Fetch change password successfully: ", response);

        } catch (error) {
            console.log("Failed to fetch change password: ", error);
        }
    }

    const fetchCreateModUser = async () => {
        try {
            const data = {
                username: username,
                password: password
            }

            const response = await authApi.post(data);

            setShowAlertSuccess(true);
            setTimeout(() => {
                setShowAlertSuccess(false);
            }, 3000);

            console.log("Fetch create mod user successfully: ", response);
        } catch (error) {
            console.log("Fetch create mod user failed: ", error);

            setShowAlertFailure(true);
            setTimeout(() => {
                setShowAlertFailure(false);
            }, 3000);
        }
    }

    const listJsxGroupsItems = listGroups.map((item) =>
        <>
        <Button
            key={item.id}
            color="primary"
            outline
            onClick={() => onGroupCheckboxBtnClick(item.id)}
            active={filterGroup.includes(item.id)}
        >
            {item.groupName}
        </Button>
        <br />
        </>
    );

    const fetchUpdateGroupAssignToUser = async () => {
        try {
            const data = {
                username: selectedUser,
                groupIds: filterGroup
            }

            // console.log("Group selected to assign: ", data);

            const response = await userGroupApi.put(data);

            console.log("Fetch assign group to user successfully: ", response);
        } catch (error) {
            console.log("Failed to fetch assign group to user: ", error);
        }
    }

    const fetchSyncGroupWith3CX = async () => {
        try {
            const response = await groupApi.sync();

            console.log("Sync group 3CX successfully");
        } catch (error) {
            console.log("Failed to sync group 3CX: ", error);
        }
    }

    // const fetchListGroupsOfUser = async (username) => {
    //     try {
    //         const response = await userGroupApi.getByUsername(username);

    //         console.log("Fetch list groups of user successfully: ", response);

    //         setListGroupsOfUserSelected(response);
    //     } catch (error) {
    //         console.log("Failed to fetch list groups of user: ", error);
    //     }
    // }

    return (
        <div style={{marginLeft: "1rem", marginRight: "1rem"}}>
            <h4 style={{marginTop: "1rem", marginBottom: "1rem", textAlign: "center"}}>User management</h4>
            <hr />

            <Button
                style={{marginRight: "1rem", marginBottom: "0.5rem"}}
                type='button'
                color='primary'
                onClick={() => {
                    toggleModal();
                }}
            >
                Add
            </Button>
            <Button
                style={{marginRight: "1rem", marginBottom: "0.5rem"}}
                type='button'
                color='primary'
                outline
                onClick={() => {
                    fetchSyncGroupWith3CX();
                }}
            >
                Sync group now
            </Button>

            {showAlertSuccess ?
                <Alert>
                    New category has been create successfully!
                </Alert>
            : ""}

            {showAlertFailure ? <Alert color='danger'>
                Failed to create new category
            </Alert>
            : ""}

            <Table
                striped
            >
                <thead>
                    <tr>
                        <th>
                            username
                        </th>
                        <th>
                            Action
                        </th>
                        <th>

                        </th>
                        <th>
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <th scope="row">
                            abc
                        </th>
                        <td>
                            Change password
                        </td>
                    </tr> */}
                    {listJsxUserItems}
                </tbody>
            </Table>

            <Modal
                isOpen={modalIsOpen}
                toggle={toggleModal}
            >
                <ModalHeader toggle={toggleModal} >Create new category</ModalHeader>
                <ModalBody>
                    <Label>
                        Username:
                    </Label>
                    <Input
                        type="text"d
                        name="username"
                        onChange={e => {changeUsernameInputValue(e)}}
                    />
                    <Label>
                        Password:
                    </Label>
                    <Input
                        type="password"
                        name="password"
                        onChange={e => {changePasswordInputValue(e)}}
                    />
                </ModalBody>
                <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        fetchCreateModUser();

                        toggleModal();
                    }}
                >
                    Submit
                </Button>{' '}
                <Button color="secondary" onClick={toggleModal}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>

            <Modal
                isOpen={modalChangePasswordIsOpen}
                toggle={toggleChangePasswordModal}
            >
                <ModalHeader toggle={toggleChangePasswordModal}>Change password of user: {selectedUser}</ModalHeader>
                <ModalBody>
                    <Label>
                        New Password:
                    </Label>
                    <Input
                        type='password'
                        name="new-password"
                        onChange={e => changeNewPasswordInputValue(e)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            fetchChangePasswordUser(selectedUser, newPassword);

                            toggleChangePasswordModal();
                        }}
                    >
                        Submit
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleChangePasswordModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal
                isOpen={modalAssignGroupIsOpen}
                toggle={toggleAssignGroupModal}
            >
                <ModalHeader toggle={toggleAssignGroupModal}>Change password of user: {selectedUser}</ModalHeader>
                <ModalBody>
                    <Label>
                        Groups:
                    </Label>
                    <br />
                    {listJsxGroupsItems}
                    <br />
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            // fetchChangePasswordUser(selectedUser, newPassword);
                            fetchUpdateGroupAssignToUser();

                            toggleAssignGroupModal();
                        }}
                    >
                        Submit
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleAssignGroupModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ScreenUserList;