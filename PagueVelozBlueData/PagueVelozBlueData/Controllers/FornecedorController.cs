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
    [RoutePrefix("api/Fornecedor")]
    public class FornecedorController : ApiController
    {
        [HttpPost]
        [Route("SalvarFornecedor")]
        public HttpResponseMessage SalvarFornecedor()
        {
            return Request.CreateResponse(HttpStatusCode.BadRequest, "Erro ao efetuar chamado ao FornecedorController");
        }

        [HttpPost]
        [Route("SalvarFornecedor")]
        public HttpResponseMessage SalvarFornecedor(string fornecedorJson)
        {
            try
            {
                FornecedorModel FornecedorModel = new JavaScriptSerializer().Deserialize<FornecedorModel>(fornecedorJson);

                var retornoJson = new JavaScriptSerializer().Serialize(new FornecedorService().SalvarFornecedor(FornecedorModel));

                return Request.CreateResponse(HttpStatusCode.OK, retornoJson);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Erro na ação SalvarFornecedor: " + e.Message);
            }
        }

        [HttpPost]
        [Route("DeletarFornecedor")]
        public HttpResponseMessage DeletarFornecedor(string fornecedorJson)
        {
            try
            {
                FornecedorModel FornecedorModel = new JavaScriptSerializer().Deserialize<FornecedorModel>(fornecedorJson);

                var retornoJson = new JavaScriptSerializer().Serialize(new FornecedorService().DeletarFornecedor(FornecedorModel));

                return Request.CreateResponse(HttpStatusCode.OK, retornoJson);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Erro na ação DeletarFornecedor: " + e.Message);
            }
        }

        [HttpGet]
        [Route("BuscarFornecedor")]
        public HttpResponseMessage BuscarFornecedor(string fornecedorJson)
        {
            try
            {
                FornecedorModel FornecedorModel = new JavaScriptSerializer().Deserialize<FornecedorModel>(fornecedorJson);

                var retornoJson = new JavaScriptSerializer().Serialize(new FornecedorService().BuscarFornecedor(FornecedorModel));

                return Request.CreateResponse(HttpStatusCode.OK, retornoJson);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Erro na ação BuscarFornecedor: " + e.Message);
            }
        }

        [HttpGet]
        [Route("CarregarFornecedor")]
        public HttpResponseMessage CarregarFornecedor()
        {
            try
            {
                var retornoJson = new JavaScriptSerializer().Serialize(new FornecedorService().CarregarFornecedor());

                return Request.CreateResponse(HttpStatusCode.OK, retornoJson);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Erro na ação CarregarFornecedor: " + e.Message);
            }
        }
    }
}