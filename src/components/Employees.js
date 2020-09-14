import React,{component, Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';
export class Employees extends Component
{
    constructor(props)
    {
        super(props);
        this.state={emp:[], addModalShow: false, editModalShow: false}
    }

    componentDidMount()
    {
        this.refreshList();
    }

    refreshList()
    {
        fetch('https://localhost:44393/api/Employees')
        .then(response=> response.json())
        .then(data=> {
            this.setState({emp:data});
        }
            );
    }

    componentDidUpdate()
    {
        this.refreshList();
    }

    deleteEmp(empid)
    {
        if(window.confirm('Are you sure want to delete?'))
        {
            fetch('https://localhost:44393/api/Employees/' + empid, {
                method: 'DELETE',
                header: {'Accept':'application/json', 'Content-Type':'application/json'}
            })
        }
    }

    render()
    {
        const{emp, empid, empname,depts,email,doj}=this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return(
            <div>
            <Table className="mt-2" stripped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>Email</th>
                        <th>Date of Joining</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {emp.map(emp1=>
                        <tr key={emp1.EmployeeId}>
                        <td>{emp1.EmployeeId}</td>
                        <td>{emp1.EmployeeName}</td>
                        <td>{emp1.Department}</td>
                        <td>{emp1.Email}</td>
                        <td>{emp1.DOJ}</td>
                        <td>
                            <ButtonToolbar>
                                <Button className="mr-2" variant="info" 
onClick = {() => this.setState({editModalShow: true, empid: emp1.EmployeeId, empname: emp1.EmployeeName, depts: emp1.Department, email: emp1.Email, doj: emp1.DOJ})}>
                                    Edit
                                </Button>

                                <Button className="mr-2" variant ="danger"
                        onClick = {() => this.deleteEmp(emp1.EmployeeId)}>
                                    Delete
                                </Button>
                                <EditEmpModal show = {this.state.editModalShow} 
                                onHide = {editModalClose}  
                                empid = {empid} 
                                empname = {empname}
                                depts = {depts}
                                email = {email}
                                doj = {doj}
                                />
                            </ButtonToolbar>
                        </td>
                        </tr>
                        )}
                </tbody>
            </Table>
        <ButtonToolbar>
            <Button
                variant ="primary" onClick ={() => this.setState({addModalShow : true})}>Add
            </Button>
            <AddEmpModal show={this.state.addModalShow} onHide={addModalClose}
            />
        </ButtonToolbar>
        </div>
        )
    }
}