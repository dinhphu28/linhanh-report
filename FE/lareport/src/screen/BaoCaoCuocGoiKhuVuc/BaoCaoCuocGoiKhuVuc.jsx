import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import baoCaoCuocGoiKhuVucApi from '../../apis/baoCaoCuocGoiKhuVucApi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Button, ButtonGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

// BaoCaoCuocGoiKhuVuc.propTypes = {
    
// };
ChartJS.register(ArcElement, Tooltip, Legend);

function BaoCaoCuocGoiKhuVuc(props) {

    const lsGroupAssigned = JSON.parse(localStorage.getItem("assignedGroups"));

    const [dateFrom, setDateFrom] = useState("2022-12-01");
    const [dateTo, setDateTo] = useState("2022-12-10");
    const [direction, setDirection] = useState("In");
    const [listGroup, setListGroup] = useState([]);

    const [listBaoCaoCGKhuVuc, setlistBaoCaoCGKhuVuc] = useState([]);

    const [listLabel, setListLabel] = useState([]);
    const [listPercentValues, setListPercentValues] = useState([]);
    const [listColor, setListColor] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [filterDateFrom, setFilteDateFrom] = useState("2022-12-01");
    const [filterDateTo, setFilteDateTo] = useState("2022-12-02");
    const [filterDirection, setFilteDirection] = useState(direction);
    const [filterGroup, setFilterGroup] = useState([]);

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    }

    const generateRandomColor = () => {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);

        // console.log("Random color: ", "#" + randomColor);
        return "#" + randomColor;
    }

    useEffect(() => {
        const fetchBaoCaoCuocGoiKhuVuc = async () => {
            try {
                const params = {
                    from: dateFrom,
                    to: dateTo,
                    direction: direction,
                    group: listGroup.length > 0 ? listGroup.reduce((result, item) => {
                        return (result + " " + item);
                    }) : null
                };
    
                const response = await baoCaoCuocGoiKhuVucApi.getAllWithFilters(params);

                if(response) {
                    setListLabel(Array.from(response, x => x.name_group_));
                    setListPercentValues(Array.from(response, x => x.tytrong_));
                    setListColor(Array.from(response, x => generateRandomColor()));
                }
    
                console.log("Fetch list bao cao cgoi khu vuc successfully: ", response);

                setlistBaoCaoCGKhuVuc(response);
            } catch (error) {
                console.log("Failed to fetch list bao cao cgoi khu vuc: ", error);
            }
        }

        // fetchBaoCaoCuocGoiKhuVuc();
        if(listGroup.length > 0) {
            fetchBaoCaoCuocGoiKhuVuc();
        }
    }, [dateFrom, dateTo, direction, listGroup]);

    const changeInputFrom = (e) => {
        setFilteDateFrom(e.target.value);
    }
    const changeInputTo = (e) => {
        setFilteDateTo(e.target.value);
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

    const data = {
        labels: listLabel,
        datasets: [
            {
                label: '# of Votes',
                data: listPercentValues,
                backgroundColor: listColor
            },
        ],
    };

    const listJsxGroupsItems = lsGroupAssigned.map((item) =>
        <>
        <Button
            key={item.id}
            color="primary"
            outline
            onClick={() => onGroupCheckboxBtnClick(item.id)}
            active={filterGroup.includes(item.id)}
        >
            {item.name}
        </Button>
        <br />
        </>
    );

    return (
        // <div style={{marginTop: "3rem", marginLeft: "0%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
        <div style={{marginTop: "3rem", marginLeft: "33vw"}}>
            <Button
                outline
                color='primary'
                onClick={toggleModal}
            >
                Show filter
            </Button>
            <Modal
                isOpen={modalIsOpen}
                toggle={toggleModal}
            >
                <ModalHeader toggle={toggleModal} >Filters</ModalHeader>
                <ModalBody>
                    <Label>
                        From:
                    </Label>
                    <Input
                        type="text"
                        name="category-name"
                        onChange={e => {changeInputFrom(e)}}
                        defaultValue={dateFrom}
                    />
                    <Label>
                        To:
                    </Label>
                    <Input
                        type="text"
                        name="category-name"
                        onChange={e => {changeInputTo(e)}}
                        defaultValue={dateTo}
                    />
                    <br />
                    <Label style={{marginRight: "0.5rem"}}>
                        Direction:
                    </Label>
                    <ButtonGroup>
                        <Button
                            color="primary"
                            outline
                            onClick={() => setFilteDirection("In")}
                            active={filterDirection === "In"}
                        >
                            Inbound
                        </Button>
                        <Button
                            color="primary"
                            outline
                            onClick={() => setFilteDirection("Out")}
                            active={filterDirection === "Out"}
                        >
                            Outbound
                        </Button>
                    </ButtonGroup>
                    <br />
                    <Label style={{marginRight: "0.5rem"}}>
                        Group:
                    </Label>
                    <br />
                    {/* <ButtonGroup> */}
                        {/* <br />
                        <Button
                            color="primary"
                            outline
                            onClick={() => onGroupCheckboxBtnClick("281")}
                            active={filterGroup.includes("281")}
                        >
                            281
                        </Button>
                        <br />
                        <Button
                            color="primary"
                            outline
                            onClick={() => onGroupCheckboxBtnClick("282")}
                            active={filterGroup.includes("282")}
                        >
                            282
                        </Button>
                        <br />
                        <Button
                            color="primary"
                            outline
                            onClick={() => onGroupCheckboxBtnClick("284")}
                            active={filterGroup.includes("284")}
                        >
                            284
                        </Button> */}
                        {listJsxGroupsItems}
                    {/* </ButtonGroup> */}
                    <br />
                </ModalBody>
                <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        setDateFrom(filterDateFrom);
                        setDateTo(filterDateTo);
                        setDirection(filterDirection);
                        setListGroup(filterGroup);

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

            <h4>BIỂU ĐỒ TỶ LỆ CUỘC GỌI GIỮA CÁC GROUP</h4>
            <div style={{ maxWidth: "500px" }}>
                <Pie data={data} />
            </div>
        </div>
    );
}

export default BaoCaoCuocGoiKhuVuc;