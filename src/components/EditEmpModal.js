import React,{Component} from 'react';
import {Modal,Button,Row,Column,Form, FormGroup, Col} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
export class EditEmpModal extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {depts:[], snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        fetch('https://localhost:44393/api/Department')
        .then(response => response.json())
        .then(data => { this.setState({depts:data}); });
    }

    snackbarClose = (event) => 
    {
        this.setState({snackbaropen: false});
    }

    handleSubmit(event) 
    {
        event.preventDefault();
        fetch('https://localhost:44393/api/Employees',{ 
            method: 'PUT', 
            headers: 
            { 'Accept': 'application/json', 
               'Content-Type': 'application/json' 
            
            },
        body:JSON.stringify(
            {
                EmployeeId: event.target.EmployeeId.value,
                EmployeeName: event.target.EmployeeName.value,
                Department: event.target.Department.value,
                Email: event.target.Email.value,
                DOJ: event.target.DOJ.value
            }) 
        })
        .then(res => res.json())
        .then((result) => 
        { 
            // alert(result); 
            this.setState({snackbaropen: true, snackbarmsg: result});

        },
        (error) => 
        { 
            // alert('Fail!')
            this.setState({snackbaropen: true, snackbarmsg: "Failed!"});
        }
        )

    }

    render()
    {
        return(
            <div className="container">
                <Snackbar anchorOrigin = { { vertical: 'center', horizontal: 'center'} }
                open = { this.state.snackbaropen}
                autoHideDuration = {2000}
                onClose = { this.snackbarClose}
                message = {<span id = "message-id">{this.state.snackbarmsg}</span>}
                action = 
                {[
                    <IconButton key = "close" arial-label = "Close" color = "inherit" onClick = {this.snackbarClose}>
                        x
                    </IconButton>
                ]}
            />
            <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <Row>
                <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="EmployeeId">
                            <Form.Label>Employee Id</Form.Label>
                            <Form.Control
                                type="text"
                                name="Employee Id" required disabled defaultValue = { this.props.empid}
                                placeholder="Employee Id"
                            />
                        </Form.Group>

                        <Form.Group controlId="EmployeeName">
                            <Form.Label>Employee Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="Employee Name" required defaultValue = { this.props.empname}
                                placeholder="Employee Name"
                            />
                        </Form.Group>

                        <Form.Group controlId="Department">
                            <Form.Label>Employee Name</Form.Label>
                            <Form.Control as="select" defaultValue = {this.props.depts}>
                            { this.state.depts.map(depts1 => 
                                <option key={depts1.DepartmentId}>{depts1.DepartmentName}</option>
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="Email" required defaultValue = { this.props.email}
                                placeholder="Employee Name"
                            />
                        </Form.Group>

                        <Form.Group controlId="DOJ">
                            <Form.Label>Date of Joining</Form.Label>
                            <Form.Control
                                type="date"
                                name="Date of Joining" required defaultValue = { this.props.doj}
                                placeholder="Date of joining"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit">Edit</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
        )
    }

}