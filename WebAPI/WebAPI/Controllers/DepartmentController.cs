using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using WebAPI.Models;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace WebAPI.Controllers
{
    public class DepartmentController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable t = new DataTable();
            string sqlQuery = "Select DepartmentId,DepartmentName from Department";
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeDB"].ConnectionString))
            using (var cmd = new SqlCommand(sqlQuery,connection))
            using (var dataAdapt = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                dataAdapt.Fill(t);
            }

            return Request.CreateResponse(HttpStatusCode.OK, t);
        }

        public string Post( Department dept)
        {
            try
            {
                DataTable t = new DataTable();
                string sqlQuery = "Insert into Department values('" + dept.DepartmentName + "')";
                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeDB"].ConnectionString))
                using (var cmd = new SqlCommand(sqlQuery, connection))
                using (var dataAdapt = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    dataAdapt.Fill(t);
                }

                return " Department added success!";
            }
            catch( Exception)
            {
                return "Department addition failed!!";
            }
        }

        public string Put(Department dept)
        {
            try
            {
                DataTable t = new DataTable();
                string sqlQuery = "Update Department set DepartmentName = '" + dept.DepartmentName + @"'
                                   where DepartmentId = " + dept.DepartmentId;
                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeDB"].ConnectionString))
                using (var cmd = new SqlCommand(sqlQuery, connection))
                using (var dataAdapt = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    dataAdapt.Fill(t);
                }

                return " Department update success!";
            }
            catch (Exception)
            {
                return "Department update failed!!";
            }
        }

        public string Delete(int id)
        {
            try
            {
                DataTable t = new DataTable();
                string sqlQuery = "Delete from Department where DepartmentId = " + id;
                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeDB"].ConnectionString))
                using (var cmd = new SqlCommand(sqlQuery, connection))
                using (var dataAdapt = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    dataAdapt.Fill(t);
                }

                return " Department deleted success!";
            }
            catch (Exception)
            {
                return "Department deletion failed!!";
            }
        }
    }
}
