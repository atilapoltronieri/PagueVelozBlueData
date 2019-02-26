using PagueVelozBlueData.Models;
using PagueVelozBlueData.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace PagueVelozBlueData.Controllers
{
    [RoutePrefix("api/Empresa")]
    public class EmpresaController : ApiController
    {
        [HttpPost]
        [Route("SalvarEmpresa")]
        public HttpResponseMessage SalvarEmpresa()
        {
            return Request.CreateResponse(HttpStatusCode.BadRequest, "Erro ao efetuar chamado ao EmpresaController");
        }

        [HttpPost]
        [Route("SalvarEmpresa")]
        public HttpResponseMessage SalvarEmpresa(string empresaJson)
        {
            try
            {
                EmpresaModel empresaModel = new JavaScriptSerializer().Deserialize<EmpresaModel>(empresaJson);

                var retornoJson = new JavaScriptSerializer().Serialize(new EmpresaService().SalvarEmpresa(empresaModel));

                return Request.CreateResponse(HttpStatusCode.OK, retornoJson);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Erro na ação SalvarEmpresa: " + e.Message);
            }
        }

        [HttpPost]
        [Route("DeletarEmpresa")]
        public HttpResponseMessage DeletarEmpresa(string empresaJson)
        {
            try
            {
                EmpresaModel empresaModel = new JavaScriptSerializer().Deserialize<EmpresaModel>(empresaJson);

                var retornoJson = new JavaScriptSerializer().Serialize(new EmpresaService().DeletarEmpresa(empresaModel));

                return Request.CreateResponse(HttpStatusCode.OK, retornoJson);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Erro na ação DeletarEmpresa: " + e.Message);
            }
        }

        [HttpGet]
        [Route("BuscarEmpresa")]
        public HttpResponseMessage BuscarEmpresa(string empresaJson)
        {
            try
            {
                EmpresaModel empresaModel = new JavaScriptSerializer().Deserialize<EmpresaModel>(empresaJson);

                var retornoJson = new JavaScriptSerializer().Serialize(new EmpresaService().BuscarEmpresa(empresaModel));

                return Request.CreateResponse(HttpStatusCode.OK, retornoJson);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Erro na ação BuscarEmpresa: " + e.Message);
            }
        }

        [HttpGet]
        [Route("CarregarEmpresa")]
        public HttpResponseMessage CarregarEmpresa()
        {
            try
            {
                var retornoJson = new JavaScriptSerializer().Serialize(new EmpresaService().CarregarEmpresa());

                return Request.CreateResponse(HttpStatusCode.OK, retornoJson);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Erro na ação CarregarEmpresa: " + e.Message);
            }
        }
    }
}