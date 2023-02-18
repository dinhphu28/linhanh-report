import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
// import PropTypes from 'prop-types';
import baoCaoCuocGoiApi from '../../apis/baoCaoCuocGoiApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
// import "./BaoCaoCuocGoi.css";

// BaoCaoCuocGoi.propTypes = {
    
// };

function BaoCaoCuocGoi(props) {

    const lsGroupAssigned = JSON.parse(localStorage.getItem("assignedGroups"));

    const [dateFrom, setDateFrom] = useState("2022-12-01");
    const [dateTo, setDateTo] = useState("2022-12-02");
    const [direction, setDirection] = useState("In");
    const [listGroup, setListGroup] = useState([]);
    const [agent, setAgent] = useState(null);
    const [source, setSource] = useState(null);
    const [destination, setDestination] = useState(null);

    const [listTotal, setListTotal] = useState([]);
    const [listDetails, setListDetails] = useState([]);
    const [shouldShowListDetails, setShouldShowListDetails] = useState(false);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [filterDateFrom, setFilteDateFrom] = useState("2022-12-01");
    const [filterDateTo, setFilteDateTo] = useState("2022-12-02");
    const [filterDirection, setFilteDirection] = useState(direction);
    const [filterGroup, setFilterGroup] = useState([]);
    const [filterAgent, setFilterAgent] = useState(null);
    const [filterSource, setFilterSource] = useState(null);
    const [filterDestination, setFilterDestination] = useState(null);
    

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    }

    useEffect(() => {
        const fetchListTotal = async () => {
            try {
                const params = {
                    from: dateFrom,
                    to: dateTo,
                    direction: direction,
                    group: listGroup.length > 0 ? listGroup.reduce((result, item) => {
                        return (result + " " + item);
                    }) : null,
                    agent: agent,
                    source: source,
                    destination: destination
                };

                console.log("Params 1: ", params);
    
                const response = await baoCaoCuocGoiApi.getTotal(params);
    
                console.log("Fetch list total successfully: ", response);

                setListTotal(response);
            } catch (error) {
                console.log("Failed to fetch list total: ", error);
            }
        }

        // fetchListTotal();
        if(listGroup.length > 0) {
            fetchListTotal();
        }
    }, [agent, dateFrom, dateTo, destination, direction, listGroup, source]);

    const changeInputFrom = (e) => {
        setFilteDateFrom(e.target.value);
    }
    const changeInputTo = (e) => {
        setFilteDateTo(e.target.value);
    }
    const changeInputAgent = (e) => {
        setFilterAgent(e.target.value);
    }
    const changeInputSource = (e) => {
        setFilterSource(e.target.value);
    }
    const changeInputDestination = (e) => {
        setFilterDestination(e.target.value);
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

    const fetchListDetails = async () => {
        try {
            const response = await baoCaoCuocGoiApi.getDetails();

            console.log("Fetch list details successfully: ", response);

            setListDetails(response);
        } catch (error) {
            console.log("Failed to fetch list details: ", error);
        }
    }

    const listJsxDetailsItems = listDetails.map((item, index) =>
        <tr key={index}>
            <td>{item.time_view}</td>
            <td>{item.source_display_name}</td>
            <td>{item.destination_display_name}</td>
            <td>{item.status_log}</td>
            <td>{item.ringing_duration_view}</td>
            <td>{item.talking_duration_view}</td>
            <td>{item.total_time_view}</td>
            <td>{item.note_end}</td>
            <td>
                {/* <a href={"https://3cx-linhanh.ringbot.co:5001/Recording/" + item.recording_url}>Record URL</a> */}
                <audio controls>
                    <source src={"https://3cx-linhanh.ringbot.co:5001/Recording/" + item.recording_url} />
                    Your browser does not support the audio element.
                    <a href={"https://3cx-linhanh.ringbot.co:5001/Recording/" + item.recording_url}>Download</a>
                </audio>
            </td>
        </tr>
    );

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
            <Modal
                isOpen={modalIsOpen}
                toggle={toggleModal}
            >
                <ModalHeader toggle={toggleModal} >Create new category</ModalHeader>
                <ModalBody>
                    <Label>
                        From:
                    </Label>
                    {/* <Input
                        type="text"
                        name="from"
                        onChange={e => {changeInputFrom(e)}}
                        defaultValue={dateFrom}
                    /> */}
                    <Input
                        type="date"
                        defaultValue={dateFrom}
                        name="from"
                        onChange={e => {changeInputFrom(e)}}
                    />
                    <Label>
                        To:
                    </Label>
                    <Input
                        type="date"
                        name="to"
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
                    {/* <Label>
                        Agent:
                    </Label>
                    <Input
                        type="text"
                        name="agent"
                        onChange={e => {changeInputAgent(e)}}
                        defaultValue={agent}
                    /> */}
                    <Label>
                        Source:
                    </Label>
                    <Input
                        type="text"
                        name="source"
                        onChange={e => {changeInputSource(e)}}
                        defaultValue={source}
                    />
                    <Label>
                        Destination:
                    </Label>
                    <Input
                        type="text"
                        name="destination"
                        onChange={e => {changeInputDestination(e)}}
                        defaultValue={destination}
                    />
                </ModalBody>
                <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        setDateFrom(filterDateFrom);
                        setDateTo(filterDateTo);
                        setDirection(filterDirection);
                        setListGroup(filterGroup);
                        setAgent(filterAgent);
                        setSource(filterSource);
                        setDestination(filterDestination);

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

            { listTotal.length > 0 ? <Container>
                <Row>
                    <Col
                        className="bg-primary border"
                    >
                        <div style={{textAlign: "center", color: "white"}}>3CX Call Report</div>
                    </Col>
                </Row>

                <Row>
                    <Col
                        className="bg-warning border"
                        xs="2"
                    >
                        <div>From: {dateFrom}</div>
                        <div>To: {dateTo}</div>
                    </Col>
                    <Col
                        className="bg-light"
                        xs="10"
                    >
                        <Row>
                            <Col
                                className="bg-primary border"
                            >
                                <div style={{textAlign: "center", color: "white"}}>GROUP</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                className="bg-primary border"
                            >
                                <div style={{textAlign: "center", color: "white"}}>{direction === "In" ? "INBOUND" : "OUTBOUND"}</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col
                        className="bg-success border"
                        xs="2"
                    >
                        <div style={{textAlign: "center", color: "white"}}>TOTAL CALL</div>
                    </Col>
                    <Col
                        className="bg-success border"
                        xs="4"
                    >
                        <div style={{textAlign: "center", color: "white"}}>ANSWERED</div>
                    </Col>
                    <Col
                        className="bg-danger border"
                        xs="2"
                    >
                        <div style={{textAlign: "center", color: "white"}}>UNANSWERED</div>
                    </Col>
                    <Col
                        className="bg-danger border"
                        xs="4"
                    >
                        <div style={{textAlign: "center", color: "white"}}>ABANDONED</div>
                    </Col>
                </Row>

                <Row>
                    <Col
                        className="bg-success border"
                        xs="2"
                    >
                        <div style={{textAlign: "center", color: "white"}}>{listTotal[0].total_call_}</div>
                    </Col>
                    <Col
                        className="bg-success border"
                        xs="4"
                    >
                        <div style={{textAlign: "center", color: "white"}}>{listTotal[0].slg_ans_}</div>
                    </Col>
                    <Col
                        className="bg-danger border"
                        xs="2"
                    >
                        <div style={{textAlign: "center", color: "white"}}>{listTotal[0].slg_un_ans_}</div>
                    </Col>
                    <Col
                        className="bg-danger border"
                        xs="4"
                    >
                        <div style={{textAlign: "center", color: "white"}}>{listTotal[0].slg_un_ans_}</div>
                    </Col>
                </Row>

                <Row>
                    <Col
                        className="bg-success border"
                        xs="2"
                    >
                        <div style={{textAlign: "center", color: "white"}}>TOTAL TIME</div>
                    </Col>
                    <Col
                        className="bg-success border"
                        xs="4"
                    >
                        <div style={{textAlign: "center", color: "white"}}>TALKING</div>
                    </Col>
                    <Col
                        className="bg-danger border"
                        xs="6"
                    >
                        <div style={{textAlign: "center", color: "white"}}>RINGING</div>
                    </Col>
                </Row>

                <Row>
                    <Col
                        className="bg-success border"
                        xs="2"
                    >
                        <div style={{textAlign: "center", color: "white"}}>{listTotal[0].total_time_}</div>
                    </Col>
                    <Col
                        className="bg-success border"
                        xs="4"
                    >
                        <div style={{textAlign: "center", color: "white"}}>{listTotal[0].total_talking_}</div>
                    </Col>
                    <Col
                        className="bg-danger border"
                        xs="6"
                    >
                        <div style={{textAlign: "center", color: "white"}}>{listTotal[0].total_ringing_}</div>
                    </Col>
                </Row>
                <br />
                <Button
                    color='primary'
                    outline
                    onClick={() => {
                        if(!shouldShowListDetails) {
                            fetchListDetails();
                        }
                        setShouldShowListDetails(!shouldShowListDetails);
                    }}
                >
                    Show details
                </Button>
                <hr />

                {shouldShowListDetails? <div>
                    <Table
                        bordered
                        striped
                    >
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Status</th>
                                <th>Ringing time</th>
                                <th>Talking</th>
                                <th>Total</th>
                                <th>Terminated by</th>
                                <th>Records</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr>
                                <td>Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                <td>Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                            </tr> */}
                            {listJsxDetailsItems}
                        </tbody>
                    </Table>
                </div> : ""}
            </Container> : "" }
        </div>
    );
}

export default BaoCaoCuocGoi;