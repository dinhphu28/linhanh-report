import React, { useEffect, useState } from 'react';
import baoCaoTop10AgentsMaxNOCallsApi from '../../apis/baoCaoTop10AgentsMaxNOCallsApi';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import { faker } from '@faker-js/faker';
import { Button, ButtonGroup, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
// import PropTypes from 'prop-types';

// BaoCaoTop10AgentsMaxNOCalls.propTypes = {
    
// };

function BaoCaoTop10AgentsMaxNOCalls(props) {

    const lsGroupAssigned = JSON.parse(localStorage.getItem("assignedGroups"));

    const [dateFrom, setDateFrom] = useState("2022-12-01");
    const [dateTo, setDateTo] = useState("2022-12-10");
    const [direction, setDirection] = useState("In");
    const [listGroup, setListGroup] = useState([]);

    const [list10AgentsMaxNoCalls, setList10AgentsMaxNoCalls] = useState([]);

    const [listLabel, setListLabel] = useState([]);
    const [listDataNoCalls, setListDataNoCalls] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [filterDateFrom, setFilteDateFrom] = useState("2022-12-01");
    const [filterDateTo, setFilteDateTo] = useState("2022-12-02");
    const [filterDirection, setFilteDirection] = useState(direction);
    const [filterGroup, setFilterGroup] = useState([]);

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    }

    useEffect(() => {
        const fetchTop10AgentsMaxNoCalls = async () => {
            try {
                const params = {
                    from: dateFrom,
                    to: dateTo,
                    direction: direction,
                    group: listGroup.length > 0 ? listGroup.reduce((result, item) => {
                        return (result + " " + item);
                    }) : null,
                };
    
                const response = await baoCaoTop10AgentsMaxNOCallsApi.getAllWithFilters(params);

                if(response) {
                    setListLabel(Array.from(response, x => x.ext_number_));
                    setListDataNoCalls(Array.from(response, x => x.slg_call_));
                    // setListPercentValues(Array.from(response, x => x.tytrong_));
                    // setListColor(Array.from(response, x => generateRandomColor()));
                }
    
                console.log("Fetch list top 10 agents max no calls successfully: ", response);

                setList10AgentsMaxNoCalls(response);
            } catch (error) {
                console.log("Failed to fetch list top 10 agents max no calls: ", error);
            }
        }

        // fetchTop10AgentsMaxNoCalls();
        if(listGroup.length > 0) {
            fetchTop10AgentsMaxNoCalls();
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

    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Top 10 agent c?? s??? cu???c g???i nhi???u nh???t',
            },
        },
    };

    const labels = listLabel;

    const data = {
        labels,
        datasets: [
            {
                label: 'Agent - Cu???c g???i',
                data: listDataNoCalls,
                borderColor: 'rgb(14, 66, 186)',
                backgroundColor: 'rgba(14, 66, 186, 0.9)',
            },
            // {
            //     label: 'Dataset 2',
            //     data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            //     borderColor: 'rgb(53, 162, 235)',
            //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
            // },
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
        // <div>
        //     <Bar options={options} data={data} />
        // </div>

        <div>
            <div className='d-flex justify-content-end'>
                <Button
                    outline
                    color='primary'
                    onClick={toggleModal}
                >
                    Show filter
                </Button>
            </div>
            <div style={{marginTop: "3rem", marginLeft: "3rem"}}>
                <Modal
                    isOpen={modalIsOpen}
                    toggle={toggleModal}
                >
                    <ModalHeader toggle={toggleModal} >Create new category</ModalHeader>
                    <ModalBody>
                        <Label>
                            From:
                        </Label>
                        <Input
                            type="date"
                            name="category-name"
                            onChange={e => {changeInputFrom(e)}}
                            defaultValue={dateFrom}
                        />
                        <Label>
                            To:
                        </Label>
                        <Input
                            type="date"
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

                <h4>BI???U ????? TOP 10 AGENT C?? S??? CU???C G???I NHI???U NH???T</h4>
                <div style={{ maxWidth: "1500px" }}>
                    <Bar options={options} data={data} />
                </div>
            </div>
        </div>
    );
}

export default BaoCaoTop10AgentsMaxNOCalls;