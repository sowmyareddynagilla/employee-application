using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class EmployeesController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable t = new DataTable();
            string sqlQuery = @"Select EmployeeId,EmployeeName,
                                Department, Email, DOJ from Employees";
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeDB"].ConnectionString))
            using (var cmd = new SqlCommand(sqlQuery, connection))
            using (var dataAdapt = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                dataAdapt.Fill(t);
            }

            return Request.CreateResponse(HttpStatusCode.OK, t);
        }

        public string Post(Employees emp)
        {
            try
            {
                DataTable t = new DataTable();
                string sqlQuery = @"Insert into Employees (EmployeeName, Department, Email, DOJ) 
                                    values('" + emp.EmployeeName + @"',
                                           '" + emp.Department + @"',
                                           '" + emp.Email + @"',
                                           '" + emp.DOJ + "')";

                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeDB"].ConnectionString))
                using (var cmd = new SqlCommand(sqlQuery, connection))
                using (var dataAdapt = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    dataAdapt.Fill(t);
                }

                return " Employee added success!";
            }
            catch (Exception)
            {
                return "Employee addition failed!!";
            }
        }

        public string Put(Employees emp)
        {
            try
            {
                DataTable t = new DataTable();
                string sqlQuery = "Update Employees set EmployeeName = '" + emp.EmployeeName + @"'
                                   , Department = '" + emp.Department + @"'
                                   , Email = '" + emp.Email + @"'
                                   , DOJ = '" + emp.DOJ + @"'
                                   where EmployeeId = " + emp.EmployeeId;

                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeDB"].ConnectionString))
                using (var cmd = new SqlCommand(sqlQuery, connection))
                using (var dataAdapt = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    dataAdapt.Fill(t);
                }

                return " Employee update success!";
            }
            catch (Exception)
            {
                return "Employee update failed!!";
            }
        }

        public string Delete(int id)
        {
            try
            {
                DataTable t = new DataTable();
                string sqlQuery = "Delete from Employees where EmployeeId = " + id;
                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeDB"].ConnectionString))
                using (var cmd = new SqlCommand(sqlQuery, connection))
                using (var dataAdapt = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    dataAdapt.Fill(t);
                }

                return " Employee deleted success!";
            }
            catch (Exception)
            {
                return "Employee deletion failed!!";
            }
        }
    }
}
