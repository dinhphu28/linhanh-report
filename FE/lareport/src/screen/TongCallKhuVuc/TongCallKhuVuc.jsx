import React, { useEffect, useState } from 'react';
import tongCallKhuVucApi from '../../apis/tongCallKhuVucApi';
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
import { faker } from '@faker-js/faker';
import { Button, ButtonGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
// import PropTypes from 'prop-types';

// TongCallKhuVuc.propTypes = {
    
// };

function TongCallKhuVuc(props) {

    const lsGroupAssigned = JSON.parse(localStorage.getItem("assignedGroups"));

    const [dateFrom, setDateFrom] = useState("2022-12-01");
    const [dateTo, setDateTo] = useState("2022-12-10");
    const [direction, setDirection] = useState("In");
    const [listGroup, setListGroup] = useState([]);

    const [listTongCallKV, setListTongCallKV] = useState([]);

    const [listLabel, setListLabel] = useState([]);
    const [listDataNoAnswered, setListDataNoAnswered] = useState([]);
    const [listDataNoUnanswered, setListDataNoUnanswered] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [filterDateFrom, setFilteDateFrom] = useState("2022-12-01");
    const [filterDateTo, setFilteDateTo] = useState("2022-12-02");
    const [filterDirection, setFilteDirection] = useState(direction);
    const [filterGroup, setFilterGroup] = useState([]);

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    }

    useEffect(() => {
        const fetchTongCallKV = async () => {
            try {
                const params = {
                    from: dateFrom,
                    to: dateTo,
                    direction: direction,
                    group: listGroup.length > 0 ? listGroup.reduce((result, item) => {
                        return (result + " " + item);
                    }) : null,
                };
    
                const response = await tongCallKhuVucApi.getAllWithFilters(params);

                if(response) {
                    setListLabel(Array.from(response, x => x.name_group_));
                    setListDataNoAnswered(Array.from(response, x => x.slg_call_ans_));
                    setListDataNoUnanswered(Array.from(response, x => x.slg_call_un_ans_))
                }
    
                console.log("Fetch list top 10 agents max no calls successfully: ", response);

                setListTongCallKV(response);
            } catch (error) {
                console.log("Failed to fetch list top 10 agents max no calls: ", error);
            }
        }

        // fetchTongCallKV();
        if(listGroup.length > 0) {
            fetchTongCallKV();
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
        plugins: {
            title: {
                display: true,
                text: 'Tổng cuộc gọi theo khu vực',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    const labels = listLabel;

    const data = {
        labels,
        datasets: [
            {
                label: 'Answered',
                data: listDataNoAnswered,
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Unanswered',
                data: listDataNoUnanswered,
                backgroundColor: 'rgb(75, 192, 192)',
            },
            // {
            //     label: 'Dataset 3',
            //     data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            //     backgroundColor: 'rgb(53, 162, 235)',
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

                <h4>BIỂU ĐỒ TỔNG CUỘC GỌI THEO KHU VỰC</h4>
                <div style={{ maxWidth: "1500px" }}>
                    <Bar options={options} data={data} />
                </div>
            </div>
        </div>
    );
}

export default TongCallKhuVuc;