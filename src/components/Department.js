import React,{component, Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddDeptModal} from './AddDeptModal';
import {EditDeptModal} from './EditDeptModal';

export class Department extends Component
{
    constructor(props)
    {
        super(props);
        this.state={dept:[], addModalShow: false, editModalShow: false}
    }

    componentDidMount()
    {
        this.refreshList();
    }

    refreshList()
    {
        fetch('https://localhost:44393/api/Department')
        .then(response=> response.json())
        .then(data=> {
            this.setState({dept:data});
        }
            );
    }

    componentDidUpdate()
    {
        this.refreshList();
    }

    deleteDept(deptid)
    {
        if(window.confirm('Are you sure want to delete?'))
        {
            fetch('https://localhost:44393/api/Department/' + deptid, {
                method: 'DELETE',
                header: {'Accept':'application/json', 'Content-Type':'application/json'}
            })
        }
    }

    render()
    { const{dept, deptid, deptname}=this.state;
      let addModalClose = () => this.setState({ addModalShow: false });
      let editModalClose = () => this.setState({ editModalShow: false });
        return(
            <div>
            <Table className="mt-2" stripped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Department Id</th>
                        <th>Department Name</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {dept.map(dept1=>
                        <tr key={dept1.DepartmentId}>
                        <td>{dept1.DepartmentId}</td>
                        <td>{dept1.DepartmentName}</td>
                        <td>
                            <ButtonToolbar>
                                <Button className="mr-2" variant="info" 
                        onClick = {() => this.setState({editModalShow: true, deptid: dept1.DepartmentId, deptname: dept1.DepartmentName})}>
                                    Edit
                                </Button>

                                <Button className="mr-2" variant ="danger"
                        onClick = {() => this.deleteDept(dept1.DepartmentId)}>
                                    Delete
                                </Button>
                                <EditDeptModal show = {this.state.editModalShow} 
                                onHide = {editModalClose}  
                                deptid = {deptid} 
                                deptname = {deptname} />
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
            <AddDeptModal show={this.state.addModalShow} onHide={addModalClose}
            />
        </ButtonToolbar>
        </div>
        )
    }
}